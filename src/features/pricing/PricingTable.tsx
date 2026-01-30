import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import type { PricingRecord } from "./pricingSlice";

const PricingTable: React.FC = () => {
  const records = useSelector(
    (state: RootState) => state.pricing.records
  );

  if (records.length === 0) {
    return <p>No pricing data available. Please upload a CSV file.</p>;
  }

  return (
    <div>
      <h2>Pricing Records</h2>
      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Store ID</th>
            <th>SKU</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record: PricingRecord, index: number) => (
            <tr key={`${record.storeId}-${record.sku}-${index}`}>
              <td>{record.storeId}</td>
              <td>{record.sku}</td>
              <td>{record.productName}</td>
              <td>{record.price}</td>
              <td>{record.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PricingTable;
