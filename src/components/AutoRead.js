import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import Winter from "components/Winter";

const AutoRead = ({ userObj }) => {
  const [winters, setWinters] = useState([]); // 트윗 리스트

  // 실시간 read
  useEffect(() => {
    dbService.collection("winter").onSnapshot(async (snapshot) => {
      //async-await는 여기서는 안 써도 가능
      // foreach는 매순간 반환하지만 map은 순회후 반환이라 성능 개선됨
      const newArray = await snapshot.docs.map((document) => ({
        // snapshot.docs로 문서 스냅샷만 얻오옴,
        id: document.id,
        ...document.data(),
      }));
      setWinters(newArray);
      // console.log(newArray);
    });
  }, []);
  // console["log"]("winters", winters);

  // todo 트윗 오름차순 정렬 필요
  return (
    <div>
      {winters.map((winter) => (
        <Winter
          key={winter.id}
          winterObj={winter}
          isOwner={winter.creatorId === userObj.uid}
        /> //글정보(객체)넘겨주고 ,글쓴이 Id와 로그인 정보비교
      ))}
    </div>
  );
};

export default AutoRead;
