import "./ClothDetailModal.css";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { fetchUserCloth, editUserCloth, deleteUserCloth, addWearDate } from "../../store/slices/userCloth";
// import { TypeFilter } from "../TypeFilter/TypeFilter"

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export interface IProps {
	id: string;
	cloth_image: string;
	cloth_weardate: string;
	cloth_type: string;
	cloth_color: string;
	cloth_pattern: string;
	// clickClothDetailPopupHandler?: () => void;
}

const ClothDetailModal = (cloth: IProps) => {
	const navigate = useNavigate();
	// const { id } = useParams();
	console.log(cloth.id);

	// const [name, setName] = useState<string>("");
	// const [image_id, setImageId] = useState<number>();
	// const [type, setType] = useState<string>("");
	// const [color, setColor] = useState<string>("");
	// const [pattern, setPattern] = useState<string>("");
	const [submitted, setSubmitted] = useState<boolean>(false);
	const [clothType, setClothType] = useState(cloth.cloth_type);
	const [clothColor, setClothColor] = useState(cloth.cloth_color);
	const [clothPattern, setClothPattern] = useState(cloth.cloth_pattern);
	const [isEditable, setIsEditable] = useState(false);
	const [wearDate, setWearDate] = useState(new Date());

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(fetchUserCloth(Number(cloth.id)));
	}, [cloth.id]);

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

	// const cloth = {
	// 	cloth_color: "그레이",
	// 	cloth_name: "(SS19) Denim Trucker Jacket Grey",
	// 	cloth_link: "https://www.musinsa.com/app/goods/969580/0",
	// 	cloth_num: 969580,
	// 	cloth_image:
	// 		"https://image.msscdn.net/images/goods_img/20190228/969580/969580_1_500.jpg?t=20190228191158",
	// 	cloth_pattern: "None",
	// 	cloth_type: "트러커 재킷",
	// };

	const clickMoveToRecommendedStyleHandler = () => {
		navigate("/outfit/");
	};

	const clickDeleteClothHandler = async () => {
		// const data = { targetId: Number(id) };
		const result = await dispatch(deleteUserCloth(Number(cloth.id)));
		console.log(result);
	};

	const clickSaveWearDateHandler = async () => {
		const wearDateStr = `${wearDate.getFullYear()}/${wearDate.getMonth()+1}/${wearDate.getDate()}`
		const data = {
			id: Number(cloth.id),
			dates: String(wearDateStr)
		};
		const result = await dispatch(addWearDate(data));
		console.log(result);
	};

	// if (submitted) {
	// 	navigate("/closet/");
	// }

	const handleDoubleClick = () => {
		setIsEditable(true);
	};

	const handleClothTypeChange = (e: any) => {
		setClothType(e.target.value);
	};
	const handleClothColorChange = (e: any) => {
		setClothColor(e.target.value);
	};
	const handleClothPatternChange = (e: any) => {
		setClothPattern(e.target.value);
	};

	const handleKeyDown = (e: any) => {
		if (e.key === "Enter") {
			setIsEditable(false);
			// PUT edit 처리
			const data = {
				id: Number(cloth.id),
				type: clothType,
				color: clothColor,
				pattern: clothPattern,
			};
			const result = dispatch(editUserCloth(data));
			console.log(result);
		}
	};

	return (
		<div className="ClothDetailModal">
			<div className="ClothDetailModalHead">
				<text id="ClothDetailModal-text">Cloth Detail</text>
			</div>
			<div className="ClothDetailModalTop">
				<div className="ClothImage-modal">
					<img id="cloth-img-modal" data-testid="cloth-img-modal" src={cloth.cloth_image}></img>
				</div>
				<div className="ClothLable-modal">
					<text id="type-label-modal">
						<b>종류</b>
					</text>
					{/* <text id="type-text-modal">{cloth.cloth_type}</text> */}
					{isEditable ? (
						<input
							type="text"
							value={clothType}
							onChange={handleClothTypeChange}
							onKeyDown={handleKeyDown}
						/>
					) : (
						<text id="type-text-modal" onDoubleClick={handleDoubleClick}>{clothType}</text>
					)}
					<br></br>
					<text id="color-label-modal">
						<b>색상</b>
					</text>
					{/* <text id="color-text-modal">{cloth.cloth_color}</text> */}
					{isEditable ? (
						<input
							type="text"
							value={clothColor}
							onChange={handleClothColorChange}
							onKeyDown={handleKeyDown}
						/>
					) : (
						<text id="type-text-modal" onDoubleClick={handleDoubleClick}>{clothColor}</text>
					)}
					<br></br>
					<text id="stripe-label-modal">
						<b>무늬</b>
					</text>
					{/* <text id="stripe-text-modal">{cloth.cloth_pattern}</text> */}
					{isEditable ? (
						<input
							type="text"
							value={clothPattern}
							onChange={handleClothPatternChange}
							onKeyDown={handleKeyDown}
						/>
					) : (
						<text id="type-text-modal" onDoubleClick={handleDoubleClick}>{clothPattern}</text>
					)}
					<br></br>
				</div>
				<div className="ClothWearDate-modal">
					<b>입은 날짜</b><br></br>
					{/* <text id="weardate-text-modal">{cloth.cloth_weardate}</text> */}
					<DatePicker
						dateFormat="yyyy/MM/dd"
						highlightDates={JSON.parse(cloth.cloth_weardate).map((date:any)=>new Date(date))}
						selected={wearDate}
						onChange={(date: any) => setWearDate(date)}
						inline
					/>
					<button
						id="save-weardate-button"
						onClick={() => clickSaveWearDateHandler()}
					>
						입은 날짜 추가하기
					</button>
				</div>
				<div className="ClothButton-modal">
					<button
						id="move-recommend-button"
						onClick={() => clickMoveToRecommendedStyleHandler()}
					>
						Get Recommendation
					</button>
				</div>
				<div className="delete-cloth-modal">
					<button
						id="delete-cloth-button"
						onClick={() => clickDeleteClothHandler()}
					>
						Delete Cloth
					</button>
				</div>
			</div>
		</div>
	);
};

export default ClothDetailModal;
