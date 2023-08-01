import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faCheck,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

export function Nonote() {
  const initialAddNoteState = localStorage.getItem("addnotee") === "true";
  const [addnotee, setnoteadded] = React.useState(initialAddNoteState);
  const [note, setnote] = React.useState("");
  const [notes, setnotes] = React.useState("");

  React.useEffect(() => {
    const initialAddNoteState = localStorage.getItem("addnotee");
    if (initialAddNoteState) {
      setnoteadded(initialAddNoteState === "true");
    }
  }, []); // empty dependency array

  React.useEffect(() => {
    localStorage.setItem("addnotee", addnotee.toString());
  }, [addnotee]);

  function handleNoteChange(note) {
    setnote(note);
    const halfLength = Math.floor(note.length / 2);
    const halfNote = note.slice(0, halfLength);
    setnotes(halfNote);
  }
  function addnote() {
    setnoteadded(true);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    
    fetch("https://notesapp-83b1790bf6d9.herokuapp.com/api/createnote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ note: note, notes: notes }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.reload();
      })

      .catch((error) => {
        console.error(error);
      });
  };
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
    setnoteadded(false);
  }
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
            <div className="notes-list  flex justify-center py-[100px] text-gray-300 text-xl">
              no notes
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
          {addnotee ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <textarea
                  className="w-full h-64 focus:outline-none text-lg p-2 resize-none py-6"
                  placeholder="Write your note here..."
                  value={note}
                  onChange={(event) => handleNoteChange(event.target.value)}
                ></textarea>
              </div>
              <button
                type="submit"
                className="absolute top-0 right-0 mt-2 mr-2 cursor-pointer"
              >
                <FontAwesomeIcon icon={faCheck} size="lg" />
                <span className="ml-2">Save</span>
              </button>
            </form>
          ) : (
            <div>no notes</div>
          )}
        </div>
      </div>
    </div>
  );
}
