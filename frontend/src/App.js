import { Route, Switch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "./store/session";
import LoginFormPage from "./components/LoginFormModal";
import SignupFormPage from "./components/SignupFormModal";
import Navigation from "./components/Navigation";
import Home from "./components/Home"
import NewSpot from "./components/NewSpot"
import SingleSpot from "./components/SingleSpot";
import EditSpot from "./components/EditSpot";
import MySpots from "./components/MySpots"

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
    }, [dispatch])
    
    return (
      <>
      <Navigation isLoaded={isLoaded}/>
      {isLoaded && (
        <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/newSpot">
              <NewSpot />
            </Route>
            <Route path="/edit/:spotId">
              <EditSpot />
            </Route>
            <Route path="/mySpots">
              <MySpots />
            </Route>
            <Route path="/:spotId">
              <SingleSpot />
            </Route>
        </Switch>
      )}
      
      </>
    );
}

export default App;
