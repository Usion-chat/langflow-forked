from langflow.custom import Component
from langflow.io import MultilineInput, Output, DataInput, StrInput
from langflow.schema.message import Message
from langflow.schema import Data
from langflow.inputs import BoolInput

class ExecuteAction(Component):
    display_name = "Execute Actions"
    description = "Execute an action."
    icon = "merge"
    name = "ExecuteAction"

    inputs = [
        StrInput(
            name="function_name",
            display_name="Name of the Function",
            info="Function name to execute",
        ),
        DataInput(
            name="data_input",
            display_name="Data",
            info="Data",
            is_list=True
        ),
        BoolInput(
            name="starts_with",
            display_name="Starts with",
            info="If True, it will output JSON regardless of passing a schema.",
            value=False
        )
    ]

    outputs = [Output(display_name="Data", name="data_output", method="executed_action")]

    def executed_action(self) -> Data:
        # make it first item of self.data_input.value 
        self.data_input = self.data_input[0]

        # Accessing values
        function_name = self.function_name.strip()
        data_function_name = self.data_input.value.get("function", {}).get("name", "").strip()

        # Check if starts_with is True
        if self.starts_with == True:
            # Check if the function_name starts with the data_function_name
            if data_function_name.startswith(function_name):
                return Data(value=self.data_input.value)
            else:
                self.stop("data_output")
                return None
        else:
            # Check for exact match if starts_with is False
            if data_function_name == function_name:
                print("passing to this function", function_name)
                return Data(value=self.data_input.value)
            else:
                self.stop("data_output")
                return None