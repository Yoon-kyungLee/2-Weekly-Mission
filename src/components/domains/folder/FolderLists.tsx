import { useEffect, useState } from "react";
import { getFolders } from "../../../services/api";
import styled from "styled-components";
import FolderButton from "./FolderButton";
import FolderCardList from "./FolderCardList";
import Option from "./Option";
import addIcon from "../../../assets/add-icon.svg";
import { FolderData, LinkData } from "../../../utils/interface";

interface SelectedFolder {
  id: any;
  name: string;
  link?: LinkData[];
}

function FolderLists() {
  const [folders, setFolders] = useState<FolderData[]>([]);
  const [selected, setSelected] = useState<SelectedFolder>({
    id: null,
    name: "전체",
    // link: [],
  });
  // const [search, setSearch] = useState<string>("");
  // const [filteredLinks, setFilteredLinks] = useState<LinkData[]>([]);

  useEffect(() => {
    const fetchFolders = async () => {
      const folder = await getFolders();

      setFolders(folder.data);
    };

    fetchFolders();
  }, []);

  const isFolderSelected = selected.id !== null && selected.name !== "전체";

  // useEffect(() => {
  //   const lowerCasedValue = search.toLowerCase();
  //   if (search) {
  //     const filtered = selected.link.filter((link) => {
  //       return (
  //         (link.url && link.url.includes(lowerCasedValue)) ||
  //         (link.title && link.title.includes(lowerCasedValue)) ||
  //         (link.description && link.description.includes(lowerCasedValue))
  //       );
  //     });
  //     setFilteredLinks(filtered);
  //   } else {
  //     setFilteredLinks(selected.link);
  //   }
  // }, [search, selected.link]);

  const handleFolderClick = ({ folderId, folderName }: { folderId: number; folderName: string }) => {
    setSelected({ id: folderId, name: folderName, link: [] });
  };

  return (
    <>
      <StyledFolders>
        <StyledFoldersTop>
          <StyledFolderButtons>
            <FolderButton folderName="전체" onFolderClick={handleFolderClick} isActive={selected.id === null} />
            {folders.map((folder) => (
              <FolderButton
                key={folder.id}
                folderId={folder.id}
                folderName={folder.name}
                onFolderClick={handleFolderClick}
              />
            ))}
          </StyledFolderButtons>
          <StyledAddIconImg src={addIcon} alt="add icon" />
        </StyledFoldersTop>
        <StyledNameAndOption>
          <StyledFolderName>{selected.name}</StyledFolderName>
          {isFolderSelected ? <Option folderName={selected.name} folderId={selected.id} /> : null}
        </StyledNameAndOption>
        <FolderCardList folderId={selected.id} />
      </StyledFolders>
    </>
  );
}

export default FolderLists;

const StyledFolders = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const StyledFoldersTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledFolderButtons = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1.2rem;
  flex-wrap: wrap;
`;

const StyledAddIconImg = styled.img`
  width: 1.6rem;
  height: 1.6rem;
`;

const StyledFolderName = styled.div`
  font-size: 2.4rem;
  font-weight: 600;
`;

const StyledNameAndOption = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  row-gap: 1.2rem;
`;
