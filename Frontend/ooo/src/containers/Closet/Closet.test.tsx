import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import { getMockStore } from "../../test-utils/mocks";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Closet from "./Closet";
import { store } from "../../store";
import React from "react";
import { IProps as HeaderProps } from "../../components/Header/Header";
import { IProps as ClosetItemProps } from "../../components/ClosetItem/ClosetItem";
import { IProps as AddClothModalProps } from "../../components/AddClothModal/AddClothModal";
import axios from "axios";
import { OutfitState } from "../../store/slices/outfit";
import { UserClothState } from "../../store/slices/userCloth";
import userEvent from "@testing-library/user-event";

// eslint-disable-next-line
jest.mock("../../components/Header/Header", () => (props: HeaderProps) => (
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
));

jest.mock(
	"../../components/ClosetItem/ClosetItem",
	// eslint-disable-next-line
	() => (props: ClosetItemProps) =>
		(
			<div data-testid="spyClosetItem">
				<div
					className="ClothImage"
					data-testid="clothimg"
					onClick={props.clickClothDetailPopupHandler}
				>
					<img
						data-testid="cloth-img"
						id="cloth-img"
						src={props.source_url}
					></img>
				</div>
				<div className="ClothLable">
					<text id="type-label">종류</text>
					<text id="type-text">{props.type}</text>
					<text id="color-label">색상</text>
					<text id="color-text">{props.color}</text>
					<text id="stripe-label">무늬</text>
					<text id="stripe-text">{props.pattern}</text>
				</div>
				<button
					data-testid="spyClosetItem-delete-button"
					onClick={() => props.tmp}
				></button>
			</div>
		)
);

jest.mock(
	"../../components/AddClothModal/AddClothModal",
	// eslint-disable-next-line
	() => (props: AddClothModalProps) =>
		(
			<div data-testid="spyAddClothModal">
				<button
					data-testid="add-cloth-done-button"
					onClick={() => props.modal_close("하의")}
				>
					Done
				</button>
			</div>
		)
);

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
	sampleClothes: [
		{
			id: 1,
			name: "",
			image_link: "",
			outfit: 1,
			color: "black",
			type: "shirt",
			pattern: "no",
			purchase_link: "",
		},
	],
	sampleCloth: null,
	userCloth: null,
	cursor: 0,
	isLast: false,
};

const stubInitialUserClothState: UserClothState = {
	userClothes: [
		{
			id: 1,
			name: "",
			image_link: "",
			color: "black",
			type: "반소매 티셔츠",
			pattern: "no",
			dates: "test",
		},
		{
			id: 2,
			name: "",
			image_link: "",
			color: "black",
			type: "test-wrong-type",
			pattern: "no",
			dates: "test",
		},
	],
	selectedUserCloth: null,
	recommendOutfit: {
		id: 1,
		outfit_info: "",

		popularity: 1,
		image_link: "",
		userclothes: [
			{
				id: 1,
				name: "",
				image_link: "",
				color: "black",
				type: "shirt",
				pattern: "no",
				dates: "test",
			},
		],
	},
};

const mockStore = getMockStore({
	userCloth: stubInitialUserClothState,
	outfit: stubInitialOutfitState,
});

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

describe("<Closet />", () => {
	let closet: JSX.Element;
	beforeEach(() => {
		jest.clearAllMocks();
		closet = (
			<Provider store={mockStore}>
				<MemoryRouter>
					<Routes>
						<Route path="/" element={<Closet />} />
					</Routes>
				</MemoryRouter>
			</Provider>
		);
	});

	it("should render without errors", () => {
		render(closet);

		// Header
		const header = screen.getAllByTestId("spyHeader");
		expect(header).toHaveLength(1);
		const logobutton = screen.getAllByTestId("logo")[0];
		screen.findByText("oOo");
		fireEvent.click(logobutton);
		expect(mockNavigate).toHaveBeenCalled();

		// Add Cloth Button
		const addclothbutton = screen.getAllByTestId("add-cloth-button")[0];
		fireEvent.click(addclothbutton);
		expect(mockNavigate).toHaveBeenCalled();

		// ClosetItem
		const closetitems = screen.getAllByTestId("spyClosetItem");
		fireEvent.click(screen.getAllByTestId("clothimg")[0]);
	});

	it("should handle header logout button", async () => {
		render(closet);
		jest.spyOn(axios, "get").mockResolvedValue({
			data: { username: "test" },
		});
		const logoutbutton = screen.getAllByTestId("logout")[0];
		fireEvent.click(logoutbutton);
		await waitFor(() => expect(mockNavigate).toHaveBeenCalled());
	});

	it("should handler info button", () => {
		render(closet);
		const infoButton = screen.getAllByTestId("info")[0];
		fireEvent.click(infoButton);
	});

	it("should handle select component", () => {
		render(closet);
		const selectElement = screen.getAllByRole("combobox", {})[0];
		userEvent.selectOptions(selectElement, "상의");
		const defaultOption = screen.getByRole("option", {
			name: "Type",
		}) as HTMLOptionElement;
		const selectedOption = screen.getByRole("option", {
			name: "상의",
		}) as HTMLOptionElement;
		fireEvent.click(selectedOption);
		expect(defaultOption.selected).toBeFalsy();
		expect(selectedOption.selected).toBeTruthy();
		fireEvent.click(defaultOption);
	});

	it("should handle AddClothModal", () => {
		render(closet);
		const addClothButton = screen.getByTestId("add-cloth-button");
		fireEvent.click(addClothButton);
		const modalCloseButton = screen.getByTestId("modal-close-button");
		fireEvent.click(modalCloseButton);

		fireEvent.click(addClothButton);
		const modalDoneButton = screen.getByTestId("add-cloth-done-button");
		fireEvent.click(modalDoneButton);
	});

	it("should handle cloth delete button", () => {
		render(closet);
		const closetitems = screen.getAllByTestId("spyClosetItem")[0];
		fireEvent.click(closetitems);
		console.log("clickDeleteButton");
		const deleteButton = screen.getAllByTestId(
			"spyClosetItem-delete-button"
		)[0];
		fireEvent.click(deleteButton);
	});

	it("should return true when username is in localStorage", () => {
		localStorage.setItem("username", "test_username");
		render(closet);
	});

	it("should return false when username is in localStorage", () => {
		localStorage.removeItem("username");
		render(closet);
	});
});
