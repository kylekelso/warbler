import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

import Navbar from "./Navbar";
import Main from "./Main";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="onboarding">
          <Navbar />
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
