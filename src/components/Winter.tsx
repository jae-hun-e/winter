import { useState } from "react";
import WinterDelete from "./WinterDelete";
import WinterEditing from "./WinterEditing";

const Winter = ({ winterObj, isOwner }) => {
  const [editing, setEditing] = useState(false);

  const toggleEditing = () => setEditing((prev) => !prev);

  return (
    <div className="nweet">
      {editing ? ( // edit input
        <WinterEditing
          winterObj={winterObj}
          setEditing={setEditing}
          toggleEditing={toggleEditing}
        />
      ) : (
        // winter read
        <>
          <div>
            <h4>{winterObj.text}</h4>
            {winterObj.attachmentUrl && (
              <img
                src={winterObj.attachmentUrl}
                alt=""
                width="50px"
                height="50px"
              />
            )}
          </div>
          {isOwner && (
            <WinterDelete winterObj={winterObj} toggleEditing={toggleEditing} />
          )}
        </>
      )}
    </div>
  );
};

export default Winter;
