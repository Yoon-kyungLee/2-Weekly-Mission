import React, { useState } from "react";
import styled from "styled-components";
import searchIcon from "../../assets/Search.png";
import closeIcon from "../../assets/_close.png";

function SearchBar({ onSearchChange }: { onSearchChange: (value: string) => void }) {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onSearchChange(e.target.value);
  };

  return (
    <div>
      <SearchBarContainer>
        <SearchIcon src={searchIcon} alt="검색 아이콘" />
        <SearchBarInput type="search" placeholder="링크로 검색해 보세요." value={value} onChange={handleChange} />
        {value && <CloseIcon onClick={() => setValue("")} />}
      </SearchBarContainer>
      {value !== "" ? (
        <SearchResult>
          <span>{value}</span>로 검색한 결과입니다.
        </SearchResult>
      ) : null}
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

const SearchResult = styled.div`
  font-size: 3.2rem;
  margin-bottom: 4rem;
  color: rgba(159, 166, 178, 1);

  span {
    font-size: 3.2rem;
    color: rgba(55, 55, 64, 1);
  }
`;
