// TODO: Figure out the best way to render this server side.
//
// /**
//  * This handles rendering the client app on the server
//  */
// import React from 'react';
// import ReactDOMServer from 'react-dom/server';
// import { Provider } from 'react-redux';

// import configureStore from '../../src/store/configureStore';
// import ConnectedIndex from '../../src/components/ConnectedIndex';

// export default function renderApp (req, res) {
//   const store = configureStore({});

//   const html = ReactDOMServer.renderToString(
//     <Provider store={store}>
//       <ConnectedIndex />
//     </Provider>
//   );

//   res.render('index', { html, initialState: JSON.stringify(store.getState())});
// }
