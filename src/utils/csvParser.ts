import Papa, { type ParseResult } from "papaparse";
import { PricingRecord } from "../features/pricing/pricingSlice";

export const parseCsvFile = (file: File): Promise<PricingRecord[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: ParseResult<any>) => {
        const formattedData: PricingRecord[] = [];
        const errors: string[] = [];

        results.data.forEach((row: any, index: number) => {
          const storeId = row["Store ID"] || row["storeId"];
          const sku = row["SKU"];
          const productName = row["Product Name"] || row["productName"];
          const price = Number(row["Price"]);
          const date = row["Date"];

          if (!storeId || !sku || !productName) {
            errors.push(`Row ${index + 1}: Missing required field`);
            return;
          }

          if (isNaN(price)) {
            errors.push(`Row ${index + 1}: Price is not a number`);
            return;
          }

          if (isNaN(Date.parse(date))) {
            errors.push(`Row ${index + 1}: Invalid date`);
            return;
          }

          formattedData.push({
            storeId,
            sku,
            productName,
            price,
            date,
          });
        });

        if (errors.length > 0) {
          alert("CSV Errors:\n" + errors.join("\n"));
        }

        resolve(formattedData);
      },
      error: (error) => reject(error),
    });
  });
};
