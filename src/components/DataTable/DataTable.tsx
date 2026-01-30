import React, { useState } from "react";
import "./DataTable.css";

export interface Column<T> {
  key: keyof T;
  label: string;
  editable?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onSave?: (row: T) => void;
  onDelete?: (row: T) => void;
  pageSize?: number;
}

function DataTable<T extends Record<string, any>>({
  columns,
  data,
  onSave,
  onDelete,
  pageSize = 10,
}: DataTableProps<T>) {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedRow, setEditedRow] = useState<T | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // 🔹 Sorting
  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;

    const valA = a[sortKey];
    const valB = b[sortKey];

    if (valA === valB) return 0;

    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return sortOrder === "asc" ? -1 : 1;
  });

  // 🔹 Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = sortedData.slice(startIndex, startIndex + pageSize);

  const startEdit = (row: T, index: number) => {
    setEditIndex(index);
    setEditedRow({ ...row });
  };

  const handleChange = (key: keyof T, value: string) => {
    if (!editedRow) return;
    setEditedRow({ ...editedRow, [key]: value });
  };

  const handleSave = () => {
    if (!editedRow) return;

    if ("price" in editedRow && isNaN(Number(editedRow["price"]))) {
      alert("Price must be a number");
      return;
    }

    if ("date" in editedRow && isNaN(Date.parse(editedRow["date"]))) {
      alert("Date is invalid");
      return;
    }

    onSave?.(editedRow);
    setEditIndex(null);
    setEditedRow(null);
  };

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                onClick={() => handleSort(col.key)}
                className="sortable"
              >
                {col.label}
                {sortKey === col.key && (
                  <span>{sortOrder === "asc" ? " 🔼" : " 🔽"}</span>
                )}
              </th>
            ))}
            {(onSave || onDelete) && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col) => (
                <td key={String(col.key)}>
                  {editIndex === rowIndex && col.editable ? (
                    <input
                      value={String(editedRow?.[col.key] ?? "")}
                      onChange={(e) => handleChange(col.key, e.target.value)}
                    />
                  ) : (
                    String(row[col.key])
                  )}
                </td>
              ))}
              {(onSave || onDelete) && (
                <td>
                  {editIndex === rowIndex ? (
                    <button onClick={handleSave}>Save</button>
                  ) : (
                    <>
                      {onSave && (
                        <button onClick={() => startEdit(row, rowIndex)}>
                          Edit
                        </button>
                      )}
                      {onDelete && (
                        <button onClick={() => onDelete(row)}>Delete</button>
                      )}
                    </>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default DataTable;
