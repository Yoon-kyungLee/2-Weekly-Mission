import { getSharedFolders } from "../../../services/api";
import { useEffect, useState } from "react";
import styled from "styled-components";
import formatTimeAgo from "../../../utils/formatTimeAgo";
import formatDate from "../../../utils/formatDate";
import noimage from "../../../assets/noimage.svg";

interface StyledCardProps {
  href: string;
}

interface Link {
  id: number;
  url: string;
  imageSource: string;
  title: string;
  description: string;
  createdAt: number;
}

interface SharedCardProps {
  card: Link;
}

function SharedCard({ card }: SharedCardProps) {
  const timeAgo = formatTimeAgo(card.createdAt);
  const date = formatDate(card.createdAt);

  return (
    <div>
      <StyledCard href={card.url} target="_blank" rel="noopener noreferrer">
        <StyledImgContainer>
          <StyledCardImg src={card.imageSource || noimage} alt={card.title} />
        </StyledImgContainer>
        <StyledCardInfo>
          <StyledTimeAgo>{timeAgo}</StyledTimeAgo>
          <StyledLinksDescription>{card.description}</StyledLinksDescription>
          <StyledCreatedAt>{date}</StyledCreatedAt>
        </StyledCardInfo>
      </StyledCard>
    </div>
  );
}

function SharedCardList() {
  const [folder, setFolder] = useState<Link[]>([]);

  useEffect(() => {
    const handleFolder = async () => {
      const { folder } = await getSharedFolders();
      setFolder(folder.links);
    };
    handleFolder();
  }, []);

  return (
    <StyledCards>
      {folder.map((card) => {
        return <SharedCard key={card.id} card={card} />;
      })}
    </StyledCards>
  );
}

export default SharedCardList;

const StyledImgContainer = styled.div`
  overflow: hidden;
`;

const StyledCard = styled.a<StyledCardProps>`
  background-color: var(--white-color);
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 34rem;
  height: 33.4rem;
  box-shadow: 0px 5px 25px 0px rgba(0, 0, 0, 0.08);
`;

const StyledCardImg = styled.img`
  width: 34rem;
  height: 20rem;
  object-fit: cover;

  &:hover {
    transform: scale(1.3);
    transition: all 1s;
  }
`;

const StyledCardInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
  padding: 1.5rem 2rem;
`;

const StyledTimeAgo = styled.p`
  color: #666;
  font-size: 13px;
  font-weight: 400;
`;

const StyledLinksDescription = styled.p`
  overflow: hidden;
  color: #000;
  text-overflow: ellipsis;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 24px;
  height: 4.9rem;
  width: 100%;
`;

const StyledCreatedAt = styled.p`
  color: #333;
  white-space: nowrap;
  font-size: 1.4rem;
  font-weight: 400;
`;

const StyledCards = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: 2rem;
  row-gap: 2.5rem;
`;
