import React from "react";
import { Link } from "react-router-dom";
import img from "../assests/login.jpg";
export default function Login() {
  const [email, setemail] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [isInvalidEmail, setIsInvalidEmail] = React.useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = React.useState(false);
  const [flash, setFlashMessages] = React.useState();
  React.useEffect(() => {
    fetch("https://notesapp-83b1790bf6d9.herokuapp.com/login", {
      credentials: "include",
    })
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

  function passwordsetter(event) {
    setpassword(event.target.value);
  }
  function emailsetter(event) {
    setemail(event.target.value);
  }
  const sumbit = (event) => {
    event.preventDefault();
    setIsInvalidEmail(false);
    setIsInvalidPassword(false);
    setFlashMessages("");
    if (email === "") {
      setIsInvalidEmail(true);

      return;
    }
    if (password === "") {
      setIsInvalidPassword(true);

      return;
    }

    fetch("https://notesapp-83b1790bf6d9.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.success) {
          // Redirect to the desired route
          window.location.href = "/";
        } else {
          if (data.err === "invalid_password") {
            setIsInvalidPassword(true);
            setFlashMessages("Incorrect password");
          } else {
            setFlashMessages(data.err);
          }
        }
      })

      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="relative w-full h-screen bg-zinc-900/50">
      <img
        className="absolute w-full h-[100%]  mix-blend-overlay"
        src={img}
        alt="login"
      ></img>
      <div className="flex flex-col items-center justify-center h-screen ">
        <form
          onSubmit={sumbit}
          className="flex flex-col  space-y-4 border border-blue-500 rounded-md sm:w-80 md:w-[37%] lg:w-[37%] p-20   shadow-lg  bg-white relative"
        >
          <div className="text-center">
            <h1 className="font-bold text-[33px]">Log in</h1>
          </div>
          <input
            className={`py-2 px-4 border ${
              isInvalidEmail ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:border-blue-500`}
            type="email"
            onChange={emailsetter}
            placeholder="email"
          />
          {isInvalidEmail && (
            <p className="text-red-500">Please enter your email</p>
          )}
          <input
            className={`py-2 px-4 border ${
              isInvalidPassword ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:border-blue-500`}
            type="Password"
            onChange={passwordsetter}
            placeholder="Password"
          />
          {isInvalidPassword && (
            <p className="text-red-500">Please enter your password</p>
          )}

          {flash && <p className="text-red-500">{flash}</p>}
          <button className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:bg-blue-700">
            Log in
          </button>
        </form>

        <Link to="/signup" className="text-white hover:text-blue-900 relative">
          signup
        </Link>
      </div>
    </div>
  );
}
