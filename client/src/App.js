import HomePage from "./Pages/HomePage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter,
} from "react-router-dom";
import SignIn from "./Pages/SignIn";
import Movie from "./Pages/Movie";
import SingleMovie from "./Pages/SingleMovie";
// import HomePage from "./Pages/NewNew";
// import HomePage from "./Pages/NewHomePage";

function App() {
  return (
    <>
      <HashRouter>
        <Switch>
          <Route path="/" exact component={HomePage} />
          {/* {localStorage.getItem("TOKEN") ? ( */}
          <Route path="/add_movie" exact component={Movie} />
          <Route path="/movie" exact component={SingleMovie} />
          {/* ) : ( */}
          <Route path="/admin_login" exact component={SignIn} />
          {/* )} */}
        </Switch>
      </HashRouter>
    </>
  );
}

export default App;
