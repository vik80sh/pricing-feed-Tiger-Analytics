import { toast } from "react-toastify/unstyled";
import { ERROR_MESSAGES } from "./constants";

export const exportToCsv = <T extends Record<string, any>>(
  filename: string,
  rows: T[]
) => {
  if (!rows || !rows.length) {
     toast.error(ERROR_MESSAGES.NO_DATA_TO_EXPORT);
    return;
  }

  const headers = Object.keys(rows[0]);

  const csvContent = [
    headers.join(","), 
    ...rows.map((row) =>
      headers.map((field) => JSON.stringify(row[field] ?? "")).join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
};
