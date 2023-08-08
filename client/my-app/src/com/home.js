import React from "react";

import { Nonote } from "./nonote";
import Notes from "./notes";

export default function Home() {
  const [apiData, setApiData] = React.useState([{}]);

  React.useEffect(() => {
    fetch("/api")
  
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
        window.location.href = "login";
      });
  }, []);

  return <div>{apiData.notes === undefined ? <Nonote /> : <Notes />}</div>;
}
