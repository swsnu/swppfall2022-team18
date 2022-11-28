import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { getMockStore } from "../../test-utils/mocks";
import FilterModal from "./FilterModal";
import React from "react";
import { OutfitState } from "../../store/slices/outfit";
import { UserClothState } from "../../store/slices/userCloth";
import TypeFilter, {
	IProps as TypeFilterProps,
} from "../TypeFilter/TypeFilter";
import userEvent from "@testing-library/user-event";

const stubInitialOutfitState: OutfitState = {
	outfits: [
		{
			id: 0,
			outfit_info: "",
			outfit_name: "",
			popularity: 1,
			image_link: "",
			purchase_link: ""
		},
	],
	selectedOutfit: null,
	filter: {
		color: null,
		type: null,
		pattern: null,
		userHave: false,
		recommend: false,
	},
	sampleClothes: [],
	sampleCloth: null,
	userCloth: null,
	cursor: 0,
	isLast: false,
};

const stubInitialUserClothState: UserClothState = {
	userClothes: [],
	selectedUserCloth: null,
	recommendOutfit: null,
};

const mockStore = getMockStore({
	userCloth: stubInitialUserClothState,
	outfit: stubInitialOutfitState,
});

const mockDoneHandler = (
	type: string | null,
	color: string | null,
	pattern: string | null
) => {
	return;
};

jest.mock(
	"../TypeFilter/TypeFilter",
	// eslint-disable-next-line react/display-name
	() => (props: TypeFilterProps) =>
		(
			<div className="SpyFilterModal">
				<button
					id="done-button"
					data-testid="typefilter-done-button"
					onClick={() => props.selectHandler("")}
				>
					Done
				</button>
			</div>
		)
);

jest.mock(
	"../TypeFilter/TypeFilter",
	// eslint-disable-next-line react/display-name
	() => (props: TypeFilterProps) =>
		(
			<div className="SpyFilterModal">
				<button
					id="done-button"
					data-testid="typefilter-done-button"
					onClick={() => props.selectHandler("상의 종류")}
				>
					Done
				</button>
			</div>
		)
);

describe("<FilterModal/>", () => {
	let filterModal: JSX.Element;
	beforeAll(() => {
		jest.clearAllMocks();
		filterModal = (
			<Provider store={mockStore}>
				<MemoryRouter>
					<Routes>
						<Route
							path="/"
							element={
								<FilterModal clickDoneHandler={mockDoneHandler}></FilterModal>
							}
						/>
					</Routes>
				</MemoryRouter>
			</Provider>
		);
	});

	it("should render without errors", () => {
		render(filterModal);
	});

	it("should handle metaTypeOptionHandler", () => {
		render(filterModal);
		const selectElement = screen.getAllByRole("combobox", {})[0];
		userEvent.selectOptions(selectElement, "상의");
		const defaultOption = screen.getByRole("option", {
			name: "옷 종류",
		}) as HTMLOptionElement;
		const selectedOption = screen.getByRole("option", {
			name: "상의",
		}) as HTMLOptionElement;
		fireEvent.click(selectedOption);
		expect(defaultOption.selected).toBeFalsy();
		expect(selectedOption.selected).toBeTruthy();
		fireEvent.click(defaultOption);
	});

	it("should handle ColorOptionHandler", () => {
		render(filterModal);
		const selectElement = screen.getAllByRole("combobox", {})[1];
		userEvent.selectOptions(selectElement, "black");
		const defaultOption = screen.getByRole("option", {
			name: "Color",
		}) as HTMLOptionElement;
		const selectedOption = screen.getByRole("option", {
			name: "black",
		}) as HTMLOptionElement;
		fireEvent.click(selectedOption);
		expect(defaultOption.selected).toBeFalsy();
		expect(selectedOption.selected).toBeTruthy();
		fireEvent.click(defaultOption);
	});

	it("should handle PatternOptionHandler", () => {
		render(filterModal);
		const selectElement = screen.getAllByRole("combobox", {})[2];
		userEvent.selectOptions(selectElement, "none");
		const defaultOption = screen.getByRole("option", {
			name: "Pattern",
		}) as HTMLOptionElement;
		const selectedOption = screen.getByRole("option", {
			name: "none",
		}) as HTMLOptionElement;
		fireEvent.click(selectedOption);
		expect(defaultOption.selected).toBeFalsy();
		expect(selectedOption.selected).toBeTruthy();
		fireEvent.click(defaultOption);
	});

	it("should handle typeFilter", () => {
		render(filterModal);
		const typeFilterDoneButton = screen.getByTestId("typefilter-done-button");
		fireEvent.click(typeFilterDoneButton);
	});

	it("should handle clickDoneHandler", () => {
		render(filterModal);
		const doneButton = screen.getByTestId("done-button");
		fireEvent.click(doneButton);
	});

	it("should handle typeFilter", () => {
		render(filterModal);
		const typeFilterDoneButton = screen.getByTestId("typefilter-done-button");
		fireEvent.click(typeFilterDoneButton);
	});
});
