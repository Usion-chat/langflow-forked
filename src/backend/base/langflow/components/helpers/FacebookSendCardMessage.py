from langflow.custom import Component
from langflow.io import MultilineInput, Output, DataInput
from langflow.schema.message import Message
from langflow.schema import Data


class FacebookSendGenericCard(Component):
    display_name = "Facebook Send Genereic Card"
    description = "Send a template facebook message to the user."
    icon = "merge"
    name = "FacebookSendGenericCard"

    inputs = [
        MultilineInput(name="message_default", display_name="Message Default", info="Default message to send"),
        DataInput(
            name="message_data",
            display_name="Message Data",
            info="Send message text",
        )
    ]

    outputs = [Output(display_name="Message", name="message_output", method="send_generic_card")]
    

    def send_generic_card(self) -> Data:
        message = self.message_data.value.get("send_message")
        print("messageOriginal",message)
        stamp = self.message_data.value.get("stamp", {})
        if self.message_default:
            message = self.message_default

        buttons = [{"type": "postback", "title": "Барааны мэдээлэл", "payload": f"check_order_item_test"}]
        print("message",message)
        print("stamp",stamp)
        url = "https://ee61b99fb7a4.ngrok.app/facebook/send_generic_card"
        body = {
            "elements": message,
            "stamp": stamp
        }
        print("url", url)
        response = requests.post(url, json=body)
        return self.message_data
        # return response.json()