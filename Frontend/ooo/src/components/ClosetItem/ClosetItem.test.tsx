import { fireEvent, render, screen } from "@testing-library/react";
import ClosetItem from "./ClosetItem";
import React from "react";
import { IProps as ClothDetailModalProps } from "../ClothDetailModal/ClothDetailModal";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { store } from "../../store";

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

jest.mock(
	"../ClothDetailModal/ClothDetailModal",
	// eslint-disable-next-line react/display-name
	() => (props: ClothDetailModalProps) =>
		(
			<div className="SpyClothDetailModal">
				<button
					id="close-button"
					data-testid="spyModal-close-button"
					onClick={() => props.modal_close()}
				>
					close
				</button>
			</div>
		)
);

describe("<ClosetItem />", () => {
	let closetItem: JSX.Element;
	let closetItemTmp: JSX.Element;

	const mockClickPopupHandler = jest.fn();
	const mockClickOnDeleteHandler = jest.fn();

	beforeAll(() => {
		jest.clearAllMocks();
		closetItem = (
			<Provider store={store}>
				<MemoryRouter>
					<Routes>
						<Route
							path="/"
							element={
								<ClosetItem
									user_cloth_id="1"
									source_url="https://image.msscdn.net/images/goods_img/20190228/969580/969580_1_500.jpg?t=20190228191158"
									weardate="weardate"
									metatype="metatype"
									type="type"
									color="color"
									pattern="pattern"
									clickClothDetailPopupHandler={() => mockClickPopupHandler}
									// tmp?: (metatype: string) => void;
								/>
							}
						/>
					</Routes>
				</MemoryRouter>
			</Provider>
		);

		closetItemTmp = (
			<Provider store={store}>
				<MemoryRouter>
					<Routes>
						<Route
							path="/"
							element={
								<ClosetItem
									user_cloth_id="1"
									source_url="https://image.msscdn.net/images/goods_img/20190228/969580/969580_1_500.jpg?t=20190228191158"
									weardate="weardate"
									metatype="metatype"
									type="type"
									color="color"
									pattern="pattern"
									clickClothDetailPopupHandler={() => mockClickPopupHandler}
									tmp={(metatype) => mockClickOnDeleteHandler(metatype)}
								/>
							}
						/>
					</Routes>
				</MemoryRouter>
			</Provider>
		);
	});

	it("should render without errors", () => {
		render(closetItem);
		screen.findByTestId("cloth-img");
		screen.findByText("종류");
		screen.findByText("트러커 재킷");
		screen.findByText("색상");
		screen.findByText("그레이");
		screen.findByText("무늬");
		screen.findByText("None");
		const imgbutton = screen.getByTestId("clothimg");
		fireEvent.click(imgbutton);
		const closebutton = screen.getByTestId("modal-close-button");
		fireEvent.click(closebutton);
	});

	it("should handle clickClothDetailPopupCloseHandler", () => {
		render(closetItem);
		const imgbutton = screen.getByTestId("clothimg");
		fireEvent.click(imgbutton);
		const closebutton = screen.getByTestId("spyModal-close-button");
		fireEvent.click(closebutton);
	});

	it("should handle tmp branch with detail modal", () => {
		render(closetItemTmp);
		const imgbutton = screen.getByTestId("clothimg");
		fireEvent.click(imgbutton);
		const closebutton = screen.getByTestId("spyModal-close-button");
		fireEvent.click(closebutton);
	});

	it("should handle tmp branch", () => {
		render(closetItemTmp);
		const imgbutton = screen.getByTestId("clothimg");
		fireEvent.click(imgbutton);
		const closebutton = screen.getByTestId("modal-close-button");
		fireEvent.click(closebutton);
	});
});
