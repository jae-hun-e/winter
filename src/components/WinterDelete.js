import React from "react";
import { dbService, storageService } from "fbase";

const WinterDelete = ({ winterObj }) => {
  // delete
  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    if (ok) {
      await dbService.doc(`winter/${winterObj.id}`).delete(); // 경로를 타고 들어가 문서정보를 가져와서 지움
      if (winterObj.attachmentUrl !== "")
        await storageService.refFromURL(winterObj.attachmentUrl).delete();
    }
  };
  return <button onClick={onDeleteClick}>Delete winter</button>;
};

export default WinterDelete;
