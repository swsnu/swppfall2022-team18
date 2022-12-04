import { fireEvent, render, screen } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import OutfitPreview from './OutfitPreview';
import React from "react";

const mockNavigate = jest.fn()
jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
   useNavigate: () => mockNavigate,
   }));

describe("<OutfitPreview />",()=>{
    it("should render without errors",()=>{
        render(<OutfitPreview 
            source_url="https://image.msscdn.net/images/style/detail/8679/detail_8679_1_500.jpg"
            info="트러커 재킷과 스트라이프 패턴 티셔츠를 코디하고 데님 팬츠로 심플하게 연출한 캠퍼스 룩"
            clickOutfitDetail={mockNavigate}/>);
        screen.findByText("옷1");
        screen.findByText("옷2");
        screen.findByText("트러커 재킷과 스트라이프 패턴 티셔츠를 코디하고 데님 팬츠로 심플하게 연출한 캠퍼스 룩");
        screen.findByTestId("outfit-img");
        const button = screen.getAllByTestId("outfit-img")[0];
        fireEvent.click(button)
        expect(mockNavigate).toHaveBeenCalledTimes(1);
    })
})