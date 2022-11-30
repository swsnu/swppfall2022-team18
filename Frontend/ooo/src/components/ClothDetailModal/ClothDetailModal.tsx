import "./ClothDetailModal.css";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { fetchUserCloth, editUserCloth, deleteUserCloth, addWearDate } from "../../store/slices/userCloth";
import TypeFilter from "../TypeFilter/TypeFilter"

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export interface IProps {
	id: string;
	image: string;
	weardate: string;
	metatype: string;
	type: string;
	color: string;
	pattern: string;
	modal_close: () => void;
}

const ClothDetailModal = (cloth: IProps) => {
	const navigate = useNavigate();

	const [type, setType] = useState(cloth.type);
	const [color, setColor] = useState(cloth.color);
	const [pattern, setPattern] = useState(cloth.pattern);
	const [wearDate, setWearDate] = useState(new Date());
	const [isEditable, setIsEditable] = useState(false);
	const [addOrDelete, setAddOrDelete] = useState(true); // add: true, delete: false

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(fetchUserCloth(Number(cloth.id)));
	}, [cloth.id]);

	// const cloth = {
	// 	color: "그레이",
	// 	cloth_name: "(SS19) Denim Trucker Jacket Grey",
	// 	cloth_link: "https://www.musinsa.com/app/goods/969580/0",
	// 	cloth_num: 969580,
	// 	image:
	// 		"https://image.msscdn.net/images/goods_img/20190228/969580/969580_1_500.jpg?t=20190228191158",
	// 	pattern: "None",
	// 	type: "트러커 재킷",
	// };

	const clickMoveToRecommendedStyleHandler = () => {
		navigate("/outfit/");
	};

	const clickEditClothHandler = async () => {
		setIsEditable(false);
		const data = {
			id: Number(cloth.id),
			type: type,
			color: color,
			pattern: pattern
		};
		const result = dispatch(editUserCloth(data));
		console.log(result);
	}

	const clickDeleteClothHandler = async () => {
		const result = await dispatch(deleteUserCloth(Number(cloth.id)));
		cloth.modal_close();
		navigate("/closet/");
	};

	const setWearDateHandler = (clickedDate: any) => {
		setWearDate(clickedDate);

		if (cloth.weardate) {
			const parsedWearDates = JSON.parse(cloth.weardate)
			const clickedDateStr = `${clickedDate.getFullYear()}/${clickedDate.getMonth()+1}/${clickedDate.getDate()}`
			const exist = parsedWearDates.includes(clickedDateStr);

			if (exist) setAddOrDelete(false)
			else setAddOrDelete(true)
		}
		else {
			setAddOrDelete(true)
		}
	}

	const clickSaveWearDateHandler = async (addOrDelete: boolean) => {
		const wearDateStr = `${wearDate.getFullYear()}/${wearDate.getMonth()+1}/${wearDate.getDate()}`
		const data = {
			id: Number(cloth.id),
			dates: String(wearDateStr)
		};
		const result = await dispatch(addWearDate(data));
		alert(`입은 날짜가 ${addOrDelete ? '기록' : '삭제'}되었습니다: ${wearDateStr}`);
	};

	return (
		<div className="ClothDetailModal">
			<div className="ClothDetailModalHead">
				<text id="ClothDetailModal-text">Cloth Detail</text>
			</div>
			<div className="ClothDetailModalTop">
				<div className="ClothImage-modal">
					<img id="cloth-img-modal" data-testid="cloth-img-modal" src={cloth.image}></img>
				</div>
				<div className="ClothLable-modal">
					<text id="type-label-modal">
						<b>종류</b>
					</text>
					{isEditable ? (
						<TypeFilter metaType={cloth.metatype} selectHandler={setType}></TypeFilter>
					) : (
						<text id="type-text-modal">{type}</text>
					)}
					<br></br>
					<text id="color-label-modal">
						<b>색상</b>
					</text>
					{isEditable ? (
						<input
							type="text"
							value={color}
							onChange={(e) => setColor(e.target.value)}
						/>
					) : (
						<text id="type-text-modal">{color}</text>
					)}
					<br></br>
					<text id="stripe-label-modal">
						<b>무늬</b>
					</text>
					{isEditable ? (
						<input
							type="text"
							value={pattern}
							onChange={(e) => setPattern(e.target.value)}
						/>
					) : (
						<text id="type-text-modal">{pattern}</text>
					)}
					<br></br>
				</div>
				<div className="ClothWearDate-modal">
					<b>입은 날짜</b><br></br>
					<DatePicker
						dateFormat="yyyy/MM/dd"
						highlightDates={cloth.weardate ? JSON.parse(cloth.weardate).map((date:any)=>new Date(date)) : []}
						selected={wearDate}
						onChange={(clickedDate: any) => setWearDateHandler(clickedDate)}
						inline
					/>
					{addOrDelete ? (
						<button id="save-weardate-button" onClick={() => clickSaveWearDateHandler(true)}>
							입은 날짜 추가하기
						</button>
					) : (<button id="delete-weardate-button" onClick={() => clickSaveWearDateHandler(false)}>
							입은 날짜 삭제하기
						</button>
					)}
				</div>
				<div className="ClothButton-modal">
					<button
						id="move-recommend-button"
						onClick={() => clickMoveToRecommendedStyleHandler()}
					>
						Get Recommendation
					</button>
				</div>
				<div className="edit-cloth-detail">
					{isEditable ? (
						<button
							id="edit-cloth-button"
							onClick={() => clickEditClothHandler()}
						>
							Finish Edit
						</button>
					) : (
						<button
							id="edit-cloth-button"
							onClick={() => setIsEditable(true)}
						>
							Edit Cloth
						</button>
					)}
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
