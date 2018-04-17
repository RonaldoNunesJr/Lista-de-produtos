/*
Site usado para desenvolver esse start
https://devheroes.io/como-configurar-ambiente-react-usando-webpack-babel-css-modules/ */
import React from 'react';
import { render } from 'react-dom';
// AppContainer é um componente wrapper necessário para HMR
import { AppContainer } from 'react-hot-loader';

// Componente que vamos criar
import App from './components/App';

// Estrutura do HMR
const renderApp = Component => {
    render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('app')
    );
};

renderApp(App);

// Hot Module Replacement API
if ( module.hot ) {
    module.hot.accept('./components/App', () => {
        renderApp(App);
    });
}