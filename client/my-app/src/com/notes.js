import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faCheck,
  faPlus,
  faTrash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
export default function Notes() {
  const [apiData, setApiData] = React.useState([{}]);
  const [createdTime, setCreatedTime] = React.useState();
  const [selectednotee, setselectednote] = React.useState();
  const initialAddNoteState = localStorage.getItem("addnotee2") === "true";
  const [addnotee2, setnoteadded2] = React.useState(initialAddNoteState);
  const [note, setnote] = React.useState("");
  const [notes, setnotes] = React.useState("");
  const [newtime, setnewcreatedtime] = React.useState();
  const [editing, setediting] = React.useState(false);
  const [editid, seteditid] = React.useState();

  React.useEffect(() => {
    fetch("https://notesapp-83b1790bf6d9.herokuapp.com/api")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Unauthorized");
        }
      })
      .then((data) => {
        setApiData(data);
      })
      .catch((error) => {
        window.location.href = "/login";
      });
  }, []);

  React.useEffect(() => {
    const initialAddNoteState = localStorage.getItem("addnotee2");
    if (initialAddNoteState) {
      setnoteadded2(initialAddNoteState === "true");
    }
  }, []); // empty dependency array
  React.useEffect(() => {
    localStorage.setItem("addnotee2", addnotee2.toString());
  }, [addnotee2]);

  function handleNoteChange(note) {
    setnote(note);
    const halfLength = Math.floor(note.length / 2);
    const halfNote = note.slice(0, halfLength);
    setnotes(halfNote);
  }
  function addnote() {
    setnoteadded2(true);
  }
  const handleSubmit = (event) => {
    if(note){
      event.preventDefault();
      const currentTime = new Date();
      setCreatedTime(currentTime);
      setnoteadded2(false)
    }
   
  };

  React.useEffect(() => {
    if (createdTime) {
      fetch("https://notesapp-83b1790bf6d9.herokuapp.com/api/createnote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          note: note,
          notes: notes,
          createdTime: createdTime,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    }
   
  });

  function logout() {
    fetch("https://notesapp-83b1790bf6d9.herokuapp.com/logout")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Logout failed.");
        }
      })
      .then((data) => {
        if (data.success === true) {
          window.location.href = "/login";
        } else {
          // Handle unsuccessful logout
          window.location.href = "/";
        }
      })
      .catch((error) => {
        // Handle network errors or logout failure
        console.error(error);
      });
    setnoteadded2(false);
  }
  function selectednote(id) {
    setselectednote(id);
    setnoteadded2(false);
    seteditid(id);
  }
  const editNote = (noteId) => {
    const selectedNote = apiData.notes.find((note) => note._id === noteId);
    if (selectedNote) {
      setnote(selectedNote.note);
      setnoteadded2(true);
      setediting(true);
    }
  };
  function deletenote(id) {
    fetch("https://notesapp-83b1790bf6d9.herokuapp.com/api/deletenote", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userid: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.reload();
      });
  }
  function handleSubmitedit(event) {
    if(note)
    event.preventDefault();
    const newwtime = new Date();
    setnewcreatedtime(newwtime);
    setnoteadded2(false)
  }
  React.useEffect(() => {
    if (newtime)
      fetch("https://notesapp-83b1790bf6d9.herokuapp.com/api/updatenote", {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userid: editid,
          note: note,
          notes: notes,
          newtime: newtime,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          window.location.reload();
        });
  });

  return (
    <div className="bg-white h-screen flex">
      <div className="w-1/3">
        <div className="h-full ">
          <div className="h-full grid grid-rows-[auto,1fr]">
            <div className="flex justify-between items-center pr-2 py-3">
              <h1 className="text-2xl font-bold">Notes</h1>
              <div className="cursor-pointer" onClick={addnote}>
                <FontAwesomeIcon icon={faPlus} />
              </div>
            </div>

            <div className="notes-list">
              {apiData.notes !== undefined ? (
                apiData.notes.map((note) => (
                  <div
                    onClick={() => selectednote(note._id)}
                    className="note flex items-center  justify-between border-b border-blue-500 w-full  hover:bg-blue-400 shadow-md shadow-md-bottom"
                  >
                    <span key={note.id} className="note-item">
                      {note.notes}
                    </span>

                    <div
                      className="opacity-1 group-hover:opacity-100"
                      onClick={() => deletenote(note._id)}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-gray-400 hover:text-black"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
        <div
          onClick={logout}
          className=" fixed bottom-0 left-0 right-0 border-t border-blue-500 mt-auto py-4 px-2 bg-gray-200 flex  justify-enditems-center gap-1 cursor-pointer "
        >
          <FontAwesomeIcon icon={faRightFromBracket} className="text-lg" />
          <p className="text-sm font-semibold mr-2">Log Out</p>
        </div>
      </div>

      <div className="w-4/5">
        <div className="h-full border-l border-blue-500 py-3 px-2 rounded-lg shadow-md">
          {addnotee2 ? (
            <form onSubmit={editing ? handleSubmitedit : handleSubmit}>
              <div className="mb-4">
                <textarea
                  className="w-full h-64 focus:outline-none text-lg p-2 resize-none py-6"
                  placeholder="Write your note here..."
                  value={note}
                  onChange={(event) => handleNoteChange(event.target.value)}
                ></textarea>
              </div>
              {editing ? (
                <button
                  type="submit"
                  className="absolute top-0 right-0 mt-2 mr-2 cursor-pointer"
                >
                  <FontAwesomeIcon icon={faCheck} size="lg" />
                  <span className="ml-2">Save</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="absolute top-0 right-0 mt-2 mr-2 cursor-pointer"
                >
                  <FontAwesomeIcon icon={faCheck} size="lg" />
                  <span className="ml-2">Save</span>
                </button>
              )}
            </form>
          ) : (
            <div>
              {apiData.notes && selectednotee !== undefined ? (
                <div className="note-item px-3 py-6 text-lg p-2">
                  <div className="text-sm text-gray-500 mb-2 text-center pt-2">
                    {new Date(
                      apiData.notes.find(
                        (noteItem) => noteItem._id === selectednotee
                      )?.createdtime
                    ).toLocaleString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </div>

                  {apiData.notes.find((note) => note._id === selectednotee)
                    ?.note || ""}
                  <button
                    className="absolute top-0 right-0 mt-2 mr-6 cursor-pointer flex items-center gap-2"
                    onClick={() => editNote(selectednotee)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                    Edit
                  </button>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
