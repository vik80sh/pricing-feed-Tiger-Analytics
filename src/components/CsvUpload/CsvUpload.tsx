import React from "react";
import { useDispatch } from "react-redux";
import { setRecords } from "../../features/pricing/pricingSlice";
import { parseCsvFile } from "../../utils/csvParser";
import { ERROR_MESSAGES, FILE_INPUT } from "../../utils/constants";
import { ToastContainer, toast } from "react-toastify";

const CsvUpload: React.FC = () => {
  const dispatch = useDispatch();

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const records = await parseCsvFile(file);
      dispatch(setRecords(records));
    } catch (error) {
      console.error(ERROR_MESSAGES.CSV_PARSING_ERROR, error);
      toast(ERROR_MESSAGES.CSV_PARSING_FAILED, { type: "error" });
    }
  };

  return (
    <div>
      <input type="file" accept={FILE_INPUT.ACCEPT} onChange={handleFileUpload} />
    </div>
  );
};

export default CsvUpload;
