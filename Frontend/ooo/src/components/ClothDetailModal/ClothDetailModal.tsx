import "./ClothDetailModal.css";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Navigate, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import Modal from "react-modal";
import { Url } from "url";
import {
	selectUserCloth,
	fetchUserClothes,
	fetchUserCloth,
	createUserCloth,
	deleteUserCloth,
} from "../../store/slices/userCloth";
import ClosetItem from "../../components/ClosetItem/ClosetItem";

import neet from "../../assets/images/neet.jpg";

const ClothDetailModal = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	const [name, setName] = useState<string>("");
	const [image_id, setImageId] = useState<number>();
	const [type, setType] = useState<string>("");
	const [color, setColor] = useState<string>("");
	const [pattern, setPattern] = useState<string>("");
	const [submitted, setSubmitted] = useState<boolean>(false);
	const dispatch = useDispatch<AppDispatch>();

	// const clickDeleteClothHandler = async () => {
	//     const data = { cloth_id: Number(id) };
	//     const result = await dispatch(deleteUserCloth(data));
	//     // console.log(result);
	//     if (result.type === `${deleteUserCloth.typePrefix}/fulfilled`) {
	//         setSubmitted(true);
	//     } else {
	//         alert("Error on delete Cloth");
	//     }
	// };

	const clickMoveToRecommendedStyleHandler = () => {
		navigate("/outfit/");
	};

	// const clickClothDetailCancelHandler = () => {
	//     navigate("/articles/create");
	// };

	if (submitted) {
		navigate("/closet/");
	}

	return (
		<div className="ClothDetailModal">
			<div className="ClothDetailModalHead">
				<text id="ClothDetailModal-text">Cloth Detail</text>
			</div>
			<div className="ClothDetailModalTop">
				<div className="ClothImage-modal">
					<img id="cloth-img-modal" src={neet}></img>
				</div>
				<div className="ClothLable-modal">
					<text id="type-label-modal">
						<b>종류</b>
					</text>
					<text id="type-text-modal">{"니트"}</text>
					<br></br>
					<text id="color-label-modal">
						<b>색상</b>
					</text>
					<text id="color-text-modal">{"회색"}</text>
					<br></br>
					<text id="stripe-label-modal">
						<b>무늬</b>
					</text>
					<text id="stripe-text-modal">{"없음"}</text>
					<br></br>
				</div>
				<button
					id="move-recommend-button"
					onClick={() => clickMoveToRecommendedStyleHandler()}
				>
					Get Recommendation
				</button>
			</div>
		</div>
	);
};

export default ClothDetailModal;
