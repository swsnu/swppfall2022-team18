import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { getMockStore } from "../../test-utils/mocks";
import SampleClothModal from "./SampleClothModal";
import React from "react";

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
	...jest.requireActual("react-router"),
	useNavigate: () => mockNavigate,
}));

describe("<SampleClothModal/>", () => {
	it("should render userHave clothes without errors", () => {
		render(
			<SampleClothModal
				userHave={true}
				userCloth_url="userCloth_url"
				sampleCloth_url="sampleCloth_url"
				type="testType"
				color="testColor"
				pattern="testPattern"
				sampleCloth_name="testName"
				sampleCloth_link="TestLink"
			></SampleClothModal>
		);
	});

	it("should handle purchase link button", () => {
		render(
			<SampleClothModal
				userHave={true}
				userCloth_url="userCloth_url"
				sampleCloth_url="sampleCloth_url"
				type="testType"
				color="testColor"
				pattern="testPattern"
				sampleCloth_name="testName"
				sampleCloth_link="TestLink"
			></SampleClothModal>
		);
		const purchaseButton = screen.getByText("Purchase Button");
		fireEvent.click(purchaseButton);
		expect(mockNavigate).toHaveBeenCalled();
	});

	it("should render Not userHave clothes without errors", () => {
		render(
			<SampleClothModal
				userHave={false}
				userCloth_url="userCloth_url"
				sampleCloth_url="sampleCloth_url"
				type="testType"
				color="testColor"
				pattern="testPattern"
				sampleCloth_name="testName"
				sampleCloth_link="TestLink"
			></SampleClothModal>
		);
		const purchaseButton = screen.getByText("Purchase Button");
		fireEvent.click(purchaseButton);
		expect(mockNavigate).toHaveBeenCalled();
	});
});
