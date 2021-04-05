import "./App.css";
import Home from "./Screens/Home";
import { Route } from "react-router-dom";
import Login from "./Screens/Login";
import NavBar from "./Screens/NavBar";
import DogDetails from "./Screens/DogDetails";
import Landing from "./Screens/Lading";
import CreateDog from "./Screens/CreateDog";
function App() {
  return (
    <>
      <Route path="/" render={() => <NavBar />} />
      <Route exact path="/" render={() => <Landing />} />
      <Route exact path="/home" render={() => <Home />} />

      <Route exact path="/login" render={() => <Login />} />
      <Route exact path="/addog" render={() => <CreateDog />} />

      <Route exact path="/dogs/:id" component={DogDetails} />
    </>
  );
}

export default App;
