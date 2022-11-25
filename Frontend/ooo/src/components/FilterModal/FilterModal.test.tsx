import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { getMockStore } from "../../test-utils/mocks";
import FilterModal from "./FilterModal";
import React from "react";

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
	...jest.requireActual("react-router"),
	useNavigate: () => mockNavigate,
}));

const mockDoneHandler = (
	type: string | null,
	color: string | null,
	pattern: string | null
) => {
	return;
};

describe("<FilterModal/>", () => {
	it("should render without errors", () => {
		render(<FilterModal clickDoneHandler={mockDoneHandler}></FilterModal>);
	});
});
