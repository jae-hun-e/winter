import { useState } from "react";
import { dbService } from "fbase";

interface WinterEditingProps {
  winterObj: any;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  toggleEditing: () => void;
}

const WinterEditing = ({
  winterObj,
  setEditing,
  toggleEditing,
}: WinterEditingProps) => {
  const [newWinter, setNewWinter] = useState(winterObj.text);

  // 트윗 내용변경
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setNewWinter(value);
  };

  // 트윗 내용 제출
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(winterObj.id, newWinter);
    await dbService.doc(`winters/${winterObj.id}`).update({ text: newWinter });
    setEditing(false);
  };

  return (
    <>
      <form onSubmit={onSubmit} className="container nweetEdit">
        <input
          value={newWinter}
          onChange={onChange}
          required
          placeholder="Edit your nweet"
          autoFocus
          className="formInput"
        />
        <input type="submit" value="updata winter" className="formBtn" />
      </form>
      <button onClick={toggleEditing} className="formBtn cancelBtn">
        Cancel
      </button>
    </>
  );
};

export default WinterEditing;
