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
  clearRecords,
} from "./pricingSlice";

import type { RootState } from "../../app/store";
import { exportToCsv } from "../../utils/csvExporter";
import {
  STORAGE_KEYS,
  UI_LABELS,
  EXPORT_FILENAMES,
  PRICING_COLUMNS,
} from "../../utils/constants";

import "./PricingPage.css";

const PricingPage: React.FC = () => {
  const dispatch = useDispatch();
  const records = useSelector((state: RootState) => state.pricing.records);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRICING_RECORDS, JSON.stringify(records));
  }, [records]);

  const handleFileUpload = async (file: File) => {
    const parsedData = await parseCsvFile(file);
    setSearchQuery("");
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

  const handleClearAll = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear all pricing data?"
    );
    if (!confirmClear) return;

    localStorage.removeItem(STORAGE_KEYS.PRICING_RECORDS);
    dispatch(clearRecords());
    setSearchQuery("");
  };

  return (
    <div className="pricing-page">
     
      <div className="toolbar">
        <CsvUpload onFileParsed={handleFileUpload} />

        <button
          className="btn secondary"
          onClick={() =>
            exportToCsv(EXPORT_FILENAMES.PRICING_DATA, filteredRecords)
          }
        >
          {UI_LABELS.EXPORT_CSV_BUTTON}
        </button>

        <SearchBar
          placeholder={UI_LABELS.SEARCH_PLACEHOLDER}
          value={searchQuery} 
          onSearch={setSearchQuery}
        />

        <button className="btn danger" onClick={handleClearAll}>
          Clear All
        </button>
      </div>

     
      <div className="table-card">
        <DataTable<PricingRecord>
          columns={PRICING_COLUMNS as any}
          data={filteredRecords}
          onSave={(updatedRow) => dispatch(updateRecord(updatedRow))}
          onDelete={(row: PricingRecord) =>
            dispatch(deleteRecord({ storeId: row.storeId, sku: row.sku }))
          }
          pageSize={10}
        />
      </div>
    </div>
  );
};

export default PricingPage;
