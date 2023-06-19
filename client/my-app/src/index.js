import ReactDOM from "react-dom"; 
// import * as ReactDOMClient from 'react-dom/client';
import React from 'react'
import App from "./App";
import './index.css'

export default function Index() {
  return (
    <div>index</div>
  )
}
ReactDOM.render(<App />, document.getElementById("root"))

