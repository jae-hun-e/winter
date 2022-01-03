import React from "react";
import NwinterCreate from "components/NwinterCreate";
import AutoRead from "components/AutoRead";

const Home = ({ userObj }) => {
  return (
    <div className="container">
      <NwinterCreate userObj={userObj} />
      <AutoRead userObj={userObj} />
    </div>
  );
};

export default Home;
