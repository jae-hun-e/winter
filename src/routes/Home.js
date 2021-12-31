import React from "react";
import NwinterCreate from "components/NwinterCreate";
import AutoRead from "components/AutoRead";

const Home = ({ userObj }) => {
  return (
    <>
      <NwinterCreate userObj={userObj} />
      <AutoRead userObj={userObj} />
    </>
  );
};

export default Home;
