import { useState } from "react";
import styled from "styled-components";
import kakaoShare from "../../../assets/Kakao-share.png";
import facebookShare from "../../../assets/Facebook-share.png";
import linkShare from "../../../assets/link-share.png";

interface ShareButtonsProps {
  folderId?: number;
}

const ShareButtons = ({ folderId }: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);

  const shareLink = `${window.location.origin}/shared?user=1&folder=${folderId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
  };

  const resetCopiedStatus = () => {
    setCopied(false);
  };

  return (
    <StyledModalShareSNS>
      <StyledShareSNS
        href={`https://www.kakaotalk.com/sharer/kakao?u=${encodeURIComponent(shareLink)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <StyledShareIcon src={kakaoShare} alt="kakao share" />
        카카오톡
      </StyledShareSNS>
      <StyledShareSNS
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <StyledShareIcon src={facebookShare} alt="facebook share" />
        페이스북
      </StyledShareSNS>
      <StyledShareLinkButton onClick={copyToClipboard} onMouseLeave={resetCopiedStatus}>
        <StyledShareIcon src={linkShare} alt="linkshare" />
        {copied ? "복사 완료!" : "링크 복사"}
      </StyledShareLinkButton>
    </StyledModalShareSNS>
  );
};

export default ShareButtons;

const StyledModalShareSNS = styled.div`
  display: flex;
  gap: 3.2rem;
`;

const StyledShareIcon = styled.img`
  width: 4rem;
  height: 4rem;
`;

const StyledShareSNS = styled.a`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  text-decoration: none;
  color: var(--gray-80-color);
  font-size: 1.3rem;
`;

const StyledShareLinkButton = styled.button`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  text-decoration: none;
  color: var(--gray-80-color);
  font-size: 1.3rem;
`;
