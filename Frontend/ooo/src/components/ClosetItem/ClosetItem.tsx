import "./ClosetItem.css";
import React from "react";
//import { deleteUserCloth } from "../../store/slices/userCloth";
import { useState } from "react";
//import { useDispatch, useSelector } from "react-redux";
//import { useParams } from "react-router";
//import { NavLink, useNavigate, useLocation } from "react-router-dom";
//import { AppDispatch } from "../../store";
import Modal from "react-modal";
import ClothDetailModal from "../../components/ClothDetailModal/ClothDetailModal";

export interface IProps {
	source_url: string;
	type: string;
	color: string;
	pattern: string;
	clickClothDetailPopupHandler?: () => void;
}

const ClosetItem = (props: IProps) => {
	const [clothDetailModalOpen, setClothDetailModalOpen] = useState(false);

	const clickClothDetailPopupHandler = () => {
		setClothDetailModalOpen(true);
	};


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
				<ClothDetailModal></ClothDetailModal>
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
			</Modal>
			<div className="ClothLable">
				<text id="type-label">종류</text>
				<text id="type-text">{props.type}</text>
				<text id="color-label">색상</text>
				<text id="color-text">{props.color}</text>
				<text id="stripe-label">무늬</text>
				<text id="stripe-text">{props.pattern}</text>
			</div>
		</div>
	);
};

export default ClosetItem;