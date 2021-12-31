import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nweet from "components/Nweet";

const Profile = ({ refreshUser, userObj }) => {
  const [myNweets, setMyNweets] = useState([]); //내 트윗
  const [newDisplay, setNewDisplay] = useState(userObj.displayName); // 변경할 이름

  const navigate = useNavigate();

  // 로그아웃 시 home으로 돌아가기
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };

  // 유저가쓴 트윗만 쿼리해서 뽑아오기
  const getMyNweets = async () => {
    const nweets = await dbService
      .collection("nweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt", "desc")
      .get();

    setMyNweets(nweets.docs);
    nweets.docs.map((doc) => console.log(doc.data()));
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  // 입력값 변경
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplay(value);
  };

  // 실시간 userObj 업데이트
  // todo 사진정보도 받아서 유저 프로필 추가하기
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplay) {
      await userObj.updateProfile({ displayName: newDisplay });
      refreshUser();
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display name"
          onChange={onChange}
          value={newDisplay}
        />
        <input type="submit" placeholder="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
      {myNweets &&
        myNweets.map((nweet, idx) => (
          <Nweet key={idx} nweetObj={nweet.data()} isOwner={true} />
        ))}
    </>
  );
};

export default Profile;
