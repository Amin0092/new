import {hot} from "react-hot-loader/root";
import React from "react";
import "./main.global.css";
import {Layout} from "./Layout";
import {Header} from "./Header";
import {Content} from "./Content";
import {TaskTracker} from "./TaskTracker";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {rootReducer} from "./store/store";


const store = createStore(rootReducer, composeWithDevTools())

function AppComponent() {
    return (
        <Provider store={store}>
            <Layout>
                <Header/>
                <Content>
                    <TaskTracker/>
                </Content>
            </Layout>
        </Provider>
    );
}

export const App = hot(AppComponent);
