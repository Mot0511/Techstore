import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css'
import {setupStore} from "../store";
import {Provider} from "react-redux";

interface AppProps {
    Component: React.Component;
    pageProps: object;
}

const store = setupStore()

export default function MyApp({Component, pageProps}: AppProps) {
    // @ts-ignore
    return <Provider store={store}><Component {...pageProps} /></Provider>
}