import "./ClosetItem.css";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
//import { useParams } from "react-router";
//import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { AppDispatch } from "../../store";
import Modal from "react-modal";
import ClothDetailModal from "../../components/ClothDetailModal/ClothDetailModal";

export interface IProps {
	user_cloth_id: string;
	source_url: string;
	weardate: string;
	metatype: string;
	type: string;
	color: string;
	pattern: string;
	clickClothDetailPopupHandler?: () => void;
	tmp?: (metatype: string) => void;
	// clickOnDeleteHandler?: (metaType: string) => void;
}

const ClosetItem = (props: IProps) => {
	const dispatch = useDispatch<AppDispatch>();

	const [clothDetailModalOpen, setClothDetailModalOpen] = useState(false);
	// const [submitted, setSubmitted] = useState<boolean>();
	// const [filteredList, setFilteredList] = useState<UserClothType[]>([]);

	const clickClothDetailPopupHandler = () => {
		setClothDetailModalOpen(true);
	};

	const clickClothDetailPopupCloseHandler = () => {
		setClothDetailModalOpen(!clothDetailModalOpen);
		if (props.tmp) {
			props.tmp(props.metatype);
		}
		// setSubmitted(true);
	};

	const clickDetailCloseButtonHandler = () => {
		setClothDetailModalOpen(false);
		if (props.tmp) {
			props.tmp(props.metatype);
		}
	};

	// useEffect(() => {
	// 	// alert('진입')
	// 	dispatch(fetchUserClothes());
	// 	setSubmitted(false);
	// }, [submitted]);

	return (
		<div className="ClosetItem">
			<div
				className="ClothImage"
				data-testid="clothimg"
				onClick={clickClothDetailPopupHandler}
			>
				<img
					data-testid="cloth-img"
					id="cloth-img"
					src={props.source_url}
				></img>
			</div>
			<Modal
				ariaHideApp={false}
				id="detail-modal"
				data-testid="detail-modal"
				isOpen={clothDetailModalOpen}
			>
				<div id="close-buton-div">
					<button
						id="modal-close-button"
						data-testid="modal-close-button"
						onClick={() => {
							setClothDetailModalOpen(false);
						}}
					>
						닫기
					</button>
				</div>
				<div id = "modal-frame">
				<ClothDetailModal
					id={props.user_cloth_id}
					image={props.source_url}
					weardate={props.weardate}
					metatype={props.metatype}
					type={props.type}
					color={props.color}
					pattern={props.pattern}
					modal_close={clickClothDetailPopupCloseHandler}
				></ClothDetailModal>
				</div>
			</Modal>
			<div className="ClothLable">
				<text id="type-label"><b>▶ 종류</b></text>
				<text id="type-text">{props.type}</text>
				<text id="color-label"><b>▶ 색상</b></text>
				<text id="color-text">{props.color}</text>
				<text id="stripe-label"><b>▶ 무늬</b></text>
				<text id="stripe-text">{props.pattern}</text>
			</div>
		</div>
	);
};

export default ClosetItem;
