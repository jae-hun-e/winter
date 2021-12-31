import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";

const NwinterCreate = ({ userObj }) => {
  const [winter, setWinter] = useState(""); // 추가 트윗
  const [attachment, setAttachment] = useState(""); // 사진url

  // create
  const onSubmit = async (event) => {
    event.preventDefault();

    let attachmentUrl = "";
    if (attachment !== "") {
      // storage의 사진url받아오기
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL(); //firebase storage안의 사진url 반환
    }

    // winterObj 생성
    await dbService.collection("winter").add({
      text: winter,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    });
    setWinter(""); // 초기화
    setAttachment("");
  };

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setWinter(value);
  };

  const onFileChange = (event) => {
    // console.log(event.target.files);
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader(); // 브라우저API 함수
    // console.log(reader.readAsDataURL(theFile));
    // 보안상의 문제를 위해 readAsDataURL은 바뀌어서 보이며 react처럼 생명주기가 있다.
    reader.onloadend = (finishedEvent) => {
      console.log("FileReader", finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => setAttachment("");
  return (
    <form onSubmit={onSubmit}>
      <input
        value={winter}
        onChange={onChange}
        type="text"
        placeholder="뭐하는 중?"
        maxLength={120}
      />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="winter" />
      {attachment && (
        <div>
          <img src={attachment} alt="" width="50px" height="50px" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default NwinterCreate;
