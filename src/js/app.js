import React, {Component} from "react";
import ReactDOM from "react-dom";
import Main from "../components/menu.js";
import Add from "../components/add.js";
import Game from "../components/game.js";
import "../scss/main.scss";
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';

class NotFound extends Component {
    render() {
        return <h1>Not found (404)</h1>;
    }
}

class App extends Component {

    render() {
        return (
            <>
                <HashRouter>
                    <>
                        <Switch>
                            <Route exact path='/' component={Main} />
                            <Route exact path='/game' render={props => <Game {...props}/>} />
                            <Route exact path='/add' component={Add} />
                            <Route component={NotFound} />
                        </Switch>
                    </>
                </HashRouter>
            </>
        )
    }

}

ReactDOM.render(<App/>, document.getElementById("app"));