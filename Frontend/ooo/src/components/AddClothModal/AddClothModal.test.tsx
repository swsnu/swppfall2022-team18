import { fireEvent, render, screen } from "@testing-library/react";
// import { useNavigate } from "react-router-dom";
// import { Provider } from "react-redux";
import { renderWithProviders } from "../../test-utils/mocks";
// import { MemoryRouter, Route, Routes } from "react-router-dom";
import AddClothModal from "./AddClothModal";
// import {store} from '../../store'
import axios from "axios";
import React from "react";
import { IProps as TypeFilterProps } from "../TypeFilter/TypeFilter";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { store } from "../../store";
import userEvent from "@testing-library/user-event";
import { classifyColor } from "../../store/slices/userCloth";
import "jest-canvas-mock";

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
	...jest.requireActual("react-router"),
	useNavigate: () => mockNavigate,
}));

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
	...jest.requireActual("react-redux"),
	useDispatch: () => mockDispatch,
}));

jest.mock(
	"../TypeFilter/TypeFilter",
	// eslint-disable-next-line react/display-name
	() => (props: TypeFilterProps) =>
		(
			<div className="SpyFilterModal">
				<button
					id="done-button"
					data-testid="typefilter-done-button"
					onClick={() => props.selectHandler("상의 종류")}
				>
					Done
				</button>
				<button
					id="extra-done-button"
					data-testid="typefilter-extra-done-button"
					onClick={() => props.selectHandler("반소매 티셔츠")}
				>
					Extra Done
				</button>
			</div>
		)
);

interface MockGithubPickerProps {
	color: string[];
	colors: string[];
	onChange: (selectedColor: string) => void;
}

jest.mock("react-color/lib/components/github/Github", () => {
	// Create a mocked version of the GithubPicker component
	const MockGithubPicker = (props: MockGithubPickerProps) => (
		<div data-testid="mockGitPicker" onClick={() => props.onChange("#0e0e0e")}>
			Mock GithubPicker
		</div>
	);

	return MockGithubPicker;
});

describe("<AddClothModal />", () => {
	let addClothModal: JSX.Element;
	const mockclickAddClothDoneHandler = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		addClothModal = (
			<Provider store={store}>
				<MemoryRouter>
					<Routes>
						<Route
							path="/"
							element={
								<AddClothModal modal_close={mockclickAddClothDoneHandler} />
							}
						/>
					</Routes>
				</MemoryRouter>
			</Provider>
		);
		global.URL.createObjectURL = jest.fn(() => "mockURL");
	});

	it("should render without errors", () => {
		render(addClothModal);
	});

	it("should handle metaTypeOptionHandler", () => {
		render(addClothModal);
		const selectElement = screen.getAllByRole("combobox", {})[0];
		userEvent.selectOptions(selectElement, "상의");
		const defaultOption = screen.getByRole("option", {
			name: "옷 종류",
		}) as HTMLOptionElement;
		const selectedOption = screen.getByRole("option", {
			name: "상의",
		}) as HTMLOptionElement;
		fireEvent.click(selectedOption);
		expect(defaultOption.selected).toBeFalsy();
		expect(selectedOption.selected).toBeTruthy();
	});

	it("should handle metaTypeOptionHandler branch", () => {
		render(addClothModal);
		const selectElement = screen.getAllByRole("combobox", {})[0];
		userEvent.selectOptions(selectElement, "옷 종류");
		const defaultOption = screen.getByRole("option", {
			name: "옷 종류",
		}) as HTMLOptionElement;
		expect(defaultOption.selected).toBeTruthy();
	});

	it("should handle ColorHandler", () => {
		render(addClothModal);
		const GithubPicker = screen.getByTestId("mockGitPicker");
		fireEvent.click(GithubPicker);
	});

	it("should handle PatternOptionHandler", () => {
		render(addClothModal);
		const selectElement = screen.getAllByRole("combobox", {})[1];
		userEvent.selectOptions(selectElement, "None");
		const defaultOption = screen.getByRole("option", {
			name: "패턴 종류",
		}) as HTMLOptionElement;
		const selectedOption = screen.getByRole("option", {
			name: "None",
		}) as HTMLOptionElement;
		fireEvent.click(selectedOption);
		expect(defaultOption.selected).toBeFalsy();
		expect(selectedOption.selected).toBeTruthy();
		fireEvent.click(defaultOption);
	});
	it("should handle PatternOptionHandler branch", () => {
		render(addClothModal);
		const selectElement = screen.getAllByRole("combobox", {})[1];
		userEvent.selectOptions(selectElement, "패턴 종류");
		const defaultOption = screen.getByRole("option", {
			name: "패턴 종류",
		}) as HTMLOptionElement;
		expect(defaultOption.selected).toBeTruthy();
	});

	it("should handle typeFilter", () => {
		render(addClothModal);
		const typeFilterDoneButton = screen.getByTestId("typefilter-done-button");
		fireEvent.click(typeFilterDoneButton);

		const typeFilterExtraDoneButton = screen.getByTestId(
			"typefilter-extra-done-button"
		);
		fireEvent.click(typeFilterExtraDoneButton);
	});

	it("should handle post image", () => {
		global.URL.createObjectURL = jest.fn(() => "details");
		mockDispatch.mockResolvedValue({ payload: { color: "testcolor" } });
		render(addClothModal);
		const imageUploadButton = screen.getByTestId("upload-cloth-button");
		const createClothButton = screen.getByTestId("create-cloth-button");
		fireEvent.click(createClothButton);
		const file = new File(["(⌐□_□)"], "testClothImage.png", {
			type: "image/png",
		});
		// const objectUrl = URL.createObjectURL(file);
		fireEvent.change(imageUploadButton, {
			target: { files: [file] },
		});
		fireEvent.click(createClothButton);

		const selectMetaElement = screen.getAllByRole("combobox", {})[0];
		userEvent.selectOptions(selectMetaElement, "상의");
		const defaultMetaOption = screen.getByRole("option", {
			name: "옷 종류",
		}) as HTMLOptionElement;
		const selectedMetaOption = screen.getByRole("option", {
			name: "상의",
		}) as HTMLOptionElement;
		fireEvent.click(selectedMetaOption);

		const typeFilterExtraDoneButton = screen.getByTestId(
			"typefilter-extra-done-button"
		);
		fireEvent.click(typeFilterExtraDoneButton);

		const selectElement = screen.getAllByRole("combobox", {})[1];
		userEvent.selectOptions(selectElement, "None");
		const defaultOption = screen.getByRole("option", {
			name: "패턴 종류",
		}) as HTMLOptionElement;
		const selectedOption = screen.getByRole("option", {
			name: "None",
		}) as HTMLOptionElement;
		fireEvent.click(selectedOption);

		const GithubPicker = screen.getByTestId("mockGitPicker");
		fireEvent.click(GithubPicker);

		fireEvent.click(createClothButton);

		// // let image = res.container.querySelector("#upload-cloth-button")
		// let image = document.getElementById("UploadedClothPreviewDiv");
		// // console.log(image)

		// expect(image?.files[0].name).toBe("testClothImage.png");
		// expect(image?.files.length).toBe(1);
	});
});

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
