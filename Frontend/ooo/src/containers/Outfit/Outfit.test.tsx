import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { getMockStore } from "../../test-utils/mocks";
import Outfit from "./Outfit";
import React from "react";
import { IProps as FilterModalProps } from "../../components/FilterModal/FilterModal";

// jest.mock(
// 	"../../components/FilterModal/FilterModal",
// 	// eslint-disable-next-line react/display-name
// 	() => (props: FilterModalProps) =>
// 		(
// 			<div className="SpyFilterModal">
// 				<button
// 					id="done-button"
// 					data-testid="done-button"
// 					onClick={props.clickDoneHandler}
// 				>
// 					Done
// 				</button>
// 			</div>
// 		)
// );

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
	...jest.requireActual("react-router"),
	useNavigate: () => mockNavigate,
}));

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
	...jest.requireActual("react-redux"),
	useDispatch: () => mockDispatch,
}));

describe("<Outfit />", () => {
	it("should render Outfit", () => {
		const { container } = render(<Outfit></Outfit>);
		expect(container).toBeTruthy();
	});

	it("should handle clickHeaderHandler", () => {
		render(<Outfit></Outfit>);
		const appNameText = screen.getByText("oOo");
		fireEvent.click(appNameText);
		expect(mockNavigate).toHaveBeenCalled();
	});

	it("should handle clickInfoHandler", () => {
		render(<Outfit></Outfit>);
		const appNameText = screen.getByText("내 정보");
		fireEvent.click(appNameText);
		expect(mockNavigate).toHaveBeenCalled();
	});

	it("should handle clickLogoutHandler", () => {
		render(<Outfit></Outfit>);
		const appNameText = screen.getByText("로그아웃");
		fireEvent.click(appNameText);
	});

	it("should handle userHave button", () => {
		render(<Outfit></Outfit>);
		const userHaveButton = screen.getByText("userHave");
		fireEvent.click(userHaveButton);
	});

	it("should handle recommend button", () => {
		render(<Outfit></Outfit>);
		const recommendButton = screen.getByText("recommend");
		fireEvent.click(recommendButton);
	});

	it("should handle reset button", () => {
		render(<Outfit></Outfit>);
		const resetButton = screen.getByText("Reset");
		fireEvent.click(resetButton);
	});

	it("should handle Filter button", () => {
		render(<Outfit></Outfit>);
		const filterButton = screen.getByText("Filter");
		fireEvent.click(filterButton);
	});

	it("should handle Filter Modal Done button", () => {
		render(<Outfit></Outfit>);
		const filterButton = screen.getByText("Filter");
		fireEvent.click(filterButton);
		const doneButton = screen.getByText("Done");
		fireEvent.click(doneButton);
	});

	it("should handle Filter Modal Done", () => {
		render(<Outfit></Outfit>);
		const filterButton = screen.getByText("Filter");
		fireEvent.click(filterButton);
	});

	it("should handle Click Outfit Image", () => {
		render(<Outfit></Outfit>);
		const outfitImage = screen.getAllByTestId("outfit-image")[0];
		fireEvent.click(outfitImage);
		expect(mockNavigate).toHaveBeenCalled();
	});
});
