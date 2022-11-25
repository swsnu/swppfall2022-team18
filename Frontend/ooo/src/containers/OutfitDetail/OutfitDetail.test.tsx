import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { getMockStore, renderWithProviders } from '../../test-utils/mocks'
import OutfitDetail from "./OutfitDetail"
import axios from "axios";
import React from "react";
import { IProps } from "../../components/Header/Header";

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
	it("should render without errors", () => {
		render(<OutfitDetail></OutfitDetail>);
	});

    it("should handle purchaseButtonHandler", async () => {
		render(<OutfitDetail></OutfitDetail>);
		const purchaseButton = screen.getByTestId("outfit-purchase-button")
		fireEvent.click(purchaseButton);
		await waitFor(() => expect(mockNavigate).toHaveBeenCalled())
	});

    it("should handle clickClothHandler", () => {
        render(<OutfitDetail></OutfitDetail>);
        const clothImages = screen.getAllByTestId("samplecloth-image")
        fireEvent.click(clothImages[0]);
    })

    it("should handle clickClothHandler_temp", () => {
        render(<OutfitDetail></OutfitDetail>);
        const clothImages = screen.getAllByTestId("samplecloth-image")
        fireEvent.click(clothImages[1]);
    })

    it("should close modal", () => {
        render(<OutfitDetail></OutfitDetail>);
        const clothImages = screen.getAllByTestId("samplecloth-image")
        fireEvent.click(clothImages[0]);
        const closeButton = screen.getByTestId("modal-close-button")
        fireEvent.click(closeButton)
    })

    it("should handle clickHeaderHandler", () => {
        render(<OutfitDetail></OutfitDetail>);
        const appNameText = screen.getByText("oOo")
        fireEvent.click(appNameText);
        expect(mockNavigate).toHaveBeenCalled()
    })

    it("should handle clickInfoHandler", () => {
        render(<OutfitDetail></OutfitDetail>);
        const appNameText = screen.getByText("내 정보")
        fireEvent.click(appNameText);
        expect(mockNavigate).toHaveBeenCalled()
    })

    it("should handle clickLogoutHandler", () => {
        render(<OutfitDetail></OutfitDetail>);
        const appNameText = screen.getByText("로그아웃")
        fireEvent.click(appNameText);   
    })
});

