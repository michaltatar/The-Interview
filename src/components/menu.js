import React, {Component} from "react";
import "../scss/main.scss";
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';

class Navigation extends Component {

    render() {
        return (
            <>
                <nav>
                    <ul>
                        <li><NavLink className='link' to="/game">Start quiz!</NavLink></li>
                        <li><NavLink className='link' to="/add">Contribute!</NavLink></li>
                    </ul>
                </nav>
            </>
        )
    }

}

class Main extends Component {

    render() {
        return (
            <>
                <div className='container'>
                    <h1 className="logo">The Interview</h1>
                    <Navigation />
                </div>
            </>
        )
    }

}

export default Main;