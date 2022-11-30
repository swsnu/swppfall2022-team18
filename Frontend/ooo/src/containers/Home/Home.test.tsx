import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";
import { renderWithProviders, getMockStore } from '../../test-utils/mocks';
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import { OutfitState } from "../../store/slices/outfit";
import { UserClothState } from "../../store/slices/userCloth";
import { IProps as HeaderProps } from "../../components/Header/Header";
import { IProps as OutfitPreviewProps } from "../../components/OutfitPreview/OutfitPreview";
import { IProps as ClosetItemProps } from "../../components/ClosetItem/ClosetItem";
import axios from 'axios';

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
	"../../components/OutfitPreview/OutfitPreview",
	() => (props: OutfitPreviewProps) =>
		(
			<div data-testid="spyOutfitPreview">
				<div className="OutfitImage">
					<img
						data-testid="outfit-img"
						id="outfit-img"
						src={props.source_url}
						onClick={props.clickOutfitDetail}
					></img>
				</div>
				<div className="OutfitLable">
					<text id="outfit-info-text" data-testid="outfit-info">
						{props.info}
					</text>
				</div>
			</div>
		)
);

jest.mock(
	"../../components/ClosetItem/ClosetItem",
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
		{id: 1, name:"", image_link:"", outfit:1, color:"black", type:"shirt", pattern:"no", purchase_link:""}
	],
	sampleCloth: null,
	userCloth: null,
	cursor: 0,
	isLast: false,
};

const stubInitialUserClothState: UserClothState = {
	userClothes: [
		{id: 1, name:"", image_link:"", user:1, color:"black", type:"shirt", pattern:"no", dates:"test"}
	],
	selectedUserCloth: null,
	recommendOutfit: {
		id: 1,
		outfit_info: "",
		outfit_name: "",
		popularity: 1,
		image_link: "",
		userClothes: [
			{id: 1, name:"", image_link:"", user:1, color:"black", type:"shirt", pattern:"no", dates:"test"}
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

describe("<Home />", () => {
	let home: JSX.Element;
	beforeEach(() => {
		jest.clearAllMocks();
		home = (
			<Provider store={mockStore}>
				<MemoryRouter>
					<Routes>
						<Route path="/" element={<Home />} />
					</Routes>
				</MemoryRouter>
			</Provider>
		);
	});

	it("should render without errors", () => {
		render(home);
		const header = screen.getAllByTestId("Header");
		expect(header).toHaveLength(1);
		const logobutton = screen.getAllByTestId("logo")[0];
		screen.findByText("oOo");
		fireEvent.click(logobutton);
		expect(mockNavigate).toHaveBeenCalled();

		const infobutton = screen.getAllByTestId("info")[0];
		fireEvent.click(infobutton);
		expect(mockNavigate).toHaveBeenCalled();

		const logoutbutton = screen.getAllByTestId("logout")[0];
		fireEvent.click(logoutbutton);
		//expect(mockDispatch).toHaveBeenCalledTimes(1);

		const outfitpreviews = screen.getAllByTestId("OutfitPreview");
		expect(outfitpreviews).toHaveLength(1);

		const closetitems = screen.getAllByTestId("ClosetItem");
		expect(closetitems).toHaveLength(1);
		fireEvent.click(screen.getAllByTestId("clothimg")[0]);
		screen.findByTestId("outfit-img");
		screen.findAllByTestId("outfit-img");
		const todayOutfit = screen.getAllByTestId("TodayOutfit");
		expect(todayOutfit).toHaveLength(1);
		screen.findAllByTestId("wear-button");
		screen.findAllByTestId("today-outfit-img");

		const todayOutfitlable = screen.getAllByTestId("TodayOutfit-lable");
		const morebutton = screen.getAllByText("More");
		expect(morebutton).toHaveLength(2);
		const morebtn = screen.getAllByTestId("more-btn");
		expect(morebtn).toHaveLength(2);
		fireEvent.click(morebtn[0]);
		expect(mockNavigate).toHaveBeenCalled();
		fireEvent.click(morebtn[1]);
		expect(mockNavigate).toHaveBeenCalled();
	});

	it("should handle header logout button", async() => {
		render(home);
		jest.spyOn(axios, "get").mockResolvedValue({
			data: { username: "test" },
		});
		const logoutbutton = screen.getAllByTestId("logout")[0];
		fireEvent.click(logoutbutton);
		await waitFor(() => expect(mockNavigate).toHaveBeenCalled());
	})

	it("should handler info button", () => {
		render(home);
		const infoButton = screen.getAllByTestId("info")[0];
		fireEvent.click(infoButton);
	})

	it("should handle closet more button", async() => {
		render(home);
		const moreButton = screen.getAllByTestId("more-btn")[0]
		fireEvent.click(moreButton)
		await waitFor(() => expect(mockNavigate).toHaveBeenCalled());
	})

	it("should handle outfit more button", async() => {
		render(home);
		const moreButton = screen.getAllByTestId("more-btn")[1]
		fireEvent.click(moreButton)
		await waitFor(() => expect(mockNavigate).toHaveBeenCalled());
	})


});
