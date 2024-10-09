from langflow.custom import Component
from langflow.io import MultilineInput, Output, DataInput
from langflow.schema.message import Message
from langflow.schema import Data
import requests  # Make sure you have imported requests module

class AssignToHumanAgent(Component):
    display_name = "Assign to Human Agent"
    description = "Assign to human agent"
    icon = "merge"
    name = "AssignToHumanAgent"

    inputs = [
        DataInput(
            name="message_data",
            display_name="Message Data",
            info="Send message text",
        )
    ]

    outputs = [Output(display_name="Message", name="message_output", method="change_user_status")]

    def change_user_status(self) -> Data:
        stamp = self.message_data.value.get("stamp", {})
        url = "https://ee61b99fb7a4.ngrok.app/facebook/change_user_status"
        
        body = {
            "key": "assigned_to_bot",
            "value": False,
            "stamp": stamp
        }
        
        response = requests.post(url, json=body)

        #if result is True, return message_data
        if response.status_code == 200:
            return self.message_data
        else:
            self.stop("message_output")
            return None