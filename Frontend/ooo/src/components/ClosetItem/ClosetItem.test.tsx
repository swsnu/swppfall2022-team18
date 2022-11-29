import { fireEvent, getByTestId, getByText, render, screen } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import ClosetItem from './ClosetItem';
import Modal from 'react-modal';

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

describe("<ClosetItem />",()=>{
    it("should render without errors",()=>{
        const clickClothDetailPopupHandler = jest.fn();
        let clothDetailModalOpen = false;
        const setClothDetailModalOpen = jest.fn(()=>{!clothDetailModalOpen});
        render(<ClosetItem 
            user_cloth_id="1"
            source_url="https://image.msscdn.net/images/goods_img/20190228/969580/969580_1_500.jpg?t=20190228191158"
            weardate="2022-11-04"
            metatype='아우터'
            type='트러커 재킷'
            color="그레이"
            pattern="None"
            clickClothDetailPopupHandler={clickClothDetailPopupHandler}
        />);
        //render(<Modal isOpen={clothDetailModalOpen} onRequestClose={setClothDetailModalOpen}></Modal>);
        screen.findByTestId("cloth-img");
        screen.findByText("종류");
        screen.findByText("트러커 재킷");
        screen.findByText("색상");
        screen.findByText("그레이");
        screen.findByText("무늬");
        screen.findByText("None");
        const imgbutton = screen.getAllByTestId("clothimg")[0];
        fireEvent.click(imgbutton)
        const closebutton =screen.getAllByTestId("modal-close-button")[0];
        fireEvent.click(closebutton)

    })
})