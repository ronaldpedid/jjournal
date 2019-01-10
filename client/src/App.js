import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AppViewModel } from './app.viewModel';
import { observer, Provider } from 'mobx-react';
import { Home } from './views/home/Home';
import { Login } from './views/login/Login';
import { Signup } from './views/signup/Signup';
import { EntryForm } from './views/journal/Create';
import { DashboardView } from './views/dashboard/Dashboard';
import { TechniqueForm } from './views/book/Create';
import { UserProfile } from './views/user/Profile';
import { TechniqueViewModel } from './views/book/user.viewModel';
import { EditUser } from './views/user/Edit';
import { UserProfileViewModel } from './views/user/profile.viewModel';
import { EditorView } from './views/editor/Editor';
import { SiteNavigation } from './components/navigation/Navigation';
import { Book } from './views/book/Book';
import { Journal } from './views/journal/Journal';
import { JournalViewModel } from './views/journal/user.viewModel';


@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.userProfile = new UserProfileViewModel();
    this.userTechniques = new TechniqueViewModel();
    this.userJournal = new JournalViewModel();
  }
  async componentDidMount() {
    await this.userProfile.loadUser();
    await this.userTechniques.loadTechniques();
    await this.userJournal.loadJournal();
  }
  render() {
    return (
      <Provider
        userProfile={this.userProfile}
        userTechniques={this.userTechniques}
        userJournal={this.userJournal}
      >
        <BrowserRouter>
          <div>
            <SiteNavigation />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/account" component={UserProfile} />
              <Route path="/account/login" component={Login} />
              <Route path="/account/signup" component={Signup} />
              <Route path="/account/technique_book/technique/new" component={TechniqueForm} />
              <Route path="/account/technique_book" component={Book} />
              <Route path="/account/dashboard" component={DashboardView} />
              <Route path="/account/journal/entry/new" component={EntryForm} />
              <Route path="/account/journal/" component={Journal} />
              <Route path="/account/articles/new" component={EditorView} />
              <Route path="/account/edit" component={EditUser} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
