import "./ClothDetailModal.css";
import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
// import { AppDispatch } from "../../store";

const ClothDetailModal = () => {
	const navigate = useNavigate();
	// const { id } = useParams();

	// const [name, setName] = useState<string>("");
	// const [image_id, setImageId] = useState<number>();
	// const [type, setType] = useState<string>("");
	// const [color, setColor] = useState<string>("");
	// const [pattern, setPattern] = useState<string>("");
	const [submitted, setSubmitted] = useState<boolean>(false);
	// const dispatch = useDispatch<AppDispatch>();

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

	const cloth = {
		cloth_color: "그레이",
		cloth_name: "(SS19) Denim Trucker Jacket Grey",
		cloth_link: "https://www.musinsa.com/app/goods/969580/0",
		cloth_num: 969580,
		cloth_image:
			"https://image.msscdn.net/images/goods_img/20190228/969580/969580_1_500.jpg?t=20190228191158",
		cloth_pattern: "None",
		cloth_type: "트러커 재킷",
	};

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
					<img id="cloth-img-modal" src={cloth.cloth_image}></img>
				</div>
				<div className="ClothLable-modal">
					<text id="type-label-modal">
						<b>종류</b>
					</text>
					<text id="type-text-modal">{cloth.cloth_type}</text>
					<br></br>
					<text id="color-label-modal">
						<b>색상</b>
					</text>
					<text id="color-text-modal">{cloth.cloth_color}</text>
					<br></br>
					<text id="stripe-label-modal">
						<b>무늬</b>
					</text>
					<text id="stripe-text-modal">{cloth.cloth_pattern}</text>
					<br></br>
				</div>
				<div className="ClothButton-modal">
					<button
						id="move-recommend-button"
						onClick={() => clickMoveToRecommendedStyleHandler()}
					>
						Get Recommendation
					</button>
				</div>
			</div>
		</div>
	);
};

export default ClothDetailModal;
