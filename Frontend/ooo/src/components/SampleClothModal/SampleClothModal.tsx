import "./SampleClothModal.css";
import React from "react";
import { useNavigate } from "react-router-dom";

export interface Iprops {
	userHave: boolean;
	userCloth_url: string;
	sampleCloth_url: string;
	type: string;
	color: string;
	pattern: string;
	sampleCloth_name: string;
	sampleCloth_link: string;
}

const SampleClothModal = (props: Iprops) => {
	const navigate = useNavigate();

	const clickPurchaseButtonHander = () => {
		if (props.sampleCloth_link as string){
			navigate("/Redirect", { state: { url: props.sampleCloth_link } });
		}
		else{
			navigate('*');
		}
	};

	if (props.userHave) {
		return (
			<div className="SampleClothModal">
				<text id="samplecloth-title">Clothes Data</text>
				<div className="Body">
					<div className="sampleDiv">
						<img className="sample-image" src={props.sampleCloth_url} alt='샘플 이미지가 없습니다.'></img>
						<text id="sample-image-title">코디 이미지</text>
					</div>
					<div className="userDiv">
						<img className="user-image" src={props.userCloth_url} alt = '유저 옷 이미지가 없습니다.'></img>
						<text id="user-image-title">유저 이미지</text>
					</div>
					<div className="DataDiv">
						<button
							id="purchase-button"
							onClick={() => clickPurchaseButtonHander()}
						>
							Purchase Button
						</button>
						{
							props.sampleCloth_name?
							<text id="cloth-name">{props.sampleCloth_name}</text>
							:
							<text id = 'cloth-name'>샘플 이름이 없습니다.</text>
						}
						<div className="ClothTags">
						{
							props.type?
							<text id="cloth-type">Type : {props.type}</text>
							:
							<text id="cloth-type">Type : 옷 타입을 정의할 수 없습니다.</text>
						}
						{
							props.color?
							<text id="cloth-color">Color : {props.color}</text>
							:
							<text id="cloth-color">Color : 옷 색상을 정의할 수 없습니다.</text>
						}
						{
							props.pattern?
							<text id="cloth-pattern">Pattern : {props.pattern}</text>
							:
							<text id="cloth-pattern">Pattern : 옷 패턴을 정의할 수 없습니다.</text>
						}
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="SampleClothModal">
				<text id="samplecloth-title">Clothes Data</text>
				<div className="Body">
					<div className="sampleDiv">
						<img className="sample-image" src={props.sampleCloth_url} alt='샘플 이미지가 없습니다.'></img>
						<text id="sample-image-title">코디 이미지</text>
					</div>
					<div className="DataDiv">
						<button
							id="purchase-button"
							onClick={() => clickPurchaseButtonHander()}
						>
							Purchase Button
						</button>
						{
							props.sampleCloth_name?
							<text id="cloth-name">{props.sampleCloth_name}</text>
							:
							<text id = 'cloth-name'>샘플 이름이 없습니다.</text>
						}
						<div className="ClothTags">
						{
							props.type?
							<text id="cloth-type">Type : {props.type}</text>
							:
							<text id="cloth-type">Type : 옷 타입을 정의할 수 없습니다.</text>
						}
						{
							props.color?
							<text id="cloth-color">Color : {props.color}</text>
							:
							<text id="cloth-color">Color : 옷 색상을 정의할 수 없습니다.</text>
						}
						{
							props.pattern?
							<text id="cloth-pattern">Pattern : {props.pattern}</text>
							:
							<text id="cloth-pattern">Pattern : 옷 패턴을 정의할 수 없습니다.</text>
						}
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default SampleClothModal;