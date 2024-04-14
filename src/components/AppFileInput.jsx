import { useState } from "react";
import { uuidv4 } from "../utils/helpers";
import PropTypes from "prop-types";

export default function AppFileInput({
  buttonText = "Select file",
  outputType = "text",
  accept,
  onSelected,
}) {
  const [inputKey, setInputKey] = useState(uuidv4());
  const [ready, setReady] = useState(true);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content =
          outputType === "base64" ? e.target.result(",")[1] : e.target.result;
        // REMOVE THIS COMMENT AFTER IMPLEMENTING: Parent should pass an onSelected function prop that takes an arguement
        if (onSelected) {
          onSelected({
            content,
            mime: file.type,
            size: file.size,
          });
        }
        setReady(false);
        setInputKey(uuidv4()); // Reset the input key
        setReady(true);
      };
      if (outputType === "text") {
        reader.readAsText(file);
      } else if (outputType === "base64") {
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div>
      <label htmlFor="" className="btn btn-secondary pointer mb-0">
        <i className="material-icons md-18 mr-2 va-tt">cloud_upload</i>
        {buttonText}
      </label>
      {ready && (
        <input
          className="d none"
          accept={accept}
          type="file"
          id={inputKey}
          key={inputKey}
          onChange={handleFileUpload}
        />
      )}
    </div>
  );
}

AppFileInput.propTypes = {
  buttonText: PropTypes.string,
  outputType: PropTypes.oneOf(["text", "base64"]),
  accept: PropTypes.string,
  onSelected: PropTypes.func,
};
