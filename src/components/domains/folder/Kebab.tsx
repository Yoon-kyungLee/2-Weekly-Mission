import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import kebab from "../../../assets/kebab.png";

function Kebab() {
  const [isOpen, setIsOpen] = useState(false);

  const handleButton = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = () => setIsOpen(false);
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <StyledKebob
      onClick={(e) => {
        e.preventDefault();
        handleButton(e);
      }}
    >
      <img src={kebab} alt="kebab icon" />
      {isOpen && (
        <StyledPopup
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <StyledDelete key="delete">삭제하기</StyledDelete>
          <StyledAddInFolder key="add">폴더에 추가</StyledAddInFolder>
        </StyledPopup>
      )}
    </StyledKebob>
  );
}

export default Kebab;

const StyledKebob = styled.div`
  position: relative;
  width: 2.1rem;
  height: 1.7rem;
  cursor: pointer;
`;

const StyledPopup = styled.ul`
  padding: 0;
  margin: 0;
  width: 10rem;
  list-style: none;
  background-color: #fff;
  position: absolute;
  top: 1rem;
  left: 1rem;
  border: 1px solid #ebebeb;
  border-radius: 5px 0 5px 5px;
`;

const StyledDelete = styled.li`
  padding: 12px 7px;
  text-align: center;
  font-size: 1.4rem;
  font-weight: 400;
  color: var(--gray-100-color);

  &:hover {
    background-color: var(--gray-10-color);
    color: var(--primary-color);
    cursor: pointer;
  }
`;

const StyledAddInFolder = styled.li`
  padding: 12px 7px;
  text-align: center;
  font-size: 1.4rem;
  font-weight: 400;
  color: var(--gray-100-color);

  &:hover {
    background-color: var(--gray-10-color);
    color: var(--primary-color);
    cursor: pointer;
  }
`;
