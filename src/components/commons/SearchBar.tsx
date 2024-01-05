import React, { useState } from "react";
import styled from "styled-components";
import searchIcon from "../../assets/Search.png";
import closeIcon from "../../assets/_close.png";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSearch = () => {
    onSearch(value);
  };

  const handleClear = () => {
    setValue("");
  };

  return (
    <div>
      <SearchBarContainer>
        <SearchIcon src={searchIcon} alt="검색 아이콘" />
        <SearchBarInput
          placeholder="링크로 검색해 보세요."
          value={value}
          onChange={handleChange}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        {value && <CloseIcon onClick={handleClear} />}
      </SearchBarContainer>
    </div>
  );
}

export default SearchBar;

const SearchBarContainer = styled.div`
  position: relative;
`;

const SearchBarInput = styled.input`
  background-color: #f5f5f5;
  width: 100%;
  height: 5.4rem;
  border: none;
  border-radius: 1rem;
  padding-left: 4rem;
  margin: 4rem auto;
`;

const SearchIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 1.6rem;
  transform: translateY(-50%);
`;

const CloseIcon = styled.button`
  width: 2.4rem;
  height: 2.4rem;
  position: absolute;
  top: 50%;
  right: 1.6rem;
  transform: translateY(-50%);
  background-image: url(${closeIcon});
  background-size: 100%;
`;
