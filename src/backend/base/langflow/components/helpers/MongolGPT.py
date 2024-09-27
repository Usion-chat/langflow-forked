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



class MongolGPTModelComponent(Component):
    display_name = "MongolGPT"
    description = "MongolGPT model."
    icon = "Facebook"
    name = "MongolGPTModel"

    inputs = [
        MultilineInput(name="system_prompt", display_name="System Prompt", info="System Prompt"),
        DataInput(name="user_message", display_name="User Message", info="User Message"),
    ]

    outputs = [Output(display_name="Output", name="generated_output", method="generated_output")]

    def generated_output(self) -> Data:
        # Extract input values for system_prompt and user_message
        system_prompt = self.system_prompt
        user_message_data = self.user_message.value

        # print("MongolGPTModelComponent user_message_data", user_message_data)

        # Check if 'text' exists in the user_message object and extract it
        if (
            'event' in user_message_data and
            'message' in user_message_data['event'] and
            'text' in user_message_data['event']['message']
        ):
            user_message_text = user_message_data['event']['message']['text']
        else:
            # Handle the case when 'text' is missing
            # print("Warning: 'text' field is missing in user_message.")
            self.stop("text_output")
            return None

        # Construct the body for the POST request
        request_body = {
            "system_prompt": system_prompt,
            "user_message": user_message_text,
            "langflow_id": self.graph.flow_id
        }

        #Uncomment the following code to send the chat history to the API
        # if(user_message_data.get("chat_history", None)):
        #     request_body["chat_history"] = user_message_data.get("chat_history")

        # # Define the API endpoint
        # api_url = " https://c3f5c49c4adb.ngrok.app/langflow/facebook_generate"

        # try:
        #     # Make the POST request to the API
        #     response = requests.post(api_url, json=request_body)

        #     # Check if the request was successful
        #     if response.status_code == 200:
        #         # Extract the text or response from the API
        #         api_response = response.json().get("response", "No response")
        #     else:
        #         api_response = f"Error: {response.status_code} - {response.text}"

        # except requests.exceptions.RequestException as e:
        #     # Handle any exceptions or errors during the request
        #     api_response = f"Request failed: {str(e)}"

        # print("api_response", api_response)
        #we want to exdent api_response with user_message and remember api_response is a json object
        # api_response.update(user_message_data)

        api_response = """<<check_order(orderNumber: "R9990577799")>>"""
        # api_response = """Halo"""
        user_message_data["mongolgpt_generated_data"] = api_response



        # Return the response wrapped in a Data object
        return Data(value=user_message_data)



    # def for_function_output(self) -> Data:
    #     message = Data(value="Hello, World!")
    #     return message
    
