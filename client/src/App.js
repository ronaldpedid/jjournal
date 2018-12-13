import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from './views/home/Home';
import { Login } from './views/login/Login';
import { Signup } from './views/signup/Signup';
import { EntryForm } from './views/journal/Create';
import { DashboardView } from './views/dashboard/Dashboard';
import { TechniqueForm } from './views/book/Create';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/account/login" component={Login} />
          <Route path="/account/signup" component={Signup} />
          <Route path="/account/technique_book/technique/new" component={TechniqueForm} />
          <Route exact path="/account/dashboard" component={DashboardView} />
          <Route path="/account/journal/entry/new" component={EntryForm} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
