from langflow.custom import Component
from langflow.io import MultilineInput, Output, DataInput
from langflow.schema.message import Message
from langflow.schema import Data


class FacebookGetName(Component):
    display_name = "Facebook Get Name"
    description = "Get Facebook Name"
    icon = "merge"
    name = "FacebookGetName"

    inputs = [
        DataInput(
            name="message_data",
            display_name="Message Data",
            info="Send message text",
        )
    ]

    outputs = [Output(display_name="Message", name="message_output", method="get_name")]
    

    def get_name(self) -> Data:
        stamp = self.message_data.value.get("stamp", {})
        url = "https://ee61b99fb7a4.ngrok.app/facebook/get_user_name"
        body = {
            "stamp": stamp
        }
        response = requests.post(url, json=body)
        if response.status_code == 200:
            name = response.json().get("name")
            self.message_data.value["name"] = name
            return self.message_data
        else:
            self.stop("message_output")
            return None