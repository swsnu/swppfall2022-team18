import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { getMockStore, renderWithProviders } from '../../test-utils/mocks'
import { Provider } from "react-redux";
import Setting from "./Setting"
import axios from "axios";
import React from "react";
import { store } from "../../store";
import { IProps as HeaderProps } from "../../components/Header/Header";

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

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
	...jest.requireActual("react-router"),
	Navigate: (props: any) => {
		mockNavigate(props.to);
		return null;
	},
	useNavigate : () => mockNavigate,
}))

describe("<Setting/>", () => {
    let setting: JSX.Element;
	beforeEach(() => {
		jest.clearAllMocks();
		setting = (
			<Provider store={store}>
				<MemoryRouter>
					<Routes>
						<Route path="/" element={<Setting/>} />
					</Routes>
				</MemoryRouter>
			</Provider>
		);
	});
    it("should render without errors", () => {
		render(setting);
	});

    it("should handle logo", async() => {
        render(setting)
        const logobutton = screen.getByTestId("logo")
        fireEvent.click(logobutton)
        await waitFor(() => expect(mockNavigate).toHaveBeenCalled());
    })

    it("should handle header logout button", async() => {
		render(setting);
		jest.spyOn(axios, "get").mockResolvedValue({
			data: { username: "test" },
		});
		const logoutbutton = screen.getAllByTestId("logout")[0];
		fireEvent.click(logoutbutton);
		await waitFor(() => expect(mockNavigate).toHaveBeenCalled());
	})

	it("should handler info button", () => {
		render(setting);
		const infoButton = screen.getAllByTestId("info")[0];
		fireEvent.click(infoButton);
	})

    it("should handle change password", async() => {
        jest.spyOn(axios, "put").mockResolvedValue({
			data: { username: "test" },
		});

        render(setting);

        const pwInput = screen.getByTestId("password-input");
		const pwCheckInput = screen.getByTestId("password-check-input");
		const okButton = screen.getByTestId("ok");

        fireEvent.click(okButton);
		fireEvent.change(pwInput, { target: { value: "1111" } });
		fireEvent.change(pwCheckInput, { target: { value: "1111" } });
		await screen.findAllByDisplayValue("1111");
		fireEvent.click(okButton);
        await waitFor(() => expect(mockNavigate).toHaveBeenCalled());
    })

    it("should handle not match pw with checkpw", async() => {
        jest.spyOn(axios, "put").mockResolvedValue({
			data: { username: "test" },
		});

        render(setting);
        const pwInput = screen.getByTestId("password-input");
		const pwCheckInput = screen.getByTestId("password-check-input");
		const okButton = screen.getByTestId("ok");
        fireEvent.change(pwInput, { target: { value: "1111" } });
		fireEvent.change(pwCheckInput, { target: { value: "1112" } });
		await screen.findByDisplayValue("1111");
		await screen.findByDisplayValue("1112");
        fireEvent.click(okButton);
    })

    it("should handle error change password", async() => {
        const mockConsoleError = jest.fn()
        console.error = mockConsoleError
        jest.spyOn(axios, "put").mockResolvedValue({
			response: { data: {title: ["error"]} }
		});

        render(setting);

        const pwInput = screen.getByTestId("password-input");
		const pwCheckInput = screen.getByTestId("password-check-input");
		const okButton = screen.getByTestId("ok");

        fireEvent.click(okButton);
		fireEvent.change(pwInput, { target: { value: "1111" } });
        fireEvent.change(pwCheckInput, { target: { value: "1111" } });
		await screen.findAllByDisplayValue("1111");
        fireEvent.click(okButton);
    })


    it("should handel delete", async() => {
        jest.spyOn(axios, "delete").mockResolvedValue({
			data: { username: "test" },
		});
        render(setting);
        const delButton = screen.getByTestId("delete-button");
        fireEvent.click(delButton)
        await waitFor(() => expect(mockNavigate).toHaveBeenCalled());
    })
    it("should handel delete failed", async() => {
        const mockConsoleError = jest.fn()
        console.error = mockConsoleError
        jest.spyOn(axios, "delete").mockResolvedValue({
			response: { data: {title: ["error"]} }
		});
        render(setting);
        const delButton = screen.getByTestId("delete-button");
        fireEvent.click(delButton)
        await waitFor(() => expect(mockNavigate).toHaveBeenCalled());
    })

});
