import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsArrow90DegLeft } from "react-icons/bs";
import { UserAuth } from "../context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const style = {
  backButton: `p-4 m-4`,
  container: `w-full`,
  addContainer: `w-full flex items-center justify-center`,
  formContainer: `w-3/4 flex flex-col items-center justify-between`,
  text: `border border-black rounded w-full p-4 m-2`,
};

const AddNote = () => {
  const navigate = useNavigate();
  const { user } = UserAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  //add Note logic
  const handleAddNote = async (e) => {
    e.preventDefault();

    if (title === null || content === null) {
      alert("Please enter a valid note");
    }

    await addDoc(collection(db, "notes"), {
      title: title,
      content: content,
      uid: user.uid,
    });

    setTitle("");
    setContent("");

    navigate("/notes");
  };

  return (
    <div className={style.container}>
      <button className={style.backButton} onClick={() => navigate("/notes")}>
        <BsArrow90DegLeft />
      </button>
      <div className={style.addContainer}>
        <form onSubmit={handleAddNote} className={style.formContainer}>
          <input
            className={style.text}
            placeholder="Title"
            value={title}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className={style.text}
            placeholder="Write something"
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button className="bg-blue" type="submit" >
            Add New Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
