import "./App.css";
import Home from "./Screens/Home";
import { Route } from "react-router-dom";
import Login from "./Screens/Login";
import NavBar from "./Screens/NavBar";
import DogDetails from "./Screens/DogDetails";
function App() {
  return (
    <>
      <Route path="/" render={() => <NavBar />} />
      <Route exact path="/" render={() => <Home />} />
      <Route exact path="/login" render={() => <Login />} />
      <Route exact path="/dogs/:id" component={DogDetails} />
    </>
  );
}

export default App;
