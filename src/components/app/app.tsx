import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { FibonacciPage } from "../fibonacci-page/components";
import { ListPage } from "../list-page/components";
import { MainPage } from "../main-page/main-page";
import { QueuePage } from "../queue-page/components";
import { StringComponent } from "../string/components";
import { SortingPage } from "../sorting-page/components";
import { StackPage } from "../stack-page/stack-page";
import style from "./app.module.css";

function App() {
  return (
    <div className={style.app}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route path="/recursion">
            <StringComponent />
          </Route>
          <Route path="/fibonacci">
            <FibonacciPage />
          </Route>
          <Route path="/sorting">
            <SortingPage />
          </Route>
          <Route path="/stack">
            <StackPage />
          </Route>
          <Route path="/queue">
            <QueuePage />
          </Route>
          <Route path="/list">
            <ListPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
