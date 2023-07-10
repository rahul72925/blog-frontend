import React, { useState } from "react";
import { InputFiled } from "../inputField";
import { Button } from "../button";

export const BlogSearch = ({ handleSearch, isSearched }) => {
  const [search, setSearch] = useState("");

  const handleOnChange = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleOnSearch = () => {
    handleSearch(search);
  };
  const handleClear = () => {
    setSearch("");
    handleSearch(null);
  };
  return (
    <div className="flex justify-center p-4 w-full">
      <div className="w-full flex gap-4 p-4 md:w-2/3">
        <InputFiled
          placeholder="search..."
          value={search}
          onChange={handleOnChange}
        />
        <Button onClick={handleOnSearch}>Search</Button>
        {search.length > 0 && isSearched && (
          <Button onClick={handleClear} variant="outline">
            Clear
          </Button>
        )}
      </div>
    </div>
  );
};
