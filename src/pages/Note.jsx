import { doc, getDoc, setDoc } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { BsArrow90DegLeft, BsFillPencilFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";

const style = {
  noteContainer: `flex flex-col items-start justify-start`,
  navDiv: `w-full flex justify-between items-center p-4`,
  backButton: `p-4`,
  note: `p-2 w-full`,
  title: `text-black text-center mb-8`,
  content: `px-12`,
  editContainer: `w-full flex flex-col justify-start items-center px-12 gap-8`,
  editTitle: `border border-black rounded p-2 w-3/4`,
  editContent: `border border-black rounded w-full p-2`,
  submitButton: `bg-blue`,
};

const Note = () => {
  const { noteId } = useParams();
  const { user } = UserAuth();
  const navigate = useNavigate();
  const [note, setNote] = useState({});
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const getNote = async () => {
    const docRef = doc(db, "notes", noteId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setNote(docSnap.data());

      setTitle(docSnap.data().title);
      setContent(docSnap.data().content);
    } else {
      console.log("No such document!");
    }
  };

  const handleUpdateNote = async (e) => {
    e.preventDefault();

    await setDoc(doc(db, "notes", noteId), {
      title: title,
      content: content,
      uid: user.uid,
    });

    setEdit(!edit);
    getNote();
    navigate(`/notes/${noteId}`);
  };

  useEffect(() => {
    getNote();
  }, []);

  return (
    <div className={style.noteContainer}>
      <div className={style.navDiv}>
        <button className={style.backButton} onClick={() => navigate("/notes")}>
          <BsArrow90DegLeft />
        </button>
        <button className={style.backButton} onClick={() => setEdit(!edit)}>
          <BsFillPencilFill />
        </button>
      </div>

      {edit ? (
        <>
          <form className={style.editContainer} onSubmit={handleUpdateNote}>
            <input
              className={style.editTitle}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className={style.editContent}
              defaultValue={content}
              onChange={(e) => setContent(e.target.value)}
              rows={15}
            />
            <button className={style.submitButton} type="submit">
              Save Changes
            </button>
          </form>
        </>
      ) : (
        <>
          <div className={style.note}>
            <h1 className={style.title}>{note.title}</h1>
            <p className={style.content}>{note.content}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Note;
