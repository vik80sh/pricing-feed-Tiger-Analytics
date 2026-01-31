import React, { useRef, useState } from "react";
import { ERROR_MESSAGES, FILE_INPUT, UI_LABELS } from "../../utils/constants";
import { toast } from "react-toastify";
import "./CsvUpload.css";

interface CsvUploadProps {
    onFileParsed: (file: File) => Promise<void>; 
}

const CsvUpload: React.FC<CsvUploadProps> = ({ onFileParsed }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    try {
      await onFileParsed(file);
      toast(UI_LABELS.UPLOAD_SUCCESS, { type: "success" });
    } catch (error) {
      console.error(ERROR_MESSAGES.CSV_PARSING_ERROR, error);
      toast(ERROR_MESSAGES.CSV_PARSING_FAILED, { type: "error" });
    }
  };

  return (
    <div className="csv-upload">
      <input
        ref={fileInputRef}
        type="file"
        accept={FILE_INPUT.ACCEPT}
        onChange={handleFileUpload}
        className="csv-input"
      />

      <button
        className="btn primary"
        onClick={() => fileInputRef.current?.click()}
      >
        {UI_LABELS.UPLOAD_BUTTON}
      </button>

      {fileName && <span className="file-name">{fileName}</span>}
    </div>
  );
};

export default CsvUpload;
