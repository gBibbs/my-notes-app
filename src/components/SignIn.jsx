import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const style = {
  container: `w-full flex flex-col justify-center items-center p-8`,
  title: `text-black`,
  signInButton: `my-16 p-4 font-bold`,
};

const SignIn = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user !== null) {
      navigate(`/notes`);
    }
  }, [user]);

  return (
    <div className={style.container}>
      <h1 className={style.title}>Sign In Below</h1>
      <button className={style.signInButton} onClick={handleGoogleSignIn}>
        Sign In With Google
      </button>
    </div>
  );
};

export default SignIn;
