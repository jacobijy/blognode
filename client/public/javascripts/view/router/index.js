import React from "react";
import { render } from "react-dom";
import { Route, Router } from "react-router";
import TitlePanel from "../titlepanel";
import MainContainer from "../App";
import SignPanel from "../signpanel";

// render((
//   <Router history={hashHistory}>
//     <Route path="/" component={TitlePanel}>
//       <Route path="/signup" component={SignPanel} />
//     </Route>
//   </Router>), document.getElementById("title-panel")
// );