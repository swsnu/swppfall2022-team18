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
	it("should render Not userHave clothes with undefined props", () => {
		render(
			<SampleClothModal
				userHave={false}
				userCloth_url={undefined}
				sampleCloth_url={undefined}
				type={undefined}
				color={undefined}
				pattern={undefined}
				sampleCloth_name={undefined}
				sampleCloth_link={undefined}
			></SampleClothModal>
		);
		const purchaseButton = screen.getByText("Purchase Button");
		fireEvent.click(purchaseButton);
		expect(mockNavigate).toHaveBeenCalled();
		screen.getAllByText('샘플 이미지가 없습니다.')
		screen.getAllByText('유저 옷 이미지가 없습니다.')
		screen.getAllByText('샘플 이름이 없습니다.')
		screen.getAllByText('Type : 옷 타입을 정의할 수 없습니다.')
		screen.getAllByText('Color : 옷 색상을 정의할 수 없습니다.')
		screen.getAllByText('Pattern : 옷 패턴을 정의할 수 없습니다.')
	});
	it("should render userHave clothes with undefined props", () => {
		render(
			<SampleClothModal
				userHave={true}
				userCloth_url={undefined}
				sampleCloth_url={undefined}
				type={undefined}
				color={undefined}
				pattern={undefined}
				sampleCloth_name={undefined}
				sampleCloth_link={undefined}
			></SampleClothModal>
		);
		const purchaseButton = screen.getByText("Purchase Button");
		fireEvent.click(purchaseButton);
		expect(mockNavigate).toHaveBeenCalled();
		screen.getAllByText('샘플 이미지가 없습니다.')
		screen.getAllByText('유저 옷 이미지가 없습니다.')
		screen.getAllByText('샘플 이름이 없습니다.')
		screen.getAllByText('Type : 옷 타입을 정의할 수 없습니다.')
		screen.getAllByText('Color : 옷 색상을 정의할 수 없습니다.')
		screen.getAllByText('Pattern : 옷 패턴을 정의할 수 없습니다.')
	});
});
