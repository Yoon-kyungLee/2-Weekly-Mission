import { getLinks } from "../../services/api";
import { useEffect, useState } from "react";
import Kebab from "./Kebab";
import formatTimeAgo from "../../utils/FormatTimeAgo";
import formatDate from "../../utils/formatDate";
import noimage from "../../assets/noimage.svg";
import starDefault from "../../assets/star-default.png";
import "./FolderCardList.css";
import "./Card.css";

function Card({ card }) {
  const timeAgo = formatTimeAgo(card.created_at);
  const date = formatDate(card.created_at);

  return (
    <div>
      <a
        href={card.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card"
      >
        <div className="img-container">
          <img
            className="card-img"
            src={card.image_source || noimage}
            alt={card.title}
            type="card"
          />
          <img className="star-img" src={starDefault} alt="bookmark icon" />
        </div>
        <div className="card-info">
          <div className="card-info-top">
            <p className="time-ago">{timeAgo}</p>
            <Kebab />
          </div>
          <p className="links-description">{card.description}</p>
          <p className="cratedAt">{date}</p>
        </div>
      </a>
    </div>
  );
}

function FolderCardList({ folderId }) {
  const [link, setLink] = useState([]);

  useEffect(() => {
    const handleLink = async () => {
      const apiEndpoint = folderId ? `${folderId}` : ``;

      const link = await getLinks(apiEndpoint);
      setLink(link);
    };

    handleLink();
  }, [folderId]);

  return (
    <>
      {link.data && link.data.length > 0 ? (
        <div className="cards">
          {link.data?.map((card) => {
            return <Card key={card.id} card={card} />;
          })}
        </div>
      ) : (
        <div className="warn-message">
          <div className="noLink">저장된 링크가 없습니다</div>
        </div>
      )}
    </>
  );
}

export default FolderCardList;
