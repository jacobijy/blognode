import React from "react";
import { render } from "react-dom";
import TitlePanel from "../titlepanel";
import Maincontainer from "../main";

render(<TitlePanel />, document.getElementById('title-panel'));
render(<Maincontainer />, document.getElementById('main-container'));