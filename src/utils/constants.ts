// Error Messages
export const CSV_VALIDATION_ERRORS = {
  MISSING_REQUIRED_FIELD: (rowNum: number) => `Row ${rowNum}: Missing required field`,
  PRICE_NOT_A_NUMBER: (rowNum: number) => `Row ${rowNum}: Price is not a number`,
  INVALID_DATE: (rowNum: number) => `Row ${rowNum}: Invalid date`,
};

export const ERROR_MESSAGES = {
  CSV_PARSING_ERROR: "Error parsing CSV file:",
  CSV_PARSING_FAILED: "Failed to parse CSV file",
  CSV_IMPORT_ERRORS: "CSV Errors:",
  PRICE_MUST_BE_NUMBER: "Price must be a number",
  INVALID_DATE: "Date is invalid",
  NO_DATA_TO_EXPORT: "No data to export",
  NO_DATA_TO_DISPLAY: "No data displayed For",
  NO_PRICING_DATA: "No pricing data available. Please upload a new CSV file or check existing data.",
};

// UI Labels and Headings
export const UI_LABELS = {
  PRICING_RECORDS: "Pricing Records",
  UPLOAD_PRICING_CSV: "Upload Pricing CSV",
  NO_PRICING_DATA: "No pricing data available. Please upload a CSV file.",
  SEARCH_PLACEHOLDER: "Search by Store ID, SKU or Product Name",
  EXPORT_CSV_BUTTON: "Export CSV",
  UPLOAD_SUCCESS: "CSV file uploaded successfully",
  UPLOAD_BUTTON: "Upload CSV",

};

// Column Headers
export const COLUMN_HEADERS = {
  STORE_ID: "Store ID",
  SKU: "SKU",
  PRODUCT_NAME: "Product Name",
  PRICE: "Price",
  DATE: "Date",
  ACTIONS: "Actions",
};

// Button Labels
export const BUTTON_LABELS = {
  EDIT: "Edit",
  SAVE: "Save",
  DELETE: "Delete",
  PREVIOUS: "Previous",
  NEXT: "Next",
};

// CSV Headers
export const CSV_HEADERS = {
  STORE_ID: ["Store ID", "storeId"],
  SKU: ["SKU", "sku"],
  PRODUCT_NAME: ["Product Name", "productName"],
  PRICE: ["Price", "price"],
  DATE: ["Date", "date"],
};

// Local Storage Keys
export const STORAGE_KEYS = {
  PRICING_RECORDS: "pricing_records",
};

// Export Filenames
export const EXPORT_FILENAMES = {
  PRICING_DATA: "pricing-data.csv",
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
};

// Sorting
export const SORT_SYMBOLS = {
  ASC: " 🔼",
  DESC: " 🔽",
};

// File Input
export const FILE_INPUT = {
  ACCEPT: ".csv",
  SEARCH_INPUT_PLACEHOLDER: "Search...",
};

// Data Columns Configuration
export const PRICING_COLUMNS = [
  { key: "storeId", label: COLUMN_HEADERS.STORE_ID },
  { key: "sku", label: COLUMN_HEADERS.SKU },
  { key: "productName", label: COLUMN_HEADERS.PRODUCT_NAME },
  { key: "price", label: COLUMN_HEADERS.PRICE, editable: true },
  { key: "date", label: COLUMN_HEADERS.DATE, editable: true },
];
