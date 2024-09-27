from langflow.custom import Component
from langflow.io import MessageTextInput, Output, DataInput, TestInput, MultilineInput
from langflow.inputs.inputs import FieldTypes
from langflow.schema.message import Message
from langflow.schema import Data
from datetime import datetime
import ast


class FacebookComponent(Component):
    display_name = "Facebook Component"
    description = "Facebook webhook component."
    icon = "merge"
    name = "FacebookComponent"

    inputs = [
        TestInput(
            name="test_input",
            display_name="Test Input",
            info="Test input.",
        ),
        MessageTextInput(
            name="user_input",
            display_name="User Input",
            info="User input from Facebook.",
        ),
        DataInput(
            name="langflow_message_history",
            display_name="Message History",
            info="Message history from Facebook."
        ),
        MultilineInput(
            name="greeting_message",
            display_name="Greeting Message",
            info="Messenger greeting message.",
        ),
        HandleInput(
            name="menu_items",
            display_name="Menu Items",
            info="Menu items.",
            input_types=["Data"],
            field_type=FieldTypes.DICT,
            is_list=True,
        ),
    ]

    outputs = [
        Output(display_name="Postback", name="facebook_postback", method="postback"),
        Output(display_name="Message", name="facebook_message", method="message"),
    ]

    def make_post_request(self, url, body, headers=None):
        """
        Sends a POST request to the specified URL with the given JSON body.

        :param url: The URL to which the POST request will be sent.
        :param body: A dictionary containing the JSON data to be sent in the body of the request.
        :param headers: Optional dictionary containing headers to be included in the request.
        :return: The response object from the request.
        """
        # try:
            # Set default headers if not provided
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        # print("URL", url)
        # print("Body", body)

        # Send POST request
        response = requests.post(url, json=body, headers=headers)

        # print(f"Response: {response}")

        # Check for successful response
        if response.status_code == 200:
            print("Request was successful!")
        else:
            print(f"Failed to make request, status code: {response.status_code}")

        return response

        # except requests.exceptions.RequestException as e:
            # print(f"An error occurred: {e}")
            # return None

    def message_history_output(self) -> Data:
        return self.message_history

    def is_postback(self, data):
        event = data.get("event", {})
        if 'postback' in event and 'sender' in event:
            return True
        if 'message' in event and 'quick_reply' in event['message']:
            return True
        return False

    def is_message(self, data):
        event = data.get("event", {})
        if 'message' in event and 'quick_reply' not in event['message']:
            return True
        return False

    def check_inputs(self, data):
        greeting_message_set = data.get("page_info", {}).get("greeting_message_set")
        already_set_greeting_message = data.get("page_info", {}).get("greeting_message")

        menu_items_set = data.get("user_info", {}).get("menu_items_set")
        user_id = data.get("user_info", {}).get("user_id")
        already_set_menu_items = data.get("user_info", {}).get("menu_items")

        if not greeting_message_set or already_set_greeting_message != self.greeting_message:
            start_button = self.set_get_started_button(data.get("user_info", {}), data.get("page_info", {}))
            greeting = self.set_greeting_message(data.get("page_info", {}))
            if start_button and greeting:
                print("Page info is updated")
                body = {"langflow_id": self.graph.flow_id, "new_info": {"greeting_message_set": True, "greeting_message": self.greeting_message}}
                self.make_post_request("http://d899195b24d5.ngrok.app/set_info/set_page_info", body)
        else:
            print("page It is already set")

        transformed_menu = []

        try:
            for title, payload in self.menu_items.items():
                transformed_menu.append({
                    "type": "postback",  # Assuming "postback" as the type for all items
                    "title": payload,
                    "payload": title
                })
        except Exception as e:
            print("Error transforming menu items:", e)

        if not menu_items_set or already_set_menu_items != transformed_menu:
            #loop through menu items and "type": "postback",
            menu_items = self.set_menu_items(data.get("user_info", {}), data.get("page_info", {}), transformed_menu)
            if menu_items:
                print("User info is updated")
                body = {"langflow_id": self.graph.flow_id, "new_info": {"menu_items_set":True, "menu_items": transformed_menu}, "user_id": user_id}
                self.make_post_request("https://d899195b24d5.ngrok.app/set_info/set_user_info", body)
        else:
            print("user It is already set")
            
        # print("Greeting message", self.greeting_message)
        # print("Menu items", self.menu_items)

    def postback(self) -> Data:
        data = ast.literal_eval(self.user_input)
        if self.is_postback(data):
            print("This is postback data", data)
            data["function"] = {"name": data["event"]["postback"]["payload"]}
            data["type"] = "FACEBOOK"
            return Data(value=data)
        else:
            self.stop("facebook_postback")
            return None

    def message(self) -> Data:
        data = ast.literal_eval(self.user_input)
        if self.is_message(data):
            print("This is message data", data)
            data["chat_history"] = self.format_chat_history(self.langflow_message_history)
            data["type"] = "FACEBOOK"
            return Data(value=data)
        else:
            self.stop("facebook_message")
            return None

    def format_chat_history(self, messages):
        chat_history = "Chat history:\n"
        # Reverse the list of messages
        for message_object in reversed(messages[:-1]):  # Iterate through all messages except the last one, in reverse order
            message = message_object.data
            sender = message['sender_name']
            message_text = message['text']
            
            # Check if message_text is a string representation of a dictionary
            if isinstance(message_text, str):
                try:
                    # Try to parse message_text as a dictionary only if it appears to be a dictionary or JSON string
                    if message_text.strip().startswith('{') and message_text.strip().endswith('}'):
                        message_json = ast.literal_eval(message_text)
                        # If parsed successfully and is a dictionary, use its contents
                        if isinstance(message_json, dict):
                            text = message_json.get('event', {}).get('message', {}).get('text', message_text)
                        else:
                            text = message_text
                    else:
                        text = message_text
                except (ValueError, SyntaxError):
                    # If parsing fails, assume message_text is the plain text
                    text = message_text
            else:
                # If message_text is not a string, use it directly
                text = message_text

            # Handling the timestamp conversion
            # if isinstance(timestamp, int):  # If timestamp is in milliseconds
            #     timestamp = datetime.fromtimestamp(timestamp / 1000)
            # elif isinstance(timestamp, str):  # If timestamp is a string
            #     try:
            #         timestamp = datetime.strptime(timestamp, "%Y-%m-%d %H:%M:%S")
            #     except ValueError:
            #         # Fallback for other timestamp formats
            #         timestamp = message['timestamp']

            # Append the formatted message to chat_history
            chat_history += f"{sender}: {text}\n"
        
        return chat_history

    def set_get_started_button(self, user_info, page_info):
        user_id = user_info.get("user_id", "")
        page_id = page_info.get("page_id", "")

        # print("🟪 Setting get started")
            
        print(f"Setting Get Started button with payload for user {user_id}")
        url = "https://graph.facebook.com/v2.6/me/messenger_profile"
        token = page_info.get("page_access_token", "")
        headers = {
            "Content-Type": "application/json"
        }
        data = {
            "get_started": {"payload": "get_started"}
        }
        response = requests.post(url, headers=headers, json=data, params={"access_token": token})

        if response.status_code == 200:
            return True
        else:
            return False

    def set_greeting_message(self, page_info):
        print("Setting greeting message")
        url = "https://graph.facebook.com/v2.6/me/messenger_profile"
        token = page_info.get("page_access_token", "")
        headers = {
            "Content-Type": "application/json"
        }
        data = {
            "greeting": [
                {
                    "locale": "default",
                    "text": self.greeting_message
                }
            ]
        }
        response = requests.post(url, headers=headers, json=data, params={"access_token": token})

        if response.status_code == 200:
            return True
        else:
            return False

    def set_menu_items(self, user_info, page_info, menu_items):
        user_id = user_info.get("user_id", "")
        page_id = page_info.get("page_id", "")

        print(f"Setting menu items for user {user_id}")
        print("Menu items", menu_items)
        url = "https://graph.facebook.com/v20.0/me/custom_user_settings"
        token = page_info.get("page_access_token", "")
        headers = {
            "Content-Type": "application/json"
        }

        data = {
            "psid": user_id,
            "persistent_menu": [
                {
                    "locale": "default",
                    # "composer_input_disabled": False,
                    "call_to_actions": menu_items
                }
            ]
        }
        response = requests.post(url, headers=headers, json=data, params={"access_token": token})
        print("Response", response)
        print("Data", data)
        if response.status_code == 200:
            return True
        else:
            return False