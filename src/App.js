// import logo from './logo.svg';
import './App.css';
import appStyle from "./app.module.css";

import React, { useEffect, useState ,Component} from "react";
import Button from '@material-ui/core/Button';
import {
    BrowserRouter as Router, Switch, Route, useParams, useLocation, Link, useRouteMatch, Redirect, useHistory
} from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";

import NavBar from "./components/NavBar/NavBar.js"
import Setting from "./components/Settings/Settings.js"
import {TargetList} from "./components/TargetList/TargetList.js"
import {BrandList, CarInfo, SearchBar, Main,Example} from "./components/Car/Car.js"
import TMui from "./components/TMui"
import {fetchCarList} from "./actions"

function App() {
  return (
    // <div style={{display:"flex"}}>
    <div className="flex">
      <Router>
        <Switch>
          <Route exact path="/">
            <NavBar/>
            <Main/>
          </Route>
          <Route path="/settings">
            <Setting/>
          </Route>
          <Route path="/targets">
            <NavBar/>
            <TargetList/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

