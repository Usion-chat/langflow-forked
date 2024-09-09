from langflow.custom import Component
from langflow.io import MessageTextInput, Output, DataInput
from langflow.schema.message import Message


class FacebookComponent(Component):
    display_name = "Facebook Component"
    description = "Facebook webhook component."
    icon = "merge"
    name = "FacebookComponent"

    inputs = [
        DataInput(
            name="postback",
            display_name="Postback",
            info="Postback actions to execute",
        ),
        DataInput(
            name="message",
            display_name="Message",
            info="Message",
        ),
    ]

    outputs = [
        Output(display_name="Postback", name="combined_text", method="combine_texts"),
    ]

    def combine_texts(self) -> Message:
        print("text1", self.text1)
        print("self.__dict__", self.__dict__)
        combined = self.delimiter.join([self.text1, self.text2])
        self.status = combined
        return Message(text=combined)
