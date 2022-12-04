import { fireEvent,  screen } from "@testing-library/react";
// import { useNavigate } from "react-router-dom";
// import { Provider } from "react-redux";
import { renderWithProviders } from "../../test-utils/mocks";
// import { MemoryRouter, Route, Routes } from "react-router-dom";
import AddClothModal from './AddClothModal';
// import {store} from '../../store'
import axios from "axios";
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

describe("<AddClothModal />", () => {

    it("should send post request", async () => {
        jest.spyOn(axios, "post").mockResolvedValueOnce({
            data: {
                name: "test_name",
                // image_id: 1,
                type: "test_type",
                color: "test_color",
                pattern: "test_pattern",
            },
        });
        renderWithProviders(<AddClothModal modal_close={()=>{console.log("something")}} />);

        const UploadClothDiv = screen.getByTestId("UploadClothDiv");
        expect(UploadClothDiv.classList.contains("fileImage")).toBe(false);

        const nameInput = screen.getByTestId("cloth-info-input-name");
        const typeInput = screen.getByTestId("cloth-info-input-type");
        const colorInput = screen.getByTestId("cloth-info-input-color");
        const patternInput = screen.getByTestId("cloth-info-input-pattern");
        const addClothButton = screen.getByTestId("create-cloth-button");

        fireEvent.change(nameInput, { target: { value: "test_name" } });
        fireEvent.change(typeInput, { target: { value: "test_type" } });
        fireEvent.change(colorInput, { target: { value: "test_color" } });
        fireEvent.change(patternInput, { target: { value: "test_pattern" } });

        await screen.findByDisplayValue("test_name");
        await screen.findByDisplayValue("test_type");
        await screen.findByDisplayValue("test_color");
        await screen.findByDisplayValue("test_pattern");
        fireEvent.click(addClothButton);
        // await waitFor(() => expect(mockNavigate).toHaveBeenCalled());
    });
})

/* */

// describe("should upload image file", () => {

//     let file: File;
    
//     beforeEach(() => {
//         file = new File(["(⌐□_□)"], "testClothImage.png", { type: "image/png" });
//     });
    
//     test("test photo upload", async () => {
//         let uploadButton = screen.getByTestId("upload-cloth-button");
    
//         await waitFor(() =>
//             fireEvent.change(uploadButton, {
//                 target: { files: [file] },
//             })
//         );

//         // // let image = res.container.querySelector("#upload-cloth-button")
//         // let image = document.getElementById("UploadedClothPreviewDiv");
//         // // console.log(image)

//         // expect(image?.files[0].name).toBe("testClothImage.png");
//         // expect(image?.files.length).toBe(1);
//     });
// });