import React, { createContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Artikli from "./components/Artikli";
import GrupiArtikli from "./components/GrupiArtikli";
import Comp1 from "./components/Comp1";
import Comp2 from "./components/Comp2";
import Test from "./components/Test";
import Login from "./components/auth/login";
import logo from "./logo.png";
import ShoppingCart from "./components/ShoppingCart";
import Products from "./components/Products/Products";
import MyForm from "./components/MyForm/MyForm";
import GitHubUsers from "./components/GitHubUsers/GitHubUsers";
import ToDo from "./components/ToDo/ToDo";
import ToDoListVirt from "./components/ToDo/ToDoListVirt";
import UserInfo from "./components/auth/UserInfo";
import Start from "./components/start";
import HackerStories from "./components/HackerStories";
import AuthServiceJson from "./components/auth/AuthServiceJson";
import { RolesAuthGuard } from "./components/auth/RolesAuthGuard";
import ValidatingFormPage from "./components/ValidatingForm/ValidatingFormPage";
import ErrorContainer from "./components/ErrorHandler/ErrorContainer";
import DirTreePage from "./components/DirTree/dir-tree-page";

export const UserContext = createContext();
const auth = new AuthServiceJson(); //new AuthService();

function userReducer(state, action) {
  const init = { user: null, roles: [] };
  switch (action.type) {
    case "LOG_IN":
      const usr = auth.getProfile();
      //console.log("LOG_IN", usr);
      if (!usr) {
        return init;
      }
      return { user: usr, roles: usr.roles };
    case "LOG_OUT":
      auth.logout();
      //console.log("LOG_OUT", init);
      return init;
    default:
      return { ...state };
  }
}

export default function App() {
  const [userState, userDispatch] = React.useReducer(userReducer, {
    user: null,
    roles: [],
  });
  useEffect(() => userDispatch({ type: "LOG_IN" }), []);

  const aStyle = {
    padding: 0,
  };

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      <ErrorContainer>
        <BrowserRouter>
          <div>
            <div className="navbar navbar-expand-xl bg-dark navbar-dark fixed-top">
              <div className="container">
                <Link
                  to={"/"}
                  className="navbar-brand"
                  style={aStyle}
                  data-toggle="collapse"
                  data-target="#collapsibleNavbar"
                >
                  <img src={logo} />
                  <span>Ресторан</span>
                </Link>

                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapsibleNavbar"
                >
                  <span className="navbar-toggler-icon" />
                </button>

                <div
                  className="collapse navbar-collapse"
                  id="collapsibleNavbar"
                >
                  <ul className="nav navbar-nav">
                    <Link
                      className="nav-link"
                      to={"/Test"}
                      data-toggle="collapse"
                      data-target="#collapsibleNavbar"
                    >
                      Нарачки
                    </Link>
                    <Link
                      className="nav-link"
                      to={"/GitHub"}
                      data-toggle="collapse"
                      data-target="#collapsibleNavbar"
                    >
                      GitHub Users
                    </Link>
                    <Link
                      className="nav-link"
                      to={"/ToDo"}
                      data-toggle="collapse"
                      data-target="#collapsibleNavbar"
                    >
                      Todo's
                    </Link>
                    <Link
                      className="nav-link"
                      to={"/hacker-stories"}
                      data-toggle="collapse"
                      data-target="#collapsibleNavbar"
                    >
                      Hacker Stories
                    </Link>
                    <Link
                      className="nav-link"
                      to={"/ToDoListVirt"}
                      data-toggle="collapse"
                      data-target="#collapsibleNavbar"
                    >
                      Todo's virtualized
                    </Link>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        data-toggle="dropdown"
                        href="#"
                      >
                        Влез
                      </a>
                      <div className="dropdown-menu">
                        <Link
                          className="dropdown-item"
                          to={"/ValForm"}
                          data-toggle="collapse"
                          data-target="#collapsibleNavbar"
                        >
                          Validating Form
                        </Link>
                        <Link
                          className="dropdown-item"
                          to={"/DirTree"}
                          data-toggle="collapse"
                          data-target="#collapsibleNavbar"
                        >
                          Dir Tree
                        </Link>
                        <Link
                          className="dropdown-item"
                          to={"/Comp1"}
                          data-toggle="collapse"
                          data-target="#collapsibleNavbar"
                        >
                          Влез во магацин
                        </Link>
                        <Link
                          className="dropdown-item"
                          to={"/ShoppingCart"}
                          data-toggle="collapse"
                          data-target="#collapsibleNavbar"
                        >
                          Дневник на влезови
                        </Link>
                      </div>
                    </li>

                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        data-toggle="dropdown"
                        href="#"
                      >
                        Админ
                      </a>
                      <div className="dropdown-menu">
                        <Link
                          className="dropdown-item"
                          to={"/Comp2"}
                          data-toggle="collapse"
                          data-target="#collapsibleNavbar"
                        >
                          Прегледи
                        </Link>
                        <Link
                          className="dropdown-item"
                          to={"/Artikli"}
                          data-toggle="collapse"
                          data-target="#collapsibleNavbar"
                        >
                          Артикли
                        </Link>
                        <Link
                          className="dropdown-item"
                          to={"/GrupiArtikli"}
                          data-toggle="collapse"
                          data-target="#collapsibleNavbar"
                        >
                          Групи Артикли
                        </Link>
                        <Link
                          className="dropdown-item"
                          to={"/Comp1"}
                          data-toggle="collapse"
                          data-target="#collapsibleNavbar"
                        >
                          Мени
                        </Link>
                        <Link
                          className="dropdown-item"
                          to={"/Products"}
                          data-toggle="collapse"
                          data-target="#collapsibleNavbar"
                        >
                          Корисници
                        </Link>
                      </div>
                    </li>
                  </ul>
                  <div className="ml-auto">
                    <UserInfo />
                  </div>
                </div>
              </div>
            </div>

            <div className="container body-content">
              <Routes>
                <Route exact path="/" element={<Start />} />
                <Route exact path="/GitHub" element={<GitHubUsers />} />
                <Route exact path="/ToDo" element={<ToDo />} />
                <Route exact path="/ToDoListVirt" element={<ToDoListVirt />} />
                <Route
                  exact
                  path="/Artikli"
                  element={
                    <RolesAuthGuard roles={["Admin"]}>
                      <Artikli />
                    </RolesAuthGuard>
                  }
                />
                <Route
                  exact
                  path="/GrupiArtikli"
                  element={
                    <RolesAuthGuard>
                      <GrupiArtikli />
                    </RolesAuthGuard>
                  }
                />
                <Route exact path="/Test" element={<MyForm />} />
                <Route exact path="/Comp1" element={<Comp1 />} />
                <Route
                  exact
                  path="/Comp2"
                  render={(props) => <Comp2 {...props} list={[1, 2, 3, 4]} />}
                />
                <Route exact path="/Login" element={<Login />} />
                <Route exact path="/ShoppingCart" element={<ShoppingCart />} />
                <Route exact path="/Products" element={<Products />} />
                <Route
                  exact
                  path="/hacker-stories"
                  element={<HackerStories />}
                />
                <Route exact path="/ValForm" element={<ValidatingFormPage />} />
                <Route
                  path="*"
                  element={
                    <main style={{ padding: "1rem" }}>
                      <p>There's nothing here!</p>
                      <Link to={"/"}>Назад</Link>
                    </main>
                  }
                />
                <Route exact path="/DirTree" element={<DirTreePage />} />
              </Routes>
              <hr />
              <footer>
                <p>&copy; Дигит софтвер</p>
              </footer>
            </div>
          </div>
        </BrowserRouter>
      </ErrorContainer>
    </UserContext.Provider>
  );
}
