from langflow.custom import Component
from langflow.io import MessageTextInput, Output, DataInput
from langflow.schema.message import Message
from langflow.schema import Data


class FacebookPostback(Component):
    display_name = "Facebook Postback"
    description = "Facebook Postback."
    icon = "merge"
    name = "FacebookPostback"

    inputs = [
        DataInput(
            name="postback_actions",
            display_name="Postback Action List",
            info="Postback actions to execute",
            is_list=True,
        ),
        MessageTextInput(
            name="postback action name",
            display_name="Postback Action Name",
            info="Postback action name",
        ),
    ]

    outputs = [
        Output(display_name="Combined Text", name="combined_text", method="combine_texts"),
    ]

    def combine_texts(self) -> Data:
        combined = self.delimiter.join([self.text1, self.text2])
        self.status = combined
        return Message(text=combined)
