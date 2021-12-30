import React, { useState } from "react";

const Home = () => {
  const [twitt, setTwit] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
  };

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setTwit(value);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        value={twitt}
        onChange={onChange}
        type="text"
        placeholder="뭐하는 중?"
        maxlength={120}
      />
      <input type="submit" value="twitt" />
    </form>
  );
};

export default Home;
