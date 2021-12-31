import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Container>
      <span>&copy; {new Date().getFullYear()} WINTER</span>
      <p>Tiwitter Cloning</p>
      <div>
        {`GitHubLink : `}
        <a href="https://github.com/jae-hun-e/winter">
          https://github.com/jae-hun-e/winter
        </a>
      </div>
    </Container>
  );
};

export default Footer;

const Container = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    font-size: 15px;
    margin-bottom: 10px;
  }
  <<<<<<< HEAD p {
    margin-bottom: 5px;
  }
  =======>>>>>>>64afa1acebd510f0ff767f52ddc55d7dcd46545b div {
    margin-bottom: 20px;
    a {
      color: #ff758c;
    }
  }
`;
