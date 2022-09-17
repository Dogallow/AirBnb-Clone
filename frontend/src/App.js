import { Route, Switch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "./store/session";
import LoginFormPage from "./components/LoginFormPage";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
    }, [dispatch])
    
    return isLoaded && (
      
      <>
        <Switch>
          <Route path="/login">
            <LoginFormPage/>
          </Route>
        </Switch>
      </>
    );
}

export default App;
