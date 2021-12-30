import React, { useEffect, useState } from "react";
import { dbService } from "fbase";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
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
  //   const dbNweets = await dbService.collection("nweets").get(); // firbasestore의 스냅샷
  //   // console.log(dbNweets);
  //   dbNweets.forEach((document) => {
  //     const nweetObject = { ...document.data(), id: document.id }; // 문서 내용과 문서 id담은 객체
  //     setNweets((prev) => [...prev, nweetObject]); //? 왜 뒤에 넣었는데 맨 앞으로 들어감?
  //   }); // 모든 필드값 가져오기
  // };

  // 실시간 read
  useEffect(() => {
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const newArray = snapshot.docs.map((document) => ({
        // snapshot.docs로 문서 스냅샷만 얻오옴, foreach는 매순간 반환하지만 map은 순회후 반환이라 성능 개선됨
        id: document.id,
        ...document.data(),
      }));
      setNweets(newArray);
      console.log(newArray);
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
        <input type="submit" value="nweet" />
      </form>
      <div>
        {nweets.map((nweet) => (
          <div key={nweet.id}>
            <h4>{nweet.text}</h4>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
