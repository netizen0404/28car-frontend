import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router, Switch, Route, useParams, useLocation, Link, useRouteMatch, Redirect, useHistory
} from "react-router-dom";

function useInput(){

    const [input, setInput] = useState("");

    return [input, setInput]
}

export default useInput;