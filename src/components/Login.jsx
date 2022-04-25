import React, { useRef, useState, useEffect } from "react";

import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useAuth from "../hooks/useAuth";

import { Link, useNavigate, useLocation } from "react-router-dom";

import axiosInstance from "../api/api";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [pwd, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(
        "/auth",
        JSON.stringify({
          user,
          pwd,
        })
      );

      const accessToken = res?.data?.accessToken;
      const roles = res?.data?.roles;
      console.log('res', res.data)
      setAuth({ user, pwd, roles, accessToken });

      setPwd("");
      setUser("");

      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      }
      switch (err.response?.status) {
        case 400:
          setErrMsg("Missing UserName or Password");
          break;
        case 401:
          setErrMsg("Unauthorized");
          break;
        default:
          setErrMsg("Login Failed");
          break;
      }
      errRef.current.focus();
    }
  };

  return (
    <section className="min-h-full flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <React.Fragment>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Login
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                className="rounded form-input"
              />
            </div>
            <div className="flex flex-col mt-5">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                className="rounded form-input"
              />
            </div>

            <div className="mt-5">
              <button
                type="submit"
                //   disabled={ true : false}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-2 text-center text-sm text-gray-600">
            Need anan account?{" "}
            <a
              href="#"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Sign Up
            </a>
          </p>
        </React.Fragment>
      </div>
    </section>
  );
};

export default Login;
