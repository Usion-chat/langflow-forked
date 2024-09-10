from langflow.custom import Component
from langflow.io import MultilineInput, Output, DataInput
from langflow.schema.message import Message
from langflow.schema import Data


class FacebookSendMessage(Component):
    display_name = "Facebook Send Text Message"
    description = "Send a text facebook message to the user."
    icon = "merge"
    name = "FacebookSendMessage"

    inputs = [
        MultilineInput(
            name="message",
            display_name="Message Text",
            info="Send message text",
        ),
        IntInput(
            name="action_order",
            display_name="Action Order",
            info="Action Order",
        ),
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
