import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store, StorePersistor } from "./redux/store";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
import { DefaultStyles } from "./styles/DefaultStyles/GlobalStyles";

ReactDOM.render(
	<DefaultStyles>
		<Provider store={store}>
			<PersistGate loading={null} persistor={StorePersistor}>
				<App />
			</PersistGate>
		</Provider>
	</DefaultStyles>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
