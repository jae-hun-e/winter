import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState(""); // 추가 트윗
  const [nweets, setNweets] = useState([]); // 트윗 리스트
  const [attachment, setAttachment] = useState("");

  // create
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("nweets").add({
      // nweet 생성
      text: nweet,
      createAt: Date.now(),
      creatorId: userObj.uid,
    });
    setNweet(""); // 초기화
  };

  // // read
  // const getNweets = async () => {
  // firbasestore의 스냅샷
  //   const dbNweets = await dbService.collection("nweets").get();
  //   // console.log(dbNweets);
  //   dbNweets.forEach((document) => {
  // 문서 내용과 문서 id담은 객체
  //     const nweetObject = { ...document.data(), id: document.id };
  //? 왜 뒤에 넣었는데 맨 앞으로 들어감?
  //     setNweets((prev) => [...prev, nweetObject]);
  //   }); // 모든 필드값 가져오기
  // };

  // 실시간 read
  useEffect(() => {
    dbService.collection("nweets").onSnapshot(async (snapshot) => {
      //async-await는 여기서는 안 써도 가능
      // foreach는 매순간 반환하지만 map은 순회후 반환이라 성능 개선됨
      const newArray = await snapshot.docs.map((document) => ({
        // snapshot.docs로 문서 스냅샷만 얻오옴,
        id: document.id,
        ...document.data(),
      }));
      setNweets(newArray);
      // console.log(newArray);
    });
  }, []);
  // console["log"]("nweets", nweets);

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader(); // 브라우저API 함수
    // 보안상의 문제를 위해 readAsDataURL은 바뀌어서 보이며 react처럼 생명주기가 있다.
    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="뭐하는 중?"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="nweet" />
        {attachment && (
          <img src={attachment} alt="" width="50px" height="50px" />
        )}
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          /> //글정보(객체)넘겨주고 ,글쓴이 Id와 로그인 정보비교
        ))}
      </div>
    </>
  );
};

export default Home;
