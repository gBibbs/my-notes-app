import React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const style = {
  container: `flex justify-between items-center bg-[#0A62D0] w-full p-4`,
  title: `text-center text-xl font-bold`,
  userButton: `bg-yellow text-black border-none font-bold`
};

const NavBar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    navigate("/signin");
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className={style.container}>
      <Link to="/">
        <h1 className={style.title}>My Notes</h1>
      </Link>
      {user ? (
        <button className={style.userButton} onClick={handleSignOut}>Log Out</button>
      ) : (
        <button className={style.userButton} onClick={handleSignIn}>Sign In</button>
      )}
    </div>
  );
};

export default NavBar;
