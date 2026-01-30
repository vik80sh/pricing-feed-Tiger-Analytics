import React from "react";
import { useDispatch } from "react-redux";
import { setRecords } from "../../features/pricing/pricingSlice";
import { parseCsvFile } from "../../utils/csvParser";

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
      console.error("Error parsing CSV file:", error);
      alert("Failed to parse CSV file");
    }
  };

  return (
    <div>
      <h2>Upload Pricing CSV</h2>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
    </div>
  );
};

export default CsvUpload;
