import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CsvUpload from "../../components/CsvUpload/CsvUpload";
import SearchBar from "../../components/SearchBar/SearchBar";
import DataTable from "../../components/DataTable/DataTable";

import { parseCsvFile } from "../../utils/csvParser";
import {
  setRecords,
  updateRecord,
  deleteRecord,
  type PricingRecord,
} from "./pricingSlice";

import type { RootState } from "../../app/store";
import { exportToCsv } from "../../utils/csvExporter";

const STORAGE_KEY = "pricing_records";

const PricingPage: React.FC = () => {
  const dispatch = useDispatch();
  const records = useSelector((state: RootState) => state.pricing.records);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      dispatch(setRecords(JSON.parse(stored)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }, [records]);

  const handleFileUpload = async (file: File) => {
    const parsedData = await parseCsvFile(file);
    dispatch(setRecords(parsedData));
  };

  const filteredRecords = records.filter((record: PricingRecord) => {
    const q = searchQuery.toLowerCase();
    return (
      record.storeId.toLowerCase().includes(q) ||
      record.sku.toLowerCase().includes(q) ||
      record.productName.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <CsvUpload onFileParsed={handleFileUpload} />

      <SearchBar
        placeholder="Search by Store ID, SKU or Product Name"
        onSearch={setSearchQuery}
      />
      <button onClick={() => exportToCsv("pricing-data.csv", filteredRecords)}>
        Export CSV
      </button>
      <DataTable
        columns={[
          { key: "storeId", label: "Store ID" },
          { key: "sku", label: "SKU" },
          { key: "productName", label: "Product Name" },
          { key: "price", label: "Price", editable: true },
          { key: "date", label: "Date", editable: true },
        ]}
        data={filteredRecords}
        onSave={(updatedRow) => dispatch(updateRecord(updatedRow))}
        onDelete={(row: PricingRecord) =>
          dispatch(deleteRecord({ storeId: row.storeId, sku: row.sku }))
        }
        pageSize={10}
      />
    </div>
  );
};

export default PricingPage;
