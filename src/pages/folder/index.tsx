import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import Gnb from "../../components/commons/Gnb";
import AddLink from "../../components/domains/folder/AddLink";
import FolderLists from "../../components/domains/folder/FolderLists";
import Footer from "../../components/commons/Footer";
import FolderAddButton from "../../components/domains/folder/FolderAddButton";

function FolderPage() {
  const addLinkRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(true);

  useEffect(() => {
    const addLinkCurrentRef = addLinkRef.current;
    const footerCurrentRef = footerRef.current;
    if (!addLinkCurrentRef || !footerCurrentRef) return;

    let isAddLinkIntersecting = false;
    let isFooterIntersecting = false;

    const handler: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.target === addLinkCurrentRef) {
          isAddLinkIntersecting = entry.isIntersecting;
        } else if (entry.target === footerCurrentRef) {
          isFooterIntersecting = entry.isIntersecting;
        }
      });

      const shouldBeIntersecting =
        (isAddLinkIntersecting && isFooterIntersecting) ||
        isAddLinkIntersecting ||
        (!isAddLinkIntersecting && isFooterIntersecting);
      setIsSticky(shouldBeIntersecting);
    };

    const options = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(handler, options);

    observer.observe(addLinkCurrentRef);
    observer.observe(footerCurrentRef);

    return () => {
      observer.unobserve(addLinkCurrentRef);
      observer.unobserve(footerCurrentRef);
    };
  }, []);

  return (
    <>
      <Gnb />
      <AddLink ref={addLinkRef} $isSticky={isSticky} />
      <main>
        <StyledFolder>
          <FolderLists />
          <FolderAddButton />
        </StyledFolder>
      </main>
      <Footer />
      <div ref={footerRef} />
    </>
  );
}

export default FolderPage;

const StyledFolder = styled.div`
  max-width: 106rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 4rem;
  padding-bottom: 4rem;

  @media (max-width: 1200px) {
    padding: 4rem 3.2rem;
  }
`;
