import React from "react";
import styled from "styled-components";
import Gnb from "../../components/commons/Gnb";
import Profile from "../../components/domains/shared/Profile";
// import SearchBar from "../../components/commons/SearchBar";
import SharedCardList from "../../components/domains/shared/SharedCardList";
import Footer from "../../components/commons/Footer";

function SharedPage() {
  return (
    <>
      <Gnb />
      <main>
        <Profile />
        <StyledFolder>
          {/* <SearchBar /> */}
          <SharedCardList />
        </StyledFolder>
      </main>
      <Footer />
    </>
  );
}

export default SharedPage;

const StyledFolder = styled.div`
  max-width: 106rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 4rem;
  padding-bottom: 4rem;

  @media (max-width: 1200px) {
    padding: 0 3.2rem;
  }
`;
