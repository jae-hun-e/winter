import React, { useState } from "react";
import { authService } from "fbase";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    // console.log(event);
    const {
      target: { type, value },
    } = event;

    if (type === "email") {
      setEmail(value);
      //   console.log(email);
    } else if (type === "password") {
      setPassword(value);
      //   console.log(password);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (newAccount) {
        const data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
        console.log(data);
      } else {
        const data = await authService.signInWithEmailAndPassword(
          email,
          password
        );
        console.log(data);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  // todo 회원가입시 user.displayName이랑 image기입하도록
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
          autoComplete="off"
        />
        <input type="submit" value={newAccount ? "회원가입" : "로그인"} />
        <span onClick={toggleAccount}>
          {newAccount ? "로그인으로 변경" : "회원가입으로 변경"}
        </span>
      </form>
      <div>{error}</div>
    </>
  );
};

export default AuthForm;
