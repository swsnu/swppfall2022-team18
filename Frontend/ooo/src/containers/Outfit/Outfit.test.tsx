import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { getMockStore } from "../../test-utils/mocks";
import Outfit from "./Outfit";
import React from "react";
import { store } from "../../store";
import { IProps as FilterModalProps } from "../../components/FilterModal/FilterModal";
import { IProps as HeaderProps } from "../../components/Header/Header";
import { OutfitState } from "../../store/slices/outfit";
import { UserClothState } from "../../store/slices/userCloth";

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

jest.mock(
	"../../components/Header/Header", // eslint-disable-next-line react/display-name
	() => (props: HeaderProps) =>
		(
			<div data-testid="spyHeader">
				<div
					className="headerText"
					data-testid="logo"
					onClick={props.clickHeaderHandler}
				>
					<text id="appName">oOo</text>
					<text id="detailAppName">:recommend your outfit</text>
				</div>
				<div className="headerButton">
					<button
						id="infoButton"
						data-testid="info"
						onClick={props.clickInfoHandler}
					>
						내 정보
					</button>
					<button
						id="logoutButton"
						data-testid="logout"
						onClick={props.clickLogoutHandler}
					>
						로그아웃
					</button>
				</div>
			</div>
		)
);

jest.mock(
	"../../components/FilterModal/FilterModal",
	// eslint-disable-next-line react/display-name
	() => (props: FilterModalProps) =>
		(
			<div className="SpyFilterModal">
				<button
					id="done-button"
					data-testid="done-button"
					onClick={() => props.clickDoneHandler(null, null, null)}
				>
					Done
				</button>
			</div>
		)
);

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

export interface IProps {
	userHave: boolean;
	recommend: boolean;
	type: string | null;
	color: string | null;
	pattern: string | null;
}

describe("<Outfit />", () => {
	let outfit: JSX.Element;
	beforeAll(() => {
		jest.clearAllMocks();
		outfit = (
			<Provider store={mockStore}>
				<MemoryRouter>
					<Routes>
						<Route
							path="/"
							element={
								<Outfit
									userHave={false}
									recommend={false}
									type={null}
									color={null}
									pattern={null}
								/>
							}
						/>
					</Routes>
				</MemoryRouter>
			</Provider>
		);
	});

	it("should render Outfit page", () => {
		render(outfit);
	});

	it("should handle clickLogoHandler", () => {
		render(outfit);
		const logobutton = screen.getAllByTestId("logo")[0];
		fireEvent.click(logobutton);
		expect(mockNavigate).toHaveBeenCalled();
	});

	it("should handle clickLogoutHandler", () => {
		render(outfit);
		const logoutbutton = screen.getAllByTestId("logout")[0];
		fireEvent.click(logoutbutton);
	});

	it("should handle clickInfoHandler", () => {
		render(outfit);
		const infobutton = screen.getAllByTestId("info")[0];
		fireEvent.click(infobutton);
		expect(mockNavigate).toHaveBeenCalled();
	});

	it("should handle userHave button", () => {
		render(outfit);
		const userHaveButton = screen.getByText("userHave");
		fireEvent.click(userHaveButton);
		fireEvent.click(userHaveButton);
	});

	it("should handle recommend button", () => {
		render(outfit);
		const recommendButton = screen.getByText("recommend");
		fireEvent.click(recommendButton);
		fireEvent.click(recommendButton);
		const userHaveButton = screen.getByText("userHave");
		fireEvent.click(userHaveButton);
	});

	it("should handle reset button", () => {
		render(outfit);
		const resetButton = screen.getByText("Reset");
		fireEvent.click(resetButton);
	});

	it("should handle Filter button", () => {
		render(outfit);
		const filterButton = screen.getByText("Filter");
		fireEvent.click(filterButton);
	});

	it("should handle close Filter button", () => {
		render(outfit);
		const filterButton = screen.getByText("Filter");
		fireEvent.click(filterButton);
		const closeButton = screen.getByTestId("modal-close-button");
		fireEvent.click(closeButton);
	});

	it("should handle Filter Modal Done button", () => {
		render(outfit);
		const filterButton = screen.getByText("Filter");
		fireEvent.click(filterButton);
		const doneButton = screen.getByText("Done");
		fireEvent.click(doneButton);
	});

	it("should handle Click Outfit Image", () => {
		render(outfit);
		const outfitImage = screen.getAllByTestId("outfit-image")[0];
		fireEvent.click(outfitImage);
		expect(mockNavigate).toHaveBeenCalled();
	});

	it("should handle page shift buttons", () => {
		render(outfit);
		const nextPageButton = screen.getByTestId("next-page-button");
		fireEvent.click(nextPageButton);
		const nextPageButton2 = screen.getByTestId("next-page-button");
		fireEvent.click(nextPageButton2);
		const beforePageButton = screen.getByTestId("before-page-button");
		fireEvent.click(beforePageButton);
		const firstPageButton = screen.getByTestId("first-page-button");
		fireEvent.click(firstPageButton);
	});
});
