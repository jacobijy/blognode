import React from "react";
import { render } from "react-dom";
import TitlePanel from "../titlepanel";
import MainContainer from "../main";
import SignPanel from "../signpanel";

render(<TitlePanel />, document.getElementById("title-panel"));
render(<SignPanel />, document.getElementById("signup-area"))
render(<MainContainer />, document.getElementById("main-container"));