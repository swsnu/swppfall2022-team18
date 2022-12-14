import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { AppDispatch } from "../../store";
import "./OutfitDetail.css";
import {
	fetchOutfit,
	fetchSampleCloth,
	selectOutfit,
} from "../../store/slices/outfit";
import Header from "../../components/Header/Header";
import { logoutUser } from "../../api/user";
import Modal from "react-modal";
import SampleClothModal from "../../components/SampleClothModal/SampleClothModal";

const OutfitDetail = () => {
	const { id } = useParams();

	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedCloth, setSelectedCloth] = useState(0);
	const [userHave, setUserHave] = useState(false);
	const outfitState = useSelector(selectOutfit);
	const userClothHave = useSelector(selectOutfit).userCloth;

	useEffect(() => {
		dispatch(fetchOutfit(Number(id)));
	}, []);

	useEffect(() => {
		console.log("rerender");
		console.log(userHave);
		console.log(userClothHave);
	}, [userClothHave]);

	const clickPurchaseButtonHander = (purchase_link: string) => {
		window.open(purchase_link, "_blank");
	};

	const clickClothHandler = async (id: number) => {
		//use modal
		await dispatch(fetchSampleCloth(id));
		setSelectedCloth(id);
		setTimeout(() => {
			console.log("Check");
			if (userClothHave === null) {
				setUserHave(false);
			} else {
				setUserHave(true);
			}
			setModalOpen(true);
		}, 100);
	};

	const [isSending, setIsSending] = useState(false);
	const checkLoginned = () => {
		if (localStorage.getItem("username") !== null) {
			return true;
		} else return false;
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
		<div className="OutfitDetail">
			<div className="header">
				<Header
					clickInfoHandler={() => {
						navigate("/setting");
					}}
					clickLogoutHandler={async () => {
						await logoutUser().catch((error) => console.log(error));
						setIsSending(!isSending);
					}}
					clickHeaderHandler={() => {
						navigate("/home");
					}}
				></Header>
			</div>
			<div className="OutfitDetail-body">
				<div className="Outfit-image">
					<img
						id="-outfit-img"
						src={outfitState.selectedOutfit?.image_link}
						alt="로딩 중"
					/>
				</div>
				<div className="OutfitDetailData">
					<button
						id="outfit-purchase-button"
						data-testid="outfit-purchase-button"
						onClick={() =>
							clickPurchaseButtonHander(
								outfitState.selectedOutfit !== null
									? outfitState.selectedOutfit.purchase_link
									: ""
							)
						}
					>
						Purchase Button
					</button>
					<div className="OutfitName">
						{outfitState.selectedOutfit?.outfit_name}
					</div>
					<text id="name-label">▶ 코디 설명</text>
					<div className="OutfitInfo">
						{outfitState.selectedOutfit?.outfit_info}
					</div>
					<text id="name-label">▶ 구성 옷</text>
					<div className="sampleClothes">
						{outfitState.sampleClothes.map((sc) => {
							return (
								<div className="sampleCloth-image" key={sc.id}>
									<img
										id="samplecloth-img"
										data-testid="samplecloth-image"
										src={sc.image_link}
										onClick={() => clickClothHandler(sc.id)}
										alt="로딩 중"
									></img>
								</div>
							);
						})}
					</div>
				</div>
				<Modal id="sample-modal" isOpen={modalOpen} ariaHideApp={false}>
					<SampleClothModal
						userHave={userHave}
						userCloth_url={
							outfitState.userCloth === null
								? ""
								: outfitState.userCloth.image_link
						}
						sampleCloth_url={
							outfitState.sampleCloth === null
								? ""
								: outfitState.sampleCloth.image_link
						}
						type={
							outfitState.sampleCloth === null
								? ""
								: outfitState.sampleCloth.type
						}
						color={
							outfitState.sampleCloth === null
								? ""
								: outfitState.sampleCloth.color
						}
						pattern={
							outfitState.sampleCloth === null
								? ""
								: outfitState.sampleCloth.pattern
						}
						sampleCloth_name={
							outfitState.sampleCloth === null
								? ""
								: outfitState.sampleCloth.name
						}
						sampleCloth_link={
							outfitState.sampleCloth === null
								? ""
								: outfitState.sampleCloth.purchase_link
						}
					></SampleClothModal>
					<div id="close-buton-div">
						<button
							id="modal-close-button"
							data-testid="modal-close-button"
							onClick={() => {
								setModalOpen(false);
								setSelectedCloth(-1);
								setUserHave(false);
							}}
						>
							닫기
						</button>
					</div>
				</Modal>
			</div>
		</div>
	);
};

export default OutfitDetail;
