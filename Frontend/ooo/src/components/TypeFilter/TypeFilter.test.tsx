import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { getMockStore } from "../../test-utils/mocks";
import TypeFilter from "./TypeFilter";
import React from "react";
import { OutfitState } from "../../store/slices/outfit";
import { UserClothState } from "../../store/slices/userCloth";
import userEvent from "@testing-library/user-event";

const stubInitialOutfitState: OutfitState = {
	outfits: [
		{
			id: 1,
			outfit_info: "",
			outfit_name: "",
			popularity: 1,
			image_link: "",
			purchase_link: "",
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

const mockSelectHandler = (value: string) => {
	return;
};

describe("<TypeFilter />", () => {
	let nullTypeFilter: JSX.Element;
	let topTypeFilter: JSX.Element;
	let bottomTypeFilter: JSX.Element;
	let outerTypeFilter: JSX.Element;
	beforeAll(() => {
		jest.clearAllMocks();
		nullTypeFilter = (
			<Provider store={mockStore}>
				<MemoryRouter>
					<Routes>
						<Route
							path="/"
							element={
								<TypeFilter metaType="상의" selectHandler={mockSelectHandler} />
							}
						/>
					</Routes>
				</MemoryRouter>
			</Provider>
		);
		topTypeFilter = (
			<Provider store={mockStore}>
				<MemoryRouter>
					<Routes>
						<Route
							path="/"
							element={
								<TypeFilter metaType="상의" selectHandler={mockSelectHandler} />
							}
						/>
					</Routes>
				</MemoryRouter>
			</Provider>
		);
		bottomTypeFilter = (
			<Provider store={mockStore}>
				<MemoryRouter>
					<Routes>
						<Route
							path="/"
							element={
								<TypeFilter metaType="하의" selectHandler={mockSelectHandler} />
							}
						/>
					</Routes>
				</MemoryRouter>
			</Provider>
		);
		outerTypeFilter = (
			<Provider store={mockStore}>
				<MemoryRouter>
					<Routes>
						<Route
							path="/"
							element={
								<TypeFilter
									metaType="아우터"
									selectHandler={mockSelectHandler}
								/>
							}
						/>
					</Routes>
				</MemoryRouter>
			</Provider>
		);
	});

	it("should render with metaType == null without errors", () => {
		render(nullTypeFilter);
	});

	it("should render with metaType == Top without errors", () => {
		render(topTypeFilter);
		const selectElement = screen.getByRole("combobox", {});
		userEvent.selectOptions(selectElement, "반소매 티셔츠");
		const defaultOption = screen.getByRole("option", {
			name: "상의 종류",
		}) as HTMLOptionElement;
		const selectedOption = screen.getByRole("option", {
			name: "반소매 티셔츠",
		}) as HTMLOptionElement;
		fireEvent.click(selectedOption);
		expect(defaultOption.selected).toBeFalsy();
		expect(selectedOption.selected).toBeTruthy();
	});

	it("should render with metaType == Bottom without errors", () => {
		render(bottomTypeFilter);
		const selectElement = screen.getByRole("combobox", {});
		userEvent.selectOptions(selectElement, "데님 팬츠");
		const defaultOption = screen.getByRole("option", {
			name: "하의 종류",
		}) as HTMLOptionElement;
		const selectedOption = screen.getByRole("option", {
			name: "데님 팬츠",
		}) as HTMLOptionElement;
		fireEvent.click(selectedOption);
		expect(defaultOption.selected).toBeFalsy();
		expect(selectedOption.selected).toBeTruthy();
	});

	it("should render with metaType == Outer without errors", () => {
		render(outerTypeFilter);
		const selectElement = screen.getByRole("combobox", {});
		userEvent.selectOptions(selectElement, "베스트");
		const defaultOption = screen.getByRole("option", {
			name: "아우터 종류",
		}) as HTMLOptionElement;
		const selectedOption = screen.getByRole("option", {
			name: "베스트",
		}) as HTMLOptionElement;
		fireEvent.click(selectedOption);
		expect(defaultOption.selected).toBeFalsy();
		expect(selectedOption.selected).toBeTruthy();
	});
});
