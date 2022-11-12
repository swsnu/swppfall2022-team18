import "./SampleClothModal.css";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import Modal from "react-modal";

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
				<text id="samplecloth-title">Clothes Data</text>
				<div className="Body">
					<div className="sampleDiv">
						<img className="sample-image" src={props.sampleCloth_url}></img>
						<text id="sample-image-title">코디 이미지</text>
					</div>
					<div className="userDiv">
						<img className="user-image" src={props.userCloth_url}></img>
						<text id="user-image-title">유저 이미지</text>
					</div>
					<div className="DataDiv">
						<button
							id="purchase-button"
							onClick={() => clickPurchaseButtonHander()}
						>
							Purchase Button
						</button>
						<text id="cloth-name">{props.sampleCloth_name}</text>
						<div className="ClothTags">
							<text id="cloth-type">Type : {props.type}</text>
							<text id="cloth-color">Color : {props.color}</text>
							<text id="cloth-pattern">Pattern : {props.pattern}</text>
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
						<img className="sample-image" src={props.sampleCloth_url}></img>
						<text id="sample-image-title">코디 이미지</text>
					</div>
					<div className="DataDiv">
						<button
							id="purchase-button"
							onClick={() => clickPurchaseButtonHander()}
						>
							Purchase Button
						</button>
						<text id="cloth-name">{props.sampleCloth_name}</text>
						<div className="ClothTags">
							<text id="cloth-type">Type : {props.type}</text>
							<text id="cloth-color">Color : {props.color}</text>
							<text id="cloth-pattern">Pattern : {props.pattern}</text>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default SampleClothModal;