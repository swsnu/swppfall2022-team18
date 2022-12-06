import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Redirect from "./Redirect";
import { Provider } from "react-redux";
import React from "react";
import { store } from "../../store";

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useLocation: () => ({
		state: {
			url: "www.naver.com",
		},
	}),
}));

describe("<OutfitDetail/>", () => {
	let redirect: JSX.Element;

	beforeEach(() => {
		jest.clearAllMocks();
		redirect = (
			<Provider store={store}>
				<MemoryRouter>
					<Routes>
						<Route path="/" element={<Redirect />} />
					</Routes>
				</MemoryRouter>
			</Provider>
		);
	});

	it("should render without errors", () => {
		render(redirect);
	});
});
