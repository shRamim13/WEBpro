import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const usePinToggle = () => {
  const [visible, setVisibility] = useState(false);
  const Icon = (
    <FontAwesomeIcon
      icon={visible ? faEyeSlash : faEye}
      onClick={() => setVisibility((visibility) => !visibility)}
    />
  );
  const InputType = visible ? "text" : "password";

  return [InputType, Icon];
};

export default usePinToggle;
