from langflow.custom import Component
from langflow.io import MessageTextInput, Output, DataInput
from langflow.schema.message import Message
from langflow.schema import Data


class FacebookSendMessage(Component):
    display_name = "Facebook Send Text Message"
    description = "Send a text facebook message to the user."
    icon = "merge"
    name = "FacebookSendMessage"

    inputs = [
        MessageTextInput(
            name="postback_actions",
            display_name="Postback Action List",
            info="Postback actions to execute",
        )
    ]

    outputs = [
        Output(display_name="Send Message Data", name="send_message_object", method="create_message_object")
    ]

    def create_message_object(self) -> Data:
        print("text1", self.text1)
        print("self.__dict__", self.__dict__)
        combined = self.delimiter.join([self.text1, self.text2])
        self.status = combined
        return Message(text=combined)
