import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import type { PricingRecord } from "./pricingSlice";
import { UI_LABELS, COLUMN_HEADERS } from "../../utils/constants";

const PricingTable: React.FC = () => {
  const records = useSelector(
    (state: RootState) => state.pricing.records
  );

  if (records.length === 0) {
    return <p>{UI_LABELS.NO_PRICING_DATA}</p>;
  }

  return (
    <div>
      <h2>{UI_LABELS.PRICING_RECORDS}</h2>
      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>{COLUMN_HEADERS.STORE_ID}</th>
            <th>{COLUMN_HEADERS.SKU}</th>
            <th>{COLUMN_HEADERS.PRODUCT_NAME}</th>
            <th>{COLUMN_HEADERS.PRICE}</th>
            <th>{COLUMN_HEADERS.DATE}</th>
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
