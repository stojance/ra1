import React, { Component } from "react";
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
import AuthService from "./components/auth/AuthService";
import Start from "./components/start";
import HackerStories from "./components/HackerStories"

export const UserContext = React.createContext();

class App_old extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
    this.auth = new AuthService();
  }

  componentDidMount() {
    this.logIn();
    //console.log(this.state);
  }

  logIn = () => {
    console.log('this.auth.getProfile()',this.auth.getProfile());
    this.setState({ user: this.auth.getProfile() });
  };

  logOut = () => {
    this.setState({ user: null });
    this.auth.logout();
  };

  render() {
    const aStyle = {
      padding: 0,
    };
    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          logIn: this.logIn,
          logOut: this.logOut,
        }}
      >
        <BrowserRouter>
          <div>
            <div className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
              <div className="container">
                <Link to={"/"} className="navbar-brand" style={aStyle}>
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
                    <Link className="nav-link" to={"/Test"}>
                      Нарачки
                    </Link>
                    <Link className="nav-link" to={"/GitHub"}>
                      GitHub Users
                    </Link>
                    <Link className="nav-link" to={"/ToDo"}>
                      Todo's
                    </Link>
                    <Link className="nav-link" to={"/hacker-stories"}>
                      Hacker Stories
                    </Link>
                    <Link className="nav-link" to={"/ToDoListVirt"}>
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
                        <Link className="dropdown-item" to={"/Comp1"}>
                          Влез во магацин
                        </Link>
                        <Link className="dropdown-item" to={"/ShoppingCart"}>
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
                        <Link className="dropdown-item" to={"/Comp2"}>
                          Прегледи
                        </Link>
                        <Link className="dropdown-item" to={"/Artikli"}>
                          Артикли
                        </Link>
                        <Link className="dropdown-item" to={"/GrupiArtikli"}>
                          Групи Артикли
                        </Link>
                        <Link className="dropdown-item" to={"/Comp1"}>
                          Мени
                        </Link>
                        <Link className="dropdown-item" to={"/Products"}>
                          Корисници
                        </Link>
                      </div>
                    </li>
                  </ul>
                  <div className="ml-auto">
                    {/*<Dashboard />*/}
                    <UserInfo />
                  </div>
                </div>
              </div>
            </div>

            <div className="container body-content">
              {/*<div className="panel panel-heading"> */}
              <div>
                <Routes>
                  <Route exact path="/" element={<Start />} />
                  <Route exact path="/GitHub" element={<GitHubUsers/>} />
                  <Route exact path="/ToDo" element={<ToDo/>} />
                  <Route exact path="/ToDoListVirt" element={<ToDoListVirt/>} />
                  <Route exact path="/Artikli" element={<Artikli />} />
                  <Route exact path="/GrupiArtikli" element={<GrupiArtikli />} />
                  <Route exact path="/Test" element={<MyForm/>} />
                  <Route exact path="/Comp1" element={<Comp1/>} />
                  <Route
                    exact
                    path="/Comp2"
                    render={(props) => <Comp2 {...props} list={[1, 2, 3, 4]} />}
                  />
                  <Route exact path="/Login" element={<Login/>} />
                  <Route exact path="/ShoppingCart" element={<ShoppingCart />} />
                  <Route exact path="/Products" element={<Products/>} />
                  <Route exact path="/hacker-stories" element={<HackerStories/>} />
                </Routes>
              </div>

              <hr />
              <footer>
                <p>&copy; Дигит софтвер</p>
              </footer>
            </div>
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    );
  }
}

export default App_old;
