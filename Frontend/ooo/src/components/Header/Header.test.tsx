import { fireEvent, render, screen } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import Header from './Header'
import React from "react";

const mockNavigate = jest.fn()
jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
   useNavigate: () => mockNavigate,
   }));

describe("<Header />",()=>{
    it("should render clickHeaderHandler without errors",()=>{
        render(<Header clickHeaderHandler={mockNavigate}
        clickInfoHandler={mockNavigate}
        clickLogoutHandler={mockNavigate}/>);
        const logobutton = screen.getAllByTestId("logo")[0];
        fireEvent.click(logobutton)
        expect(mockNavigate).toHaveBeenCalledTimes(1);
    })
    it("should render clicklogoutHandler without errors",()=>{
        render(<Header clickHeaderHandler={mockNavigate}
        clickInfoHandler={mockNavigate}
        clickLogoutHandler={mockNavigate}/>);
        const logoutbutton = screen.getAllByTestId("logout")[0];
        fireEvent.click(logoutbutton)
        //expect(mockNavigate).toHaveBeenCalledTimes(1);
    })
    it("should render clickinfoHandler without errors",()=>{
        render(<Header clickHeaderHandler={mockNavigate}
        clickInfoHandler={mockNavigate}
        clickLogoutHandler={mockNavigate}/>);
        const infobutton = screen.getAllByTestId("info")[0];
        fireEvent.click(infobutton)
        expect(mockNavigate).toHaveBeenCalledTimes(1);
    })
})