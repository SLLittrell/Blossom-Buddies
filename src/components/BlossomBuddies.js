import React from "react";
import { Route, Redirect } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { userStorageKey } from "./auth/authSettings"
import './BlossomBuddies.css';
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles'


export const theme = createMuiTheme({
  primary: {
    main:"#587085",
  },
});


export const BlossomBuddies = () => (
  <>
        <Route render={() => {
          if (sessionStorage.getItem(userStorageKey)) {
            return (
              <>
              <ThemeProvider theme={theme}>
                  <NavBar />
                <ApplicationViews />
              </ThemeProvider>
              </>
            )
          } else {
            return <Redirect to="/login" />;
          }
      }} />

      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
    
  </>
)