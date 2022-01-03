import React, { useState } from "react";

const UserInfoEditing = ({ userObj, refreshUser }) => {
  const [newDisplay, setNewDisplay] = useState(); // 변경할 이름

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
    <form onSubmit={onSubmit} className="profileForm">
      <input
        type="text"
        placeholder="Display Change name"
        onChange={onChange}
        value={newDisplay}
        autoFocus
        className="formInput"
      />
      <input
        type="submit"
        placeholder="이름 변경"
        className="formBtn"
        style={{
          marginTop: 15,
        }}
      />
    </form>
  );
};

export default UserInfoEditing;
