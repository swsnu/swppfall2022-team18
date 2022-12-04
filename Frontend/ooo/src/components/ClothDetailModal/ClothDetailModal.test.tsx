import { fireEvent, render, screen } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
// import { renderWithProviders } from "../../test-utils/mocks";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ClothDetailModal from './ClothDetailModal';
import {store} from '../../store'
import React from "react";

const mockNavigate = jest.fn()
jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
   useNavigate: () => mockNavigate,
}));

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => mockDispatch,
}));

describe("<ClothDetaillModal />", () => {
    let clothdetailmodal: JSX.Element;
    beforeEach(() => {
        jest.clearAllMocks();
        clothdetailmodal = (
            <Provider store={store}>
                <MemoryRouter>
                    <Routes>
                        {/* <Route path="/" element={<ClothDetailModal />} /> */}
                        <Route
                            path="/"
                            element={
                                <ClothDetailModal
                                    id="1"
                                    image="test"
                                    weardate="2022-11-04"
                                    metatype="아우터"
                                    type="트러커 재킷"
                                    color="그레이"
                                    pattern="None"
                                    modal_close={()=>{console.log("something")}}
                                />
                            }
                        />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
    });

    it("should render without errors",()=>{
        render(clothdetailmodal);

        screen.getByText("종류");
        screen.getByText("색상");
        screen.getByText("무늬");

        const moverecommendbutton = screen.getByText("Get Recommendation");
        fireEvent.click(moverecommendbutton)
        expect(mockNavigate).toHaveBeenCalledTimes(1);
    });
})