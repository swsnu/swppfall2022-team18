import "./ClothDetailModal.css";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import {
	fetchUserCloth,
	editUserCloth,
	deleteUserCloth,
	addWearDate,
} from "../../store/slices/userCloth";
import TypeFilter from "../TypeFilter/TypeFilter";
import ColorFilter from "../ColorFilter/ColorFilter";
import PatternFilter from "../PatternFilter/PatternFilter";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MetaTypeOptions = [
	{ value: "옷 종류" },
	{ value: "상의" },
	{ value: "하의" },
	{ value: "아우터" },
];

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
	console.log(cloth.weardate ? cloth.weardate : "no");
	const defaultDates = cloth.weardate
		? JSON.parse(cloth.weardate).map((date: any) => new Date(date))
		: [];

	const [type, setType] = useState(cloth.type);
	const [color, setColor] = useState(cloth.color);
	const [pattern, setPattern] = useState(cloth.pattern);
	const [highlightDates, setHighlightDates] = useState(defaultDates);
	const [wearDate, setWearDate] = useState(new Date());
	const [isEditable, setIsEditable] = useState(false);
	const [addOrDelete, setAddOrDelete] = useState(true); // add: true, delete: false

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(fetchUserCloth(Number(cloth.id)));
	}, [cloth.id]);

	useEffect(() => {
		console.log();
	}, [highlightDates]);

	const clickMoveToRecommendedStyleHandler = () => {
		const clothData = {
			userHave: true,
			type: type,
			color: color,
			pattern: pattern,
		};
		navigate("/outfit/", { state: clothData });
	};

	const clickEditClothHandler = async () => {
		setIsEditable(false);
		const data = {
			id: Number(cloth.id),
			type: type,
			color: color,
			pattern: pattern,
		};
		await dispatch(editUserCloth(data));
	};

	const clickDeleteClothHandler = async () => {
		await dispatch(deleteUserCloth(Number(cloth.id)));
		cloth.modal_close();
	};

	const dateFormat = (date: any) => {
		return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
	};

	const setWearDateHandler = (clickedDate: any) => {
		setWearDate(clickedDate);

		// if clicked date is in weardate list, set addOrDelete = false
		const parsedWearDates = highlightDates.map((d: any) => dateFormat(d));
		if (parsedWearDates) {
			const clickedDateStr = dateFormat(clickedDate);
			const exist = parsedWearDates.includes(clickedDateStr);

			if (exist) setAddOrDelete(false);
			else setAddOrDelete(true);
		} else {
			setAddOrDelete(true);
		}
	};

	const clickSaveWearDateHandler = async (addOrDelete: boolean) => {
		const wearDateStr = dateFormat(wearDate);
		const data = {
			id: Number(cloth.id),
			dates: String(wearDateStr),
		};
		const result = await dispatch(addWearDate(data));
		alert(
			`입은 날짜가 ${addOrDelete ? "기록" : "삭제"}되었습니다: ${wearDateStr}`
		);

		if (result.payload.dates) {
			setHighlightDates(
				JSON.parse(result.payload.dates).map((date: any) => new Date(date))
			);
		} else {
			setHighlightDates([]);
		}
	};

	const clickTypeOptionHandler = (value: string) => {
		console.log(value);
		if (
			value == "상의 종류" ||
			value == "하의 종류" ||
			value == "아우터 종류"
		) {
			setType(type);
		} else setType(value);
	};

	const clickColorOptionHandler = (value: string | null) => {
		console.log("check");
		console.log(value);
		if (value == "") {
			setColor("");
		} else if (value == null) {
			setColor("");
		} else setColor(value);
	};

	const clickPatternOptionHandler = (value: string | null) => {
		console.log(value);
		if (value == "패턴 종류") {
			setPattern(pattern);
		} else if (value == null) {
			setPattern("");
		} else setPattern(value);
	};

	return (
		<div className="ClothDetailModal">
			<div className="ClothDetailModalHead">
				<text id="ClothDetailModal-text">Cloth Detail</text>
			</div>
			<div className="ClothDetailModalTop">
				<div className="ClothImage-modal">
					<img
						id="cloth-img-modal"
						data-testid="cloth-img-modal"
						src={cloth.image}
					></img>
				</div>
				<div className="ClothLable-modal">
					<text id="type-label-modal">▶ 종류</text>
					{isEditable ? (
						<TypeFilter
							metaType={cloth.metatype}
							selectHandler={clickTypeOptionHandler}
						></TypeFilter>
					) : (
						<text id="type-text-modal">{type}</text>
					)}
					<br></br>
					<text id="color-label-modal">▶ 색상</text>
					{isEditable ? (
						<>
							<ColorFilter
								selectHandler={clickColorOptionHandler}
								color={color}
							></ColorFilter>
							<text>{color}</text>
						</>
					) : (
						<text id="type-text-modal">{color}</text>
					)}
					<br></br>
					<text id="stripe-label-modal">▶ 무늬</text>
					{isEditable ? (
						<>
							<PatternFilter
								selectHandler={clickPatternOptionHandler}
								pattern={pattern}
							></PatternFilter>
						</>
					) : (
						<text id="type-text-modal">{pattern}</text>
					)}
					<div className="ClothButton-modal">
						<button
							id="move-recommend-button"
							onClick={() => clickMoveToRecommendedStyleHandler()}
						>
							Get Recommendation
						</button>
					</div>
				</div>
				<div className="ClothWearDate-modal">
					<text id="stripe-label-modal">▶ 입은 날짜</text>
					<DatePicker
						data-testid="date-picker"
						dateFormat="yyyy/MM/dd"
						highlightDates={highlightDates}
						selected={wearDate}
						onChange={(clickedDate: any) => setWearDateHandler(clickedDate)}
						inline
					/>
					{addOrDelete ? (
						<button
							id="save-weardate-button"
							onClick={() => clickSaveWearDateHandler(true)}
						>
							입은 날짜 추가하기
						</button>
					) : (
						<button
							id="delete-weardate-button"
							onClick={() => clickSaveWearDateHandler(false)}
						>
							입은 날짜 삭제하기
						</button>
					)}
				</div>
				<div>
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
		</div>
	);
};

export default ClothDetailModal;
