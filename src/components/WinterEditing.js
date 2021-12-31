import React, { useState } from "react";
import { dbService } from "fbase";

const WinterEditing = ({ winterObj, setEditing, toggleEditing }) => {
  const [newWinter, setNewWinter] = useState(winterObj.text);

  // 트윗 내용변경
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewWinter(value);
  };

  // 트윗 내용 제출
  const onSubmit = async (event) => {
    event.preventDefault();
    // console.log(winterObj.id, newWinter);
    await dbService.doc(`winters/${winterObj.id}`).update({ text: newWinter });
    setEditing(false);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input value={newWinter} onChange={onChange} required />
        <input type="submit" value="updata winter" />
      </form>
      <button onClick={toggleEditing}>Cancel</button>
    </>
  );
};

export default WinterEditing;
