import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route} from "react-router-dom"
import Login from './Login'
import axios from 'axios';

describe("<Login/>", () =>{
    it("should render without errors", () => {
        render(<Login></Login>)
    })
    it("should handle postLoginHandler", async() => {
        jest.spyOn(axios, "post").mockResolvedValue({
            data : {}
        })
        render(<Login></Login>)
        const usernameInput = screen.getByTestId('username-input')
        const pwInput = screen.getByRole('pw-input')
        const loginButon = screen.getByTestId('login-button')
        fireEvent.change(usernameInput, { target: { value: "test"}})
        fireEvent.change(pwInput, {target: {value: "wjdwodud!6"}})
        await screen.findByDisplayValue("test")
        await screen.findByDisplayValue("wjdwodud!6")
        fireEvent.click(loginButon)

    })
})