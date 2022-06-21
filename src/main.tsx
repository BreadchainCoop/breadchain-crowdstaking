import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import store from "./store";

import App from "./components/App";
import ErrorBoundary from "./components/ErrorBoundary";

import "./css/index.css";
import { WagmiConfig, createClient } from "wagmi";

const client = createClient();

// ReactDOM.render(
//   <React.StrictMode>
//     <ErrorBoundary>
//       <WagmiConfig client={client}>
//         <Provider store={store}>
//           <HashRouter>
//             <App />
//           </HashRouter>
//         </Provider>
//       </WagmiConfig>
//     </ErrorBoundary>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);
