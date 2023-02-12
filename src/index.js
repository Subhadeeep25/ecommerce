import React from 'react';
import  ReactDOM  from 'react-dom';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";

 ReactDOM.render(<Auth0Provider
    domain="dev-r4njlllyz3ivae1z.us.auth0.com"
    clientId="dxK4DdvjRiY7ZfsMoGvsr8Skf8jDND7n"
    redirectUri={window.location.origin}  ><App/></Auth0Provider>,document.getElementById('root'));