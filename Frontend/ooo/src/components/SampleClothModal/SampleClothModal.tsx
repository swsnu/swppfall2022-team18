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
		navigate("/Redirect", { state: { url: props.sampleCloth_link } });
	};

	if (props.userHave) {
		return (
			<div className="SampleClothModal">
				<div id="samplecloth-title">Clothes Data</div>
				<div className="Body">
					<div className="sampleDiv">
						<img className="sample-image" src={props.sampleCloth_url}></img>
						<div id="sample-image-title">코디 이미지</div>
					</div>
					<div className="userDiv">
						<img className="user-image" src={props.userCloth_url}></img>
						<div id="user-image-title">유저 이미지</div>
					</div>
					<div className="DataDiv">
						<button
							id="purchase-button"
							onClick={() => clickPurchaseButtonHander()}
						>
							Purchase Button
						</button>
						<div id="cloth-name">{props.sampleCloth_name}</div>
						<div className="ClothTags">
							<div id="cloth-type">Type : {props.type}</div>
							<div id="cloth-color">Color : {props.color}</div>
							<div id="cloth-pattern">Pattern : {props.pattern}</div>
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="SampleClothModal">
				<div id="samplecloth-title">Clothes Data</div>
				<div className="Body">
					<div className="sampleDiv">
						<img className="sample-image" src={props.sampleCloth_url}></img>
						<div id="sample-image-title">코디 이미지</div>
					</div>
					<div className="DataDiv">
						<button
							id="purchase-button"
							onClick={() => clickPurchaseButtonHander()}
						>
							Purchase Button
						</button>
						<div id="cloth-name">{props.sampleCloth_name}</div>
						<div className="ClothTags">
							<div id="cloth-type">Type : {props.type}</div>
							<div id="cloth-color">Color : {props.color}</div>
							<div id="cloth-pattern">Pattern : {props.pattern}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default SampleClothModal;
