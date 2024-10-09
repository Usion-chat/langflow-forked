from langflow.custom import Component
from langflow.io import MultilineInput, Output, DataInput
from langflow.schema.message import Message
from langflow.schema import Data


class HubspotAssignUser(Component):
    display_name = "Hubspot Assign User"
    description = "Assign user to hubspot"
    icon = "merge"
    name = "HubspotAssignUser"

    inputs = [
        MultilineInput(name="page_id", display_name="Page id"),
        DataInput(
            name="message_data",
            display_name="Message Data",
            info="Send message text",
        )
    ]

    outputs = [
        Output(display_name="Message", name="message_output", method="get_name")
        ]
    

    def get_name(self) -> Data:
        stamp = self.message_data.value.get("stamp", {})
        url = "https://ee61b99fb7a4.ngrok.app/hubspot/assign-to-least-busy"
        
        # Prepare the request body
        body = {
            "stamp": stamp,
            "name": self.message_data.value["name"],
            "page_id": self.page_id.strip()
        }

        # Make the POST request
        try:
            response = requests.post(url, json=body)
            response.raise_for_status()  # Check for HTTP errors

            # Parse the response as JSON
            response_data = response.json()

            # Check if the result in the response is True
            if response_data.get("result") == True:
                return self.message_data
            else:
                self.stop("message_output")
                return None
        except requests.exceptions.RequestException as e:
            print(f"Request failed: {e}")
            self.stop("message_output")
            return None
        except ValueError as e:
            # Handle JSON decoding error
            print(f"Error parsing response JSON: {e}")
            self.stop("message_output")
            return None