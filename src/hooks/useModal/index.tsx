import { useState, ReactNode } from "react";
import styled from "styled-components";
import exitIcon from "../../assets/exit-icon.png";
import ShareButtons from "../../components/domains/folder/ShareButtons";

export interface ModalProps {
  title: string;
  link?: string;
  list?: ReactNode;
  input?: string;
  button?: string;
  color?: "blue" | "red";
  shareSNS?: boolean;
  folderId?: number;
  placeholder?: string;
}

const useModal = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const Modal = ({ title, link, list, input, button, color, shareSNS, folderId, placeholder }: ModalProps) =>
    modalOpen ? (
      <ModalBackground>
        <ModalBox>
          <ModalContainer>
            <ModalTop>
              <ModalExit onClick={closeModal}>
                <img src={exitIcon} alt="exit icon" />
              </ModalExit>
              <ModalTitle>{title}</ModalTitle>
              <ModalLink>{link}</ModalLink>
            </ModalTop>
            {list && <ModalList>{list}</ModalList>}
            {input && <ModalInput placeholder={placeholder} />}
            {button && (
              <ModalButton onClick={closeModal} color={color as "blue" | "red"}>
                {button}
              </ModalButton>
            )}
            {shareSNS && <ShareButtons folderId={folderId} />}
          </ModalContainer>
        </ModalBox>
      </ModalBackground>
    ) : null;
  return { Modal, openModal, closeModal };
};

export default useModal;

const COLORS = {
  blue: `var(--gradient-purpleblue-skyblue)`,
  red: `red`,
};

const ModalBackground = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

const ModalBox = styled.div`
  background-color: var(--white-color);
  position: fixed;
  left: 50%;
  top: 50%;
  border-radius: 1.5rem;
  border: 1px solid #dee2e6;
  padding: 3.2rem 4rem;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
`;

const ModalTop = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  width: 28rem;
`;

const ModalExit = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.4rem;
  height: 2.4rem;
`;

const ModalTitle = styled.p`
  font-size: 2rem;
  font-weight: 700;
`;

const ModalLink = styled.p`
  color: var(--gray-60-color);
  font-size: 14px;
  font-weight: 400;
`;

const ModalList = styled.div`
  height: 17.2rem;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ModalInput = styled.input`
  width: 28rem;
  padding: 1.8rem 1.5rem;
  font-size: 1.6rem;
  font-weight: 400;
  border-radius: 8px;
  border: 1px solid var(--gray-20-color);

  &:focus {
    outline: 1px solid var(--primary-color);
  }
`;

const ModalButton = styled.button<{ color: "blue" | "red" }>`
  background: ${({ color }) => COLORS[color]};
  color: var(--white-color);
  border-radius: 0.8rem;
  padding: 1.6rem 2rem;
  width: 28rem;
`;
