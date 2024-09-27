import operator
from functools import reduce
from langflow.field_typing.range_spec import RangeSpec
from langchain_openai import ChatOpenAI
from pydantic.v1 import SecretStr

from langflow.base.models.model import LCModelComponent
from langflow.base.models.openai_constants import OPENAI_MODEL_NAMES
from langflow.field_typing import LanguageModel
from langflow.schema import Data
from langflow.io import MultilineInput
from langflow.inputs import (
    BoolInput,
    DictInput,
    DropdownInput,
    FloatInput,
    IntInput,
    SecretStrInput,
    StrInput
)
import requests
import re



class GptOutputProcessorModelComponent(Component):
    display_name = "Gpt output processor"
    description = "Gpt Output Processor"
    icon = "Facebook"
    name = "Gpt Output Processor"

    inputs = [
        DataInput(name="gpt_response", display_name="Gpt response", info="Gpt response")
    ]

    outputs = [
        Output(display_name="Function", name="function", method="function"), 
        Output(display_name="Text", name="text", method="text")]

    def function(self) -> Data:
        text = self.gpt_response.value.get("mongolgpt_generated_data")
        extracted = self.extract_function(text)

        if extracted.get("type") == "FUNCTION":
            self.gpt_response.value["function"] = extracted
            return Data(value=self.gpt_response.value)
        else:
            self.stop("function")
            return None

    def text(self) -> Data:
        text = self.gpt_response.value.get("mongolgpt_generated_data")
        extracted = self.extract_function(text)
        if extracted.get("type") == "TEXT":
            self.gpt_response.value["send_message"] = extracted.get("output")
            return Data(value=self.gpt_response.value)
        else:
            self.stop("text")
            return None

    def extract_function(self, output):
        # Match and return TOPIC type
        topic_match = re.search(r'<>', output)
        if topic_match:
            return {"type": "TOPIC", "name": topic_match.group(1)}

        # Match and return FUNC type
        func_match = re.search(r'<<([a-zA-Z0-9_]+)(?:\(([^)]*)\))?>>', output)
        if func_match:
            function_name = func_match.group(1)
            arguments = func_match.group(2)
            
            if arguments:
                arguments_dict = {}
                arguments_list = arguments.split(',')
                for arg in arguments_list:
                    # Split the argument into key and value
                    key, value = arg.split(':', 1)
                    # Strip whitespace and quotes from the key and value
                    key = key.strip()
                    value = value.strip().strip('"')
                    arguments_dict[key] = value
                
                return {"type": "FUNCTION", "name": function_name, "body": arguments_dict}
            else:
                return {"type": "FUNCTION", "name": function_name}

        return {"type": "TEXT", "output": output}