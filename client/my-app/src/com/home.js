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
        } else {
          // window.location.href = "/login";
          // throw new Error("Unauthorized");
          return <Login/>
         
        }
      })
      .then((data) => {
        setApiData(data);
      })
      .catch((error) => {
        window.location.href = "/login";
      });
  }, []);

  return <div>{apiData.notes === undefined ? <Nonote /> : <Notes />}</div>;
}
