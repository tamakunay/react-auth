import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import useAuth from "../hooks/useAuth";

const navigation = [
  { name: "admin", href: "/admin", current: true },
  { name: "editor", href: "/editor", current: false },
  { name: "lounge", href: "/lounge", current: false },
  { name: "home", href: "/", current: false },
];

const Layout = () => {
  const { setAuth } = useContext(AuthContext);
  const { auth } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    setAuth({});
    navigate("/");
  };

  return (
    <main className="App">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <div className="flex-1 flex items-center justify-between">
            <div className="flex space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="px-3 py-2 rounded-md text-sm font-medium"
                  aria-current={item.name}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div>
              {auth?.user ? (
                <button
                  type="button"
                  className="bg-gray-800 p-1 rounded-md px-4 text-white"
                  onClick={logout}
                >
                  Sign Out
                </button>
              ) : (
                <button
                  type="button"
                  className="bg-gray-800 p-1 rounded-md px-4 text-white"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </main>
  );
};

export default Layout;
