import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { getMockStore, renderWithProviders } from '../../test-utils/mocks'
import Login from "./Login"
import axios from "axios";
import React from "react";


const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
	...jest.requireActual("react-router"),
	useNavigate : () => mockNavigate,
}))


describe("<Login/>", () => {
	it("should render without errors", () => {
		render(<Login></Login>);
	});
	it("should handle postLoginHandler", async () => {
		jest.spyOn(axios, "post").mockResolvedValue({
			data: {},
		});
		
		render(<Login></Login>);
		const usernameInput = screen.getByTestId("username-input");
		const pwInput = screen.getByTestId("pw-input");
		const loginButon = screen.getByTestId("login-button-test");
		fireEvent.change(usernameInput, { target: { value: "test" } });
		fireEvent.change(pwInput, { target: { value: "wjdwodud!6" } });
		await screen.findByDisplayValue("test");
		await screen.findByDisplayValue("wjdwodud!6");
		fireEvent.click(loginButon);
		await waitFor(() => expect(mockNavigate).toHaveBeenCalled())
	});

	it("should handle postLoginHandler is failed", async () => {
		render(<Login></Login>);
		const loginButon = screen.getByTestId("login-button-test");
		fireEvent.click(loginButon);
		screen.getByTestId("wrong-text");
	})

	it("should handle redirect", async () => {
		window.localStorage.getItem = jest.fn()
		jest.spyOn(window.localStorage, 'getItem').mockReturnValue("notnull")
		await waitFor(() => expect(mockNavigate).toHaveBeenCalled())
	})
});
