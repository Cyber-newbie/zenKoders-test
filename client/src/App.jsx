import { Provider } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar";
import { jwtDecode } from "jwt-decode";
import store from "./store";
import { logoutUser, setCurrentUser } from "./actions/authActions";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import News from "./components/dashboard/News";
import Failed from "./components/dashboard/Failed";
import Article from "./components/dashboard/Article";
import Search from "./components/dashboard/Search";
import ArticleSearch from "./components/dashboard/ArticleSearch";
import ProtectedRoute from "./helper/ProtectedRoute";

if (localStorage.jwtToken) {
  const decoded = jwtDecode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    //redirect
    window.location.href = "/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/news"
            element={
              <ProtectedRoute>
                <News />
              </ProtectedRoute>
            }
          />
          <Route path="/news/article/:id" element={<Article />} />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search/article/:id"
            element={
              <ProtectedRoute>
                <ArticleSearch />
              </ProtectedRoute>
            }
            exact
          />
          <Route
            path="/failed"
            element={
              <ProtectedRoute>
                <Failed />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
