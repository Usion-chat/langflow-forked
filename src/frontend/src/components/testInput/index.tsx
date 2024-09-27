import { Button } from "../ui/button";

export default function What({
  value,
  onChange,
  disabled,
  id,
}: {
  value: any;
  onChange: (value: any) => void;
  disabled: boolean;
  id: string;
}): JSX.Element {
  
  // Function to extract UUID from the current URL
  const extractUUIDFromURL = () => {
    const currentUrl = window.location.href;
    const uuidMatch = currentUrl.match(/\/flow\/([a-z0-9-]+)/);
    return uuidMatch ? uuidMatch[1] : null;
  };

  // Handle new tab open and set cookie
  const handleOpenNewTabAndSetCookie = () => {
    const valueToSet = value || "default_value";
    
    // Extract UUID from the current URL
    const uuid = extractUUIDFromURL();
    
    // Construct the new URL to open
    const newUrl = uuid ? `https://fb.mongolai.mn/?uuid=${uuid}` : "https://fb.mongolai.mn/";

    // Open a new tab with the constructed URL
    window.open(newUrl, "_blank");
  };

  return (
    <div className="flex h-full w-full">
      {value ? (
        <div
          className="w-full h-full text-base flex items-center justify-center text-green-500"
          style={{ backgroundColor: "#e0f7e0" }} // Light green background
        >
          You are already logged in
        </div>
      ) : (
        <Button
          onClick={handleOpenNewTabAndSetCookie}
          data-testid="openNewTabButton"
          id="openNewTabButton"
          disabled={disabled}
          className="w-full h-full text-base flex items-center justify-center"
        >
          Login to Facebook
        </Button>
      )}
    </div>
  );
}
