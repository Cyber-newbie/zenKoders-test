import React, { useRef } from "react";
import SearchIcon from "./icons/SearchIcon";
import Usericon from "./icons/Usericon";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { searchNews } from "../actions/newsActions";

const Navbar = (props) => {
  const searchInput = useRef(null);
  const navigate = useNavigate();
  const { isAuthenticated } = props.auth;
  const { articles } = props.news;
  const onLogout = (e) => {
    e.preventDefault();
    props.logoutUser();
  };
  const guestLinks = (
    <div className="hidden sm:flex space-x-4">
      <Link to={"/"} className="text-gray-500">
        Signup
      </Link>
      <Link to={"/login"} className="text-gray-500">
        Login{" "}
        <span className="px-2">
          <Usericon />
        </span>
      </Link>
    </div>
  );

  const authLinks = (
    <div className="hidden sm:flex space-x-4">
      <a href={" "} className="text-gray-500" onClick={onLogout}>
        Logout{" "}
        <span className="px-2">
          <Usericon />
        </span>
      </a>
    </div>
  );

  const inputHandler = (e) => {
    searchInput.current.value = e.target.value;
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const query = searchInput.current.value;
    searchInput.current.value = "";
    props.searchNews(query, navigate);
  };
  return (
    <nav className="p-4 mb-5">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to={"/news"}>
              <h1 className="text-gray font-bold text-xl">NewsRead.</h1>
            </Link>

            {/* Search input */}
            <div className="relative ml-4">
              <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                <SearchIcon />
              </div>
              <form onSubmit={submitHandler}>
                <input
                  onChange={inputHandler}
                  type="text"
                  ref={searchInput}
                  className="border py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder={"Find any news here..."}
                  style={{
                    borderTopLeftRadius: "1rem",
                    borderBottomLeftRadius: "1rem",
                    borderTopRightRadius: "1rem",
                    borderBottomRightRadius: "1rem",
                  }}
                />
              </form>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                {/* <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
                >
                  Search
                </button> */}
              </div>
            </div>
          </div>
          {isAuthenticated ? authLinks : guestLinks}
          {/* <div className="hidden sm:flex space-x-4">
            <a href="#" className="text-gray-500">
              Signup
            </a>
            <a href="#" className="text-gray-500">
              Login{" "}
              <span className="px-2">
                <Usericon />
              </span>
            </a>
          </div> */}
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  news: state.news,
});

export default connect(mapStateToProps, { logoutUser, searchNews })(Navbar);
