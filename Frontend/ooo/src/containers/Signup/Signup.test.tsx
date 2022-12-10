import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Signup from "./Signup"
import axios from "axios";
import React from "react";


const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
	...jest.requireActual("react-router"),
	Navigate: (props: any) => {
		mockNavigate(props.to);
		return null;
	},
	useNavigate : () => mockNavigate,
}))

describe("<Signup/>", () => {
	it("should render without errors", () => {
		render(<Signup></Signup>);
	});
	it("should handle postSignupHandler", async () => {
		jest.spyOn(axios, "post").mockResolvedValue({
			data: { username: "test" },
		});
		jest.spyOn(window, "alert").mockImplementation(() => {''});

		render(<Signup></Signup>);
		const usernameInput = screen.getByTestId("username-input");
		const pwInput = screen.getByTestId("pw-input");
        const checkPwInput = screen.getByTestId("checkpw-input");
		const signupButon = screen.getByTestId("signup-button");
		fireEvent.change(usernameInput, { target: { value: "test" } });
		fireEvent.change(pwInput, { target: { value: "1111" } });
        fireEvent.change(checkPwInput, { target: { value: "1111"}})
		await screen.findByDisplayValue("test");
		await screen.findAllByDisplayValue("1111");
		fireEvent.click(signupButon);
		await waitFor(() => expect(window.alert).toBeCalledWith('회원가입이 완료되었습니다.'));
		await waitFor(() => expect(mockNavigate).toHaveBeenCalled());
	});

	it("should handle postSignupHandler is failed by empty error", async () => {
		render(<Signup></Signup>);
        const usernameInput = screen.getByTestId("username-input");
		const pwInput = screen.getByTestId("pw-input");
        const checkPwInput = screen.getByTestId("checkpw-input");
		const SignupButon = screen.getByTestId("signup-button");
        fireEvent.click(SignupButon);

        fireEvent.change(usernameInput, { target: { value: "test" } });
        fireEvent.change(pwInput, { target: { value: "1111" } });
        fireEvent.change(checkPwInput, { target: { value: "1211"}})
        await screen.findByDisplayValue("test");
        await screen.findByDisplayValue("1111");
        await screen.findByDisplayValue("1211");
		fireEvent.click(SignupButon);
	});

    it("should handle poseSignuHandler is failed due to duplicate id", async() => {
        const mockConsoleError = jest.fn()
        const err = new Error("error!")
		console.error = mockConsoleError
        jest.spyOn(axios, "post").mockRejectedValueOnce(err)
        render(<Signup></Signup>)

        const usernameInput = screen.getByTestId("username-input");
		const pwInput = screen.getByTestId("pw-input");
        const checkPwInput = screen.getByTestId("checkpw-input");
		const signupButon = screen.getByTestId("signup-button");
		fireEvent.change(usernameInput, { target: { value: "test" } });
		fireEvent.change(pwInput, { target: { value: "1111" } });
        fireEvent.change(checkPwInput, { target: { value: "1111"}})
		await screen.findByDisplayValue("test");
		await screen.findAllByDisplayValue("1111");
		fireEvent.click(signupButon);
    })

});
