import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route} from 'react-router-dom';
import { getMockStore } from '../../test-utils/mocks';
import OutfitDetail from "./OutfitDetail"
import { Provider } from "react-redux";
import { UserClothState } from "../../store/slices/userCloth";
import { OutfitState } from "../../store/slices/outfit";
import axios from "axios";
import React from "react";
import { IProps as HeaderProps } from "../../components/Header/Header";

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
		{id: 1, name:"", image_link:"", outfit:1, color:"black", type:"shirt", pattern:"no", purchase_link:""},
        {id: 2, name:"", image_link:"", outfit:1, color:"black", type:"shirt", pattern:"no", purchase_link:""}
	],
	sampleCloth: null,
	userCloth: null,
	cursor: 0,
	isLast: false,
};



const stubInitialUserClothState: UserClothState = {
	userClothes: [
		{id: 1, name:"", image_link:"", color:"black", type:"shirt", pattern:"no", dates:"test"}
	],
	selectedUserCloth: null,
	recommendOutfit: {
		id: 1,
		outfit_info: "",
		popularity: 1,
		image_link: "",
		userclothes: [
			{id: 1, name:"", image_link:"", color:"black", type:"shirt", pattern:"no",  dates:"test"}
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
	useNavigate : () => mockNavigate,
}))
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => mockDispatch,
}));



describe("<OutfitDetail/>", () => {

    let outfitdetail: JSX.Element;
	beforeEach(() => {
		jest.clearAllMocks();
		outfitdetail = (
			<Provider store={mockStore}>
				<MemoryRouter>
					<Routes>
						<Route path="/" element={<OutfitDetail />} />
					</Routes>
				</MemoryRouter>
			</Provider>
		);
	});

	it("should render without errors", () => {
		render(outfitdetail);
	});

    it("should handle clickHeaderHandler", () => {
        render(outfitdetail);
        const appNameText = screen.getByText("oOo")
        fireEvent.click(appNameText);
        expect(mockNavigate).toHaveBeenCalled()
    })

    it("should handle clickInfoHandler", () => {
        render(outfitdetail);
        const appNameText = screen.getByText("내 정보")
        fireEvent.click(appNameText);
        expect(mockNavigate).toHaveBeenCalled()
    })

    it("should handle clickLogoutHandler", () => {
        render(outfitdetail);
        const appNameText = screen.getByText("로그아웃")
        fireEvent.click(appNameText);   
    })

    it("should handle purchaseButtonHandler", async () => {
		render(outfitdetail);
		const purchaseButton = screen.getByTestId("outfit-purchase-button")
		fireEvent.click(purchaseButton);
		await waitFor(() => expect(mockNavigate).toHaveBeenCalled())
	});

    it("should close modal", () => {
        render(outfitdetail);
        const clothImages = screen.getAllByTestId("samplecloth-image")
        fireEvent.click(clothImages[0]);
        const closeButton = screen.getByTestId("modal-close-button")
        fireEvent.click(closeButton)
    })

    it("should handle clickClothHandler", async() => {
        jest.spyOn(axios, "get").mockImplementation((url) => {
            if (url == '/api/ooo/outfit/samplecloth/1/'){
                return Promise.resolve({data: {
                    usercloth:{id: 1, name:"", image_link:"", user:1, color:"black", type:"shirt", pattern:"no"},
                    sampleclothes:[
                        {id: 1, name:"", image_link:"", outfit:1, color:"black", type:"shirt", pattern:"no", purchase_link:""}
                    ],
                },
                status: 200})
            }
            else{
                return Promise.resolve({data: {
                    outfit:{
                        id: 1,
                        outfit_info: "",
                        outfit_name: "",
                        popularity: 1,
                        image_link: "",
                        purchase_link: "",
                    },
                    sampleclothes:{id: 1, name:"", image_link:"", outfit:1, color:"black", type:"shirt", pattern:"no", purchase_link:""}
                },
                status: 200})
            }
        })
        render(outfitdetail);
        const clothImages = screen.getAllByTestId("samplecloth-image")
        fireEvent.click(clothImages[0]);
        await screen.findByTestId("modal-close-button")
    })

    

    
});

