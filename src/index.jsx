import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import SuspenseContent from './containers/SuspenseContent';
import {SWRConfig} from "swr";
import store from "./app/store";

import {Provider} from "react-redux";
import axios from "axios";
// import {PersistGate} from "redux-persist/integration/react";
// import {persistStore} from "redux-persist";

// const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <Suspense fallback={<SuspenseContent/>}>
        <SWRConfig
            value={{
                fetcher: url => axios.get(url).then((res) => res.data),
                provider: () => new Map(),
                isOnline() {
                    /* 네트워크 상태 감지자 커스터마이징 */
                    return true
                },
                isVisible() {
                    /* visibility 상태 감지자 커스터마이징 */
                    return true
                },
                initFocus(callback) {
                    /* 상태 공급자에 리스너 등록 */
                },
                initReconnect(callback) {
                    /* 상태 공급자에 리스터 등록 */
                }
            }}
        >
            <Provider store={store}>
                {/*<PersistGate loading={null} persistor={persistor}>*/}
                <React.StrictMode>
                    <App/>
                </React.StrictMode>
                {/*</PersistGate>*/}
            </Provider>
        </SWRConfig>
    </Suspense>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
