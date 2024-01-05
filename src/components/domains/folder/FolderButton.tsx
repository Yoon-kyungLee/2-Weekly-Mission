import styled from "styled-components";
import { Link } from "react-router-dom";

interface FolderButtonProps {
  folderName: string;
  folderId?: number;
  onFolderClick: (folder: { folderId: number | null; folderName: string }) => void;
  isActive?: boolean;
}

function FolderButton({ folderId, folderName, onFolderClick }: FolderButtonProps) {
  const handleFolderClick = () => {
    onFolderClick({ folderId, folderName });
  };

  return (
    <Link to={`/folder/${folderId || ""}`}>
      <StyledFolderButton onClick={handleFolderClick}>{folderName}</StyledFolderButton>
    </Link>
  );
}

export default FolderButton;

const StyledFolderButton = styled.button`
  padding: 8px 12px;
  border-radius: 5px;
  border: 1px solid var(--primary-color);
  background: var(--white-color);
  height: 4rem;

  &:hover,
  &:focus {
    background-color: var(--primary-color);
    color: var(--white-color);
  }
`;
