import React, { useEffect, useState } from "react";
import { getLinks } from "../../../services/api";
import { LinkData } from "../../../utils/interface";
import styled from "styled-components";
import Kebab from "./Kebab";
import formatTimeAgo from "../../../utils/formatTimeAgo";
import formatDate from "../../../utils/formatDate";
import noimage from "../../../assets/noimage.svg";
import starDefault from "../../../assets/star-default.png";

interface StyledCardProps {
  href: string;
}

interface FolderCardProps {
  card: LinkData;
}

interface FolderCardListProps {
  folderId: number;
  link?: LinkData[];
}

function FolderCard({ card }: FolderCardProps) {
  const timeAgo = formatTimeAgo(card.created_at);
  const date = formatDate(card.created_at);

  return (
    <StyledCard href={card.url} target="_blank" rel="noopener noreferrer">
      <StyledImgContainer>
        <StyledCardImg src={card.image_source || noimage} alt={card.title} />
        <StyledStarImg src={starDefault} alt="bookmark icon" />
      </StyledImgContainer>
      <StyledCardInfo>
        <StyledCardInfoTop>
          <StyledTimeAgo>{timeAgo}</StyledTimeAgo>
          <Kebab />
        </StyledCardInfoTop>
        <StyledLinksDescription>{card.description}</StyledLinksDescription>
        <StyledCreatedAt>{date}</StyledCreatedAt>
      </StyledCardInfo>
    </StyledCard>
  );
}

function FolderCardList({ folderId }: FolderCardListProps) {
  const [links, setLinks] = useState<LinkData[]>([]);

  useEffect(() => {
    const fetchLinks = async () => {
      const apiEndpoint: any = folderId ? `${folderId}` : ``;

      const link = await getLinks(apiEndpoint);
      setLinks(link.data);
    };

    fetchLinks();
  }, [folderId]);

  return (
    <>
      {links && links.length > 0 ? (
        <StyledCards>
          {links.map((card) => {
            return <FolderCard key={card.id} card={card} />;
          })}
        </StyledCards>
      ) : (
        <div>
          <StyledNoLink>저장된 링크가 없습니다</StyledNoLink>
        </div>
      )}
    </>
  );
}

export default FolderCardList;

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

const StyledStarImg = styled.img`
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
`;

const StyledCardInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
  padding: 1.5rem 2rem;
`;

const StyledCardInfoTop = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
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

const StyledNoLink = styled.div`
  color: #000;
  font-weight: 400;
  font-size: 1.6rem;
  text-align: center;
  width: 100%;
  padding-top: 4.1rem;
  padding-bottom: 3.5rem;
`;
