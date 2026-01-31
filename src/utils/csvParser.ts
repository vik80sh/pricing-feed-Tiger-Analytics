import Papa, { type ParseResult } from "papaparse";
import type { PricingRecord } from "../features/pricing/pricingSlice";
import { CSV_HEADERS, CSV_VALIDATION_ERRORS, ERROR_MESSAGES } from "./constants";
import { toast } from "react-toastify/unstyled";

export const parseCsvFile = (file: File): Promise<PricingRecord[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: ParseResult<any>) => {
        const formattedData: PricingRecord[] = [];
        const errors: string[] = [];

        results.data.forEach((row: any, index: number) => {
          const storeId = row[CSV_HEADERS.STORE_ID[0]] || row[CSV_HEADERS.STORE_ID[1]];
          const sku = row[CSV_HEADERS.SKU[0]] || row[CSV_HEADERS.SKU[1]];
          const productName = row[CSV_HEADERS.PRODUCT_NAME[0]] || row[CSV_HEADERS.PRODUCT_NAME[1]];
          const price = Number(row[CSV_HEADERS.PRICE[0]] || row[CSV_HEADERS.PRICE[1]]);
          const date = row[CSV_HEADERS.DATE[0]] || row[CSV_HEADERS.DATE[1]];

          if (!storeId || !sku || !productName) {
            errors.push(CSV_VALIDATION_ERRORS.MISSING_REQUIRED_FIELD(index + 1));
            return;
          }

          if (isNaN(price)) {
            errors.push(CSV_VALIDATION_ERRORS.PRICE_NOT_A_NUMBER(index + 1));
            return;
          }

          if (isNaN(Date.parse(date))) {
            errors.push(CSV_VALIDATION_ERRORS.INVALID_DATE(index + 1));
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
          toast.error( ERROR_MESSAGES.CSV_IMPORT_ERRORS + " " + ERROR_MESSAGES.NO_DATA_TO_DISPLAY + "\n" + errors.join("\n"));
        }

        resolve(formattedData);
      },
      error: (error) => reject(error),
    });
  });
};
