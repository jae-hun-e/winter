import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Winter from "components/Winter";
import UserInfoEditing from "components/UserInfoEditing";

const Profile = ({ refreshUser, userObj }) => {
  const [myWinters, setMyWinters] = useState([]); //내 트윗
  const navigate = useNavigate();

  // 로그아웃 시 home으로 돌아가기
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };

  // 유저가쓴 트윗만 쿼리해서 뽑아오기
  const getMyWinters = async () => {
    const winters = await dbService
      .collection("winter")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt", "desc")
      .get();

    setMyWinters(winters.docs);
    // console.log(winters.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getMyWinters();
  }, []);

  return (
    <>
      <UserInfoEditing userObj={userObj} refreshUser={refreshUser} />
      <button onClick={onLogOutClick}>Log Out</button>
      {myWinters &&
        myWinters.map((winter, idx) => (
          <Winter key={idx} winterObj={winter.data()} isOwner={true} />
        ))}
    </>
  );
};

export default Profile;
