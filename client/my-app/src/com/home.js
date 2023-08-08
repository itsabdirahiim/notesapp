import React from "react";

import { Nonote } from "./nonote";
import Notes from "./notes";
import Login from "./login";

export default function Home() {
  const [apiData, setApiData] = React.useState([{}]);

  React.useEffect(() => {
    fetch("/api")
      .then((response) => {
        if (response.ok) {
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
          window.location.href = "/login"; // Redirect to login page for authentication error
        } else {
          console.error(error);
        }
      });
  }, []);

  return <div>{apiData.notes === undefined ? <Nonote /> : <Notes />}</div>;
}
