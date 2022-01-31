import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import NavBar from './components/views/NavBar/NavBar';
import Footer from './components/views/Footer/Footer';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/RegisterPage" component={RegisterPage} />
          <Route exact path="/LoginPage" component={LoginPage} />
          <Route exact path="/NavBar" component={NavBar} />
          <Route exact path="/Footer" component={Footer} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
