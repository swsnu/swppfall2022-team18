import "./ClosetItem.css";
import React from "react";
import { useState } from "react";
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
			<div className="ClothImage" onClick={clickClothDetailPopupHandler}>
				<img id="cloth-img" src={props.source_url}></img>
			</div>
			<Modal
				id="detail-modal"
				isOpen={clothDetailModalOpen}
				onRequestClose={() => setClothDetailModalOpen(false)}
			>
				<ClothDetailModal></ClothDetailModal>
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
