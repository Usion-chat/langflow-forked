from langflow.custom import Component
from langflow.io import MultilineInput, Output, DataInput
from langflow.schema.message import Message
from langflow.schema import Data


class FacebookSendTemplateMessage(Component):
    display_name = "Facebook Send Template Message"
    description = "Send a template facebook message to the user."
    icon = "merge"
    name = "FacebookSendTemplateMessage"

    inputs = [
        MultilineInput(name="message_default", display_name="Message Default", info="Default message to send"),
        DataInput(
            name="message_data",
            display_name="Message Data",
            info="Send message text",
        )
    ]

    outputs = [Output(display_name="Message", name="message_output", method="send_template_message")]

    def send_template_message(self) -> Data:
        message = self.message_data.value.get("send_message")
        print("messageOriginal",message)
        stamp = self.message_data.value.get("stamp", {})
        if self.message_default:
            message = self.message_default

        buttons = [{"type": "postback", "title": "Барааны мэдээлэл", "payload": f"check_order_item_test"}]
        print("message",message)
        print("stamp",stamp)
        url = "https://ee61b99fb7a4.ngrok.app/facebook/send_template_message"
        body = {
            "text": message,
            "buttons": buttons,
            "stamp": stamp
        }
        response = requests.post(url, json=body)
        return self.message_data
        # return response.json()

    # def send_facebook_message(self) -> Data:
    #     # print("Message Data", self.message_data.value)
    #     user_id = self.message_data.value.get("user_info", {}).get("user_id", "")
    #     PAGE_ID = self.message_data.value.get("page_info", {}).get("page_id", "")
    #     PAGE_ACCESS_TOKEN = self.message_data.value.get("page_info", {}).get("page_access_token", "")
    #     persona_id = self.message_data.value.get("persona_id")  # Get persona_id from page_info
    #     message = self.message_data.value.get("send_message")

    #     if self.message_default:
    #         message = self.message_default

    #     # print("User ID", user_id)
    #     # print("Page ID", PAGE_ID)
    #     # print("Page Access Token", PAGE_ACCESS_TOKEN)
    #     # print("Persona ID", persona_id)
    #     # print("Message", message)
        
    #     # Check if the message is null or empty, return if so
    #     if not message:
    #         logger.info("message_empty", page_id=PAGE_ID, user_id=user_id)
    #         return
        
    #     url = f"https://graph.facebook.com/v19.0/{PAGE_ID}/messages"
    #     headers = {
    #         "Content-Type": "application/json",
    #         "Authorization": f"Bearer {PAGE_ACCESS_TOKEN}"
    #     }
    #     data = {
    #         "recipient": {"id": user_id},
    #         "message": {"text": message},
    #         "messaging_type": "RESPONSE"
    #     }
    #     if persona_id:
    #         data["persona_id"] = persona_id  # Only add persona_id if it is not None
        
        
    #     response = requests.post(url, headers=headers, json=data)
    #     if response.status_code == 200:
    #         self.message_data.value["message_sent"] = True
    #         return self.message_data
    #         # logger.info("message_sent_successfully", page_id=PAGE_ID, user_id=receiver_id)
            
    #         # # Update the user's message history in Redis
    #         # message_history = user_info.get("message_history", [])
    #         # message_history.append({
    #         #     "text": message,
    #         #     "type": "sent",
    #         #     "timestamp": datetime.datetime.utcnow().isoformat()
    #         # })
    #         # set_user_info(PAGE_ID, receiver_id, "message_history", json.dumps(message_history))
    #     else:
    #         print("Failed to send message")
    #         # logger.error("failed_to_send_message", page_id=PAGE_ID, user_id=receiver_id, status_code=response.status_code, response_text=response.text)
    #         # raise Exception(f"Failed to send message: {response.status_code} {response.text}")
