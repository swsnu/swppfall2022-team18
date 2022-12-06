import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
// import { renderWithProviders } from "../../test-utils/mocks";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ClothDetailModal from "./ClothDetailModal";
import { store } from "../../store";
import React from "react";
import { IProps as TypeFilterProps } from "../TypeFilter/TypeFilter";
import { json } from "node:stream/consumers";
// import { ReactDatePickerProps as DatePickerProps } from "react-datepicker";

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

// jest.mock(
// 	"react-datepicker",
// 	// eslint-disable-next-line react/display-name
// 	() => (props: DatePickerProps) =>
// 		<div className="SpyDatePicker">DatePicker</div>
// );

{
	/* <DatePicker
dateFormat="yyyy/MM/dd"
highlightDates={highlightDates}
selected={wearDate}
onChange={(clickedDate: any) => setWearDateHandler(clickedDate)}
inline
/> */
}

describe("<ClothDetaillModal />", () => {
	let clothdetailmodal: JSX.Element;
	beforeEach(() => {
		jest.clearAllMocks();
		clothdetailmodal = (
			<Provider store={store}>
				<MemoryRouter>
					<Routes>
						<Route
							path="/"
							element={
								<ClothDetailModal
									id="1"
									image="test"
									weardate={"2022-11-04"}
									metatype="아우터"
									type="트러커 재킷"
									color="그레이"
									pattern="None"
									modal_close={() => {
										console.log("something");
									}}
								/>
							}
						/>
					</Routes>
				</MemoryRouter>
			</Provider>
		);
	});
	it("should render without errors", () => {
		// render(clothdetailmodal);
		// screen.getByText("종류");
		// screen.getByText("색상");
		// screen.getByText("무늬");
		// const moverecommendbutton = screen.getByText("Get Recommendation");
		// fireEvent.click(moverecommendbutton);
		// expect(mockNavigate).toHaveBeenCalledTimes(1);
	});
});
