import { useState, useEffect } from "react";
import IconComponent from "../../components/genericIconComponent";
import { Button } from "../../components/ui/button";
import BaseModal from "../baseModal";

export default function MyMediaModal({
  value,
  setValue,
  children,
  disabled,
  readonly = false,
}: any): JSX.Element {
  const [modalOpen, setModalOpen] = useState(false);

  // State to hold the type and URL
  const [mediaType, setMediaType] = useState("image");
  const [url, setUrl] = useState("");

  // useEffect to initialize state from value when modal opens
  useEffect(() => {
    if (modalOpen) {
      if (value) {
        try {
          const parsedValue = JSON.parse(value);

          // Initialize mediaType and url from the parsed value
          setMediaType(parsedValue.type || "image");
          setUrl(parsedValue.payload?.url || "");
        } catch (e) {
          console.error("Invalid JSON in value:", value);
          // Handle invalid JSON by resetting to default values
          setMediaType("image");
          setUrl("");
        }
      } else {
        // If value is empty, reset to default values
        setMediaType("image");
        setUrl("");
      }
    }
  }, [value, modalOpen]);

  return (
    <BaseModal
      onChangeOpenModal={(open) => {}}
      open={modalOpen}
      setOpen={setModalOpen}
      size="medium"
    >
      <BaseModal.Trigger disable={disabled} asChild>
        {children}
      </BaseModal.Trigger>
      <BaseModal.Header description="Edit Media">
        <div className="flex w-full items-start gap-3">
          <div className="flex">
            <span className="pr-2" data-testid="modal-title">
              Edit Media
            </span>
            <IconComponent
              name={"Image"}
              className="h-6 w-6 pl-1 text-primary"
              aria-hidden="true"
            />
          </div>
        </div>
      </BaseModal.Header>

      <BaseModal.Content overflowHidden>
        <div className="flex h-full w-full rounded-lg border p-4">
          {/* Form Section */}
          <div className="flex flex-col w-full space-y-4">
            {/* Media Type Selection */}
            <div className="flex items-center space-x-2">
              <span className="w-1/4 font-semibold">Type</span>
              <select
                className="w-full p-2 border rounded bg-gray-200 h-10 text-black"
                value={mediaType}
                onChange={(e) => setMediaType(e.target.value)}
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
                <option value="audio">Audio</option>
                <option value="file">File</option>
              </select>
            </div>

            {/* URL Input */}
            <div className="flex items-center space-x-2">
              <span className="w-1/4 font-semibold">URL</span>
              <input
                type="text"
                className="w-full p-2 border rounded bg-gray-200 h-10 text-black"
                placeholder="Enter URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </div>
        </div>
      </BaseModal.Content>

      <BaseModal.Footer>
        <div className="flex w-full shrink-0 items-end justify-end">
          <Button
            data-testid="mediaModalBtnSave"
            id="mediaModalBtnSave"
            disabled={readonly}
            onClick={() => {
              // Prepare the output object
              const output = {
                type: mediaType,
                payload: {
                  url: url,
                },
              };
              setValue(JSON.stringify(output));
              setModalOpen(false);
            }}
            type="submit"
          >
            Finish Editing
          </Button>
        </div>
      </BaseModal.Footer>
    </BaseModal>
  );
}

