import React, { useState } from "react";
import "./SearchBar.css";

interface SearchBarProps {
  placeholder?: string;
  value: string;              
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  value,
  onSearch,
}) => {

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="search-bar">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
