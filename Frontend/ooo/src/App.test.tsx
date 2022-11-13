import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store";

test("renders App.tsx", () => {
	render(
		<Provider store={store}>
			<App />
		</Provider>
	);
});
