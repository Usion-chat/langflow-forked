from langflow.custom import Component
from langflow.io import MessageTextInput, Output, DataInput
from langflow.schema.message import Message
from langflow.schema import Data


class FacebookPostback(Component):
    display_name = "Postback Action"
    description = "Postback Action To Execute."
    icon = "merge"
    name = "FacebookPostback"

    inputs = [
        DataInput(
            name="postback_actions",
            display_name="Postback Action List",
            info="Postback actions to execute",
        )
    ]

    outputs = [
        Output(display_name="Combined Text", name="combined_text", method="combine_texts"),
    ]

    def combine_texts(self) -> Data:
        print("text1", self.text1)
        print("self.__dict__", self.__dict__)
        combined = self.delimiter.join([self.text1, self.text2])
        self.status = combined
        return Message(text=combined)
