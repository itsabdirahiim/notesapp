import React from "react";

import { Nonote } from "./nonote";
import Notes from "./notes";
import Login from "./login";

export default function Home() {
  const [apiData, setApiData] = React.useState([{}]);

  React.useEffect(() => {
    fetch("https://notesappjj0-f1dac4eaa1a2.herokuapp.com/api")
      .then((response) => {
        if (response.ok) {
          console.log("apiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
          return response.json();
        } else if (response.status === 401) { // Authentication error
          throw new Error("Unauthorized");
        } else {
          throw new Error("Other error");
        }
      })
      .then((data) => {
        setApiData(data);
      })
      .catch((error) => {
        if (error.message === "Unauthorized") {
          window.location.href = "/login1"; // Redirect to login page for authentication error
        } else {
          console.error(error);
        }
      });
  }, []);

  return <div>{apiData.notes === undefined ? <Nonote /> : <Notes />}</div>;
}
