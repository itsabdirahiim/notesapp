import React from "react";
import img from "../assests/login.jpg";
import { Link } from "react-router-dom";
export default function Signup() {
  const [username, setusername] = React.useState();
  const [email, setemail] = React.useState();
  const [password, setpassword] = React.useState();
  const [msg, setmsg] = React.useState();
  React.useEffect(() => {
    fetch("/signup")
      .then((response) => response.json())
      .then((data) => {
        if (data.success === false) {
          window.location.href = "/";
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  function emailsetter(event) {
    setemail(event.target.value);
  }
  function passwordsetter(event) {
    setpassword(event.target.value);
  }
  function usernamesetter(event) {
    setusername(event.target.value);
  }
  const sumbit2 = (event) => {
    event.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success !== false) {
          // Redirect to the desired route
          window.location.href = "/login";
        } else {
          // Handle login error
          setmsg(data.msg);
        }
        // window.location.reload()
        // window.location.href = '/login'
      })

      .catch((error) => {
        console.error(error);
      });
  };

  // }, []);
  return (
    <div className=" relative w-full h-screen bg-zinc-900/50">
      <img
        className="absolute w-full h-[100%]  mix-blend-overlay"
        src={img}
        alt="login"
      ></img>
      <div className="flex flex-col items-center justify-center h-screen sm:flex-row  relative">
        <form
          className="flex flex-col  space-y-4 border border-blue-500 rounded-md sm:w-80 md:w-[37%] lg:w-[37%] p-[50px]  shadow-lg  bg-white "
          onSubmit={sumbit2}
        >
          <div className="text-center">
            <h1 className="font-bold text-[33px]">create an account</h1>
          </div>
          <input
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 "
            type="text"
            onChange={usernamesetter}
            placeholder="Username"
          />
          <input
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            type="Email"
            onChange={emailsetter}
            placeholder="email"
          />
          <input
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            type="Password"
            onChange={passwordsetter}
            placeholder="Password"
          />
          <p  className="text-red-500">{msg}</p>
          {/* <button className=" py-[10px] px-4 sm:w-[40%] lg:h-[50%] text-white rounded-md bg-blue-500 hover:bg-blue-700 focus:bg-blue-700">
            create account
          </button> */}
        <button className="py-2 px-4 sm:w-2/5 lg:h-1/2 text-white rounded-md bg-blue-500 hover:bg-blue-700 focus:bg-blue-700">
  <span className="flex-shrink-0 truncate">sign up</span>
</button>
          <p className="text-gray-500">
            If you already have an account,{" "}
            <Link
              to="/login"
              className="  text-blue-500 hover:text-blue-700 relative"
            >
              login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
