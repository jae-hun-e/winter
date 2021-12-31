import React, { useState } from "react";

const UserInfoEditing = ({ userObj, refreshUser }) => {
  const [newDisplay, setNewDisplay] = useState(userObj.displayName); // 변경할 이름

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
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Display name"
        onChange={onChange}
        value={newDisplay}
      />
      <input type="submit" placeholder="Update Profile" />
    </form>
  );
};

export default UserInfoEditing;
