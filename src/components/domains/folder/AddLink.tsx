import { useState, useEffect, FC, useRef } from "react";
import styled from "styled-components";
import { getLinks, getFolders } from "../../../services/api";
import { LinkData, FolderData } from "../../../utils/interface";
import addLink from "../../../assets/add-link.png";
import checkIcon from "../../../assets/check.svg";
import useModal, { ModalProps } from "../../../hooks/useModal";
import React from "react";
import ModalPotal from "../../../helpers/Portal";

interface FolderLinkButtonProps {
  folderId?: number;
  folderName?: string;
  onClick?: () => void;
}

const FolderLinkButton = ({ folderId, folderName, onClick }: FolderLinkButtonProps) => {
  const [isActive, setIsActive] = useState(false);
  const [links, setLinks] = useState<LinkData[]>([]);

  useEffect(() => {
    const fetchLinks = async () => {
      const apiEndpoint: any = folderId;

      const link = await getLinks(apiEndpoint);
      setLinks(link.data);
    };

    fetchLinks();
  }, [folderId]);

  const handleFolderClick = () => {
    setIsActive(!isActive);
    if (onClick) {
      onClick();
    }
  };

  return (
    <StyledLinkButton onClick={handleFolderClick}>
      <div>{folderName}</div>
      <span>{`${links ? links.length : 0}개 링크`}</span>
      {isActive && <img src={checkIcon} alt="check icon" />}
    </StyledLinkButton>
  );
};

function FolderLinks() {
  const [folders, setFolders] = useState<FolderData[]>([]);

  useEffect(() => {
    const fetchFolders = async () => {
      const folder = await getFolders();

      setFolders(folder.data);
    };

    fetchFolders();
  }, []);

  return (
    <StyledFolderLinkList>
      {folders.map((folder) => (
        <FolderLinkButton key={folder.id} folderId={folder.id} folderName={folder.name} />
      ))}
    </StyledFolderLinkList>
  );
}

function AddLink() {
  const { Modal, openModal } = useModal();
  const [linkInput, setLinkInput] = useState("");
  // const addLinkRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkInput(e.target.value);
  };

  // useEffect(() => {
  //   const currentRef = addLinkRef.current;
  //   const options = {
  //     threshold: 0.1,
  //   };

  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         // 상단에서는 가려줌
  //         currentRef.style.position = "absolute";
  //       } else {
  //         // 푸터가 시작되는 지점부터는 최하단에 고정
  //         currentRef.style.position = "fixed";
  //       }
  //     });
  //   }, options);

  //   if (currentRef) {
  //     observer.observe(currentRef);
  //   }

  //   return () => {
  //     if (currentRef) {
  //       observer.unobserve(currentRef);
  //     }
  //   };
  // }, []);

  return (
    // <AddLinkSection ref={addLinkRef}>
    <StyledAddLinkSection>
      <StyledAddLinkBar>
        <StyledAddLinkContainer>
          <StyledAddLinkInput placeholder="링크를 추가해 보세요" value={linkInput} onChange={handleInputChange} />
          <StyledAddLinkImg src={addLink} alt="링크 아이콘" />
          <StyledAddLinkButton onClick={openModal}>추가하기</StyledAddLinkButton>
          <ModalPotal>
            {(Modal as FC<ModalProps>)({
              title: "폴더에 추가",
              link: linkInput,
              list: <FolderLinks />,
              button: "추가하기",
              color: "blue",
            })}
          </ModalPotal>
        </StyledAddLinkContainer>
      </StyledAddLinkBar>
    </StyledAddLinkSection>
  );
}

export default AddLink;

const StyledAddLinkSection = styled.div`
  background-color: var(--gray-bg-color);
  padding: 3.2rem;
`;

const StyledAddLinkBar = styled.div`
  background-color: var(--gray-bg-color);
  padding: 2.4rem;
  z-index: 9;

  @media (max-width: 1200px) {
    padding-left: 3.2rem;
    padding-right: 3.2rem;
  }
`;
const StyledAddLinkContainer = styled.div`
  position: relative;
  max-width: 80rem;
  margin: auto;
`;

const StyledAddLinkInput = styled.input`
  width: 100%;
  padding-left: 5rem;
  height: 6.9rem;
  border-radius: 1.5rem;
  border: 1px solid var(--primary-color);
  color: var(--gray-60-color);
  font-size: 1.6rem;
`;

const StyledAddLinkButton = styled.button`
  background-image: var(--gradient-purpleblue-skyblue);
  color: var(--white-color);
  border-radius: 0.8rem;
  position: absolute;
  top: 50%;
  right: 2rem;
  transform: translateY(-50%);
  width: 8.1rem;
  font-size: 1.4rem;
  font-weight: 600;
  padding: 1rem 1.6rem;
`;

const StyledAddLinkImg = styled.img`
  position: absolute;
  top: 50%;
  left: 2rem;
  transform: translateY(-50%);
`;

const StyledLinkButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.6rem;
  font-weight: 400;
  text-align: start;
  border-radius: 0.8rem;
  padding: 0.8rem;
  width: 26.4rem;
  height: 4rem;

  &:hover,
  &:focus {
    background-color: var(--gray-bg-color);
  }

  div {
    font-size: 1.4rem;
  }

  span {
    flex: 1;
    color: var(--gray-60-color);
    font-size: 1.4rem;
  }

  img {
    width: 1.4rem;
    height: 1.4rem;
  }
`;
const StyledFolderLinkList = styled.div`
  display: flex;
  flex-direction: column;
`;
