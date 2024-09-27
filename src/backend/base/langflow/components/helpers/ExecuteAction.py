from langflow.custom import Component
from langflow.io import MultilineInput, Output, DataInput, StrInput
from langflow.schema.message import Message
from langflow.schema import Data


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
        )
    ]

    outputs = [Output(display_name="Data", name="data_output", method="executed_action")]

    def executed_action(self) -> Data:
        # print("ExecuteAction", self.data_input.value)
        if(self.data_input.value.get("function",{}).get("name") == self.function_name):
            return Data(value=self.data_input.value)
        else:
            self.stop("executed_action")
            return None
        