import { useEffect, useState } from "react";
import MyMediaModal from "../../modals/facebookMediaModal";
import { CodeAreaComponentType } from "../../types/components";
import { cn } from "../../utils/utils";
import { Button } from "../ui/button";

import IconComponent from "../genericIconComponent";

export default function FacebookMediaComponent({
  value,
  onChange,
  disabled,
  editNode = false,
  nodeClass,
  dynamic,
  setNodeClass,
  id = "",
  readonly = false,
  open,
  setOpen,
}: CodeAreaComponentType) {
  const [componentValue, setComponentValue] = useState(
    typeof value == "string" ? value : JSON.stringify(value),
  );
  useEffect(() => {
    if (disabled && componentValue !== "") {
      setComponentValue("");
      onChange("", undefined, true);
    }
  }, [disabled]);

  useEffect(() => {
    setComponentValue(typeof value == "string" ? value : JSON.stringify(value));
  }, [value]);

  const handleValueChange = (newValue) => {
    onChange(newValue);
  };

  const renderInputText = () => (
    <span
      id={id}
      data-testid={id}
      className={cn(
        editNode
          ? "input-edit-node input-dialog"
          : "primary-input text-muted-foreground",
        disabled && !editNode && "input-disable input-ring",
      )}
    >
      {value !== "" ? value : "Type something..."}
    </span>
  );

  const renderExternalLinkIcon = () => {
    if (editNode) return null;

    return (
      <IconComponent
        name="ExternalLink"
        className={cn(
          "icons-parameters-comp shrink-0",
          disabled ? "text-ring" : "hover:text-accent-foreground",
        )}
      />
    );
  };

  return (
    <div className={cn("w-full", disabled && "pointer-events-none")}>
      <MyMediaModal
        open={open}
        setOpen={setOpen}
        readonly={readonly}
        dynamic={dynamic}
        value={value}
        nodeClass={nodeClass}
        setNodeClass={setNodeClass!}
        setValue={handleValueChange}
      >
        <div className="flex w-full items-center gap-3">
          <Button style={{width: "100%"}}>
            Edit Facebook Media
          </Button>
        </div>
      </MyMediaModal>
    </div>
  );
}
