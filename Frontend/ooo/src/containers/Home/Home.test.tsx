import { fireEvent, render, screen } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import { renderWithProviders } from "../../test-utils/mocks";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Home from './Home';
import {store} from '../../store'
import { IProps as HeaderProps } from "../../components/Header/Header";
import { IProps as OutfitPreviewProps } from "../../components/OutfitPreview/OutfitPreview";
import { IProps as ClosetItemProps } from "../../components/ClosetItem/ClosetItem";

jest.mock("../../components/Header/Header", () => (props: HeaderProps) => (
    <div data-testid="spyHeader">
            <div className="headerText" data-testid = 'logo' onClick={props.clickHeaderHandler}>
                <text id='appName'>oOo</text>
                <text id='detailAppName'>:recommend your outfit</text>
            </div>
            <div className="headerButton">
                <button id='infoButton' data-testid='info' onClick={props.clickInfoHandler}>내 정보</button>
                <button id='logoutButton' data-testid = 'logout' onClick={props.clickLogoutHandler}>로그아웃</button>
            </div>
        </div>
    ));

jest.mock("../../components/OutfitPreview/OutfitPreview", () => (props: OutfitPreviewProps) => (
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
				<text id="outfit-info-text"
                data-testid = 'outfit-info'>{props.info}</text>
				{props.cloth_names.map((cloth_name: string, index) => {
					return (
						<text key={index} id="cloth-name" data-testid='cloth-name'>
							{cloth_name}
						</text>
					);
				})}
			</div>
		</div>
    ));

jest.mock("../../components/ClosetItem/ClosetItem", () => (props: ClosetItemProps) => (
    <div data-testid = "spyClosetItem">
			<div className="ClothImage" data-testid = 'clothimg' onClick={props.clickClothDetailPopupHandler}>
				<img data-testid = 'cloth-img' id="cloth-img" src={props.source_url}></img>
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
    ));

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

describe("<Home />",()=>{
    
    let home: JSX.Element;
    beforeEach(() => {
     jest.clearAllMocks();
     home = (
     <Provider store={store}>
     <MemoryRouter>
     <Routes>
     <Route path="/" element={<Home />} />
     </Routes>
     </MemoryRouter>
     </Provider>
     );
     });

    it("should render without errors",()=>{
        render(home);
        const header = screen.getAllByTestId("Header");
        expect(header).toHaveLength(1);
        const logobutton = screen.getAllByTestId("logo")[0];
        screen.findByText("oOo")
        fireEvent.click(logobutton)
        expect(mockNavigate).toHaveBeenCalledTimes(1);

        const infobutton = screen.getAllByTestId("info")[0];
        fireEvent.click(infobutton)
        expect(mockNavigate).toHaveBeenCalledTimes(2);

        const logoutbutton = screen.getAllByTestId("logout")[0];
        fireEvent.click(logoutbutton)
        //expect(mockDispatch).toHaveBeenCalledTimes(1);
    
        const outfitpreviews = screen.getAllByTestId("OutfitPreview");
        expect(outfitpreviews).toHaveLength(1);
        
        const closetitems = screen.getAllByTestId("ClosetItem");
        expect(closetitems).toHaveLength(1);
        fireEvent.click(screen.getAllByTestId('clothimg')[0]);
        screen.findByTestId("outfit-img");
        screen.findAllByTestId("outfit-img");
        const todayOutfit = screen.getAllByTestId('TodayOutfit');
        expect(todayOutfit).toHaveLength(1);
        screen.findAllByTestId('wear-button');
        screen.findAllByTestId('today-outfit-img');
        
        const todayOutfitlable = screen.getAllByTestId('TodayOutfit-lable');
        const morebutton = screen.getAllByText('More');
        expect(morebutton).toHaveLength(2);
        const morebtn = screen.getAllByTestId("more-btn");
        expect(morebtn).toHaveLength(2);
        fireEvent.click(morebtn[0]);
        expect(mockNavigate).toHaveBeenCalledTimes(3);
        fireEvent.click(morebtn[1]);
        expect(mockNavigate).toHaveBeenCalledTimes(4);
        });
})