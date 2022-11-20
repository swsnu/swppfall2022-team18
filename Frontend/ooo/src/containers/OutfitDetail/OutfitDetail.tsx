import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { AppDispatch } from "../../store";
import "./OutfitDetail.css";
import { fetchOutfit, selectOutfit } from "../../store/slices/outfit";
import Header from "../../components/Header/Header";
import { logoutUser } from "../../api/user";
import outfit_1 from "../../assets/images/outfit_1.jpg";
import samplecloth_1 from "../../assets/images/samplecloth_1.jpg";
import samplecloth_2 from "../../assets/images/samplecloth_2.jpg";
import Modal from "react-modal";
import SampleClothModal from "../../components/SampleClothModal/SampleClothModal";

const OutfitDetail = () => {
	// const { id } = useParams();

	// const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedCloth, setSelectedCloth] = useState(0);
	const [userHave, setUserHave] = useState(false);
	// const outfitState = useSelector(selectOutfit);

	// useEffect(() => {
	// 	dispatch(fetchOutfit(Number(id)));
	// }, []);

	const selectedOutfit = {
		codi_name: "나쁠게 없어!",
		rank: 58575,
		explain:
			"트러커 재킷과 스트라이프 패턴 티셔츠를 코디하고 데님 팬츠로 심플하게 연출한 캠퍼스 룩",
		codi_link:
			"https://www.musinsa.com/app/styles/views/8679?use_yn_360=&style_type=&brand=&model=&tag_no=&max_rt=&min_rt=&display_cnt=60&list_kind=big&sort=view_cnt&page=1",
		cloth_links: [
			"https://www.musinsa.com/app/goods/952064/0",
			"https://www.musinsa.com/app/goods/858911/0",
		],
		codi_image:
			"https://image.msscdn.net/images/style/detail/8679/detail_8679_1_500.jpg",
	};

	const sampleClothes = [
		{
			cloth_color: "중청",
			cloth_name: "와이드 데님 팬츠 (LIGHT BLUE)",
			cloth_link: "https://www.musinsa.com/app/goods/858911/0",
			cloth_num: 858911,
			cloth_image:
				"https://image.msscdn.net/images/goods_img/20180914/858911/858911_6_500.jpg?t=20220628150414",
			cloth_pattern: "None",
			cloth_type: "데님 팬츠",
		},
		{
			cloth_color: "갈색",
			cloth_name: "TRUCKER JACKET(2COLOR)",
			cloth_link: "https://www.musinsa.com/app/goods/952064/0",
			cloth_num: 952064,
			cloth_image:
				"https://image.msscdn.net/images/goods_img/20190213/952064/952064_3_500.jpg?t=20220628164752",
			cloth_pattern: "None",
			cloth_type: "트러커 재킷",
		},
	];

	const userClothes = [
		{
			image_id: "1",
			cloth_image:
				"https://image.msscdn.net/images/goods_img/20180914/858911/858911_6_500.jpg?t=20220628150414",
		},
	];

	const clickPurchaseButtonHander = (purchase_link: string) => {
		navigate("/redirect", { state: { url: purchase_link } });
	};

	const clickClothHandler = (id: number) => {
		//use modal
		setModalOpen(true);
		if (id == 858911) {
			setSelectedCloth(0);
			setUserHave(true);
		} else {
			setSelectedCloth(1);
			setUserHave(false);
		}
		console.log(selectedCloth);
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
		<div className="OutfitDetail">
			<div className="header">
				<Header
					clickInfoHandler={() => {
						navigate("/");
					}}
					clickLogoutHandler={() => {
						logoutUser();
						setIsSending(!isSending)
					}}
					clickHeaderHandler={() => {
						navigate("/home");
					}}
				></Header>
			</div>
			<div className="OutfitDetail-body">
				<div className="Outfit-image">
					<img id="-outfit-img" src={selectedOutfit.codi_image} />
				</div>
				<div className="OutfitDetailData">
					<button
						id="outfit-purchase-button"
						data-testid="outfit-purchase-button"
						onClick={() => clickPurchaseButtonHander(selectedOutfit.codi_link)}
					>
						Purchase Button
					</button>
					<div className="OutfitName">{selectedOutfit.codi_name}</div>
					<div className="OutfitInfo">{selectedOutfit.explain}</div>
					<text id="samplecloth-title">구성하는 옷들</text>
					<div className="sampleClothes">
						{sampleClothes.map((sc) => {
							return (
								<div className="sampleCloth-image" key={sc.cloth_num}>
									<img
										id="samplecloth-img"
										data-testid="samplecloth-image"
										src={sc.cloth_image}
										onClick={() => clickClothHandler(sc.cloth_num)}
									></img>
								</div>
							);
						})}
					</div>
				</div>
				<Modal id="sample-modal" isOpen={modalOpen}>
					<SampleClothModal
						userHave={userHave}
						userCloth_url={userClothes[0].cloth_image}
						sampleCloth_url={sampleClothes[selectedCloth].cloth_image}
						type={sampleClothes[selectedCloth].cloth_type}
						color={sampleClothes[selectedCloth].cloth_color}
						pattern={sampleClothes[selectedCloth].cloth_pattern}
						sampleCloth_name={sampleClothes[selectedCloth].cloth_name}
						sampleCloth_link={sampleClothes[selectedCloth].cloth_link}
					></SampleClothModal>
					<div id="close-buton-div">
						<button
							id="modal-close-button"
							data-testid="modal-close-button"
							onClick={() => {
								setModalOpen(false);
								setSelectedCloth(0);
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
