import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import Footer from "./Footer";
import styled from "styled-components";

function App() {
  const [init, setInit] = useState(false);
  // todo contextAPI로 변경하기
  const [userObj, setUserObj] = useState(null);

  // 초기 렌더링
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        /*user객체에 너무 많은 정보가 있어서 리렌더링시 변화 인식이 안된다 
        그래서 필요한 속성과 함수만 따로 정의한다.*/
        setUserObj({
          uid: user.uid,
          displayName: user.displayName,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(false);
      }
      setInit(true);
    });
  }, []);

  // 유저정보 업데이트
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      uid: user.uid,
      displayName: user.displayName,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return (
    <Container>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        <span></span>
      )}
      <Footer />
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
