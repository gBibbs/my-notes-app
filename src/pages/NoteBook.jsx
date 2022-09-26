import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { useEffect } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";

const style = {
  noteContainer: `flex justify-between w-full gap-2 p-2`,
  noteList: `flex flex-col w-full gap-2`,
  noteBook: `flex w-full items-center`,
  noteLink: ` flex flex-col w-full h-full p-2 rounded-l justify-between border border-black hover:cursor-pointer`,
  addButton: `h-[66px] w-[66px] px-5`,
  deleteButton: `h-full px-5 rounded-l-none border-l-0`,
};

const NoteBook = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const { user } = UserAuth();

  //read in notes
  useEffect(() => {
    const q = query(collection(db, "notes"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let notesArr = [];
      querySnapshot.forEach((doc) => {
        if (user.uid === doc.data().uid) {
          notesArr.push({ ...doc.data(), id: doc.id });
        }
      });
      setNotes(notesArr);
    });
    return () => unsubscribe();
  }, []);

  //delete note
  const deleteNote = async (e, id) => {
    e.preventDefault();
    await deleteDoc(doc(db, "notes", id));
  };

  return (
    <div className={style.noteContainer}>
      <div className={style.noteList}>
        {notes.map((note) => {
          return (
            <div className={style.noteBook} key={note.id}>
              <div
                className={style.noteLink}
                onClick={() => navigate(`/notes/${note.id}`)}
              >
                <h4>{note.title}</h4>
                <p>
                  {note.content.length > 50
                    ? note.content.substring(0, 50) + " . . ."
                    : note.content}
                </p>
              </div>
              <button
                onClick={(e) => deleteNote(e, note.id)}
                className={style.deleteButton}
              >
                <BsTrash size={24} />
              </button>
            </div>
          );
        })}
      </div>
      <button
        className={style.addButton}
        onClick={() => navigate("/notes/add")}
      >
        <AiOutlinePlus size={24} />
      </button>
    </div>
  );
};

export default NoteBook;
