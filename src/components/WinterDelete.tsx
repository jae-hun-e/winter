import React from "react";
import { dbService, storageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const WinterDelete = ({ winterObj, toggleEditing }) => {
  // delete
  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    if (ok) {
      await dbService.doc(`winter/${winterObj.id}`).delete(); // 경로를 타고 들어가 문서정보를 가져와서 지움
      if (winterObj.attachmentUrl !== "")
        await storageService.refFromURL(winterObj.attachmentUrl).delete();
    }
  };
  return (
    <div className="nweet__actions">
      <span onClick={onDeleteClick}>
        <FontAwesomeIcon icon={faTrash} />
      </span>
      <span onClick={toggleEditing}>
        <FontAwesomeIcon icon={faPencilAlt} />
      </span>
    </div>
  );
};

export default WinterDelete;
