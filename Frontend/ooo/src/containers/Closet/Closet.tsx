import "./Closet.css";
import { logoutUser } from "../../api/user";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import ClosetItem from "../../components/ClosetItem/ClosetItem";
import {
	selectUserCloth,
	fetchUserClothes,
	fetchUserCloth,
	createUserCloth,
	deleteUserCloth,
} from "../../store/slices/userCloth";
import { AppDispatch } from "../../store";
import Modal from "react-modal";

import AddClothModal from "../../components/AddClothModal/AddClothModal";
// import ClothDetailModal from '../../components/ClothDetailModal/ClothDetailModal'

interface IProps {
	title: string;
}

type ClosetItem = {
	id: number;
	source_url: string;
	type: string;
	color: string;
	pattern: string;
};

export default function Closet(props: IProps) {
	const navigate = useNavigate();
	const { title } = props;

	const userClothState = useSelector(selectUserCloth);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(fetchUserClothes());
	}, []);

	const [addClothModalOpen, setAddClothModalOpen] = useState(false);

	const clickAddClothPopupHandler = () => {
		setAddClothModalOpen(true);
	};


	const [isSending, setIsSending] = useState(false)
	const checkLoginned = () => {
		console.log("start")
		console.log(localStorage.getItem("username"));
		if(localStorage.getItem("username") !== null){
			return true
		}
		else return false
	};


	useEffect(() => {
		const redirect = () => {
			if (!checkLoginned()) {
				navigate("/");
			}
		};
		redirect();
	}, [isSending]);

	return (
		<div className="Closet">
			<div className="Closet-header">
				<Header
					clickInfoHandler={() => {
						navigate("/");
					}}
					clickLogoutHandler={async() => {
						await logoutUser().catch((error) => console.log(error))
						setIsSending(!isSending)
					}}
					clickHeaderHandler={() => {
						navigate("/home");
					}}
				></Header>
			</div>

			<div className="ClosetTop">
				<div className="ClosetDiv">
					<div className="ClosetHead">
						<text id="Closet-text-main">Closet</text>
						<button id="add-cloth-button" onClick={clickAddClothPopupHandler}>
							Add
						</button>
						<Modal
							isOpen={addClothModalOpen}
							onRequestClose={() => setAddClothModalOpen(false)}
						>
							<AddClothModal></AddClothModal>
						</Modal>
					</div>

					{
						userClothState.userClothes.map((cloth, index) => {
							return(
								<ClosetItem
								key={index}
								source_url={cloth.image_id}
								type={cloth.type}
								color={cloth.color}
								pattern={cloth.pattern}
							/>
							)
						})
					}

					{/* closetItem 컴포넌트 가져오고, onclick clickClothDetailPopupHandler 달기 */}
					{/* 상의 div, 하의 div 나눠서 가져와야 함. 제목도 달고 */}
				</div>
			</div>
		</div>
	);
}
