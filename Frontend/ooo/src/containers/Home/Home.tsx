import { logoutUser } from "../../api/user";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import ClosetItem from "../../components/ClosetItem/ClosetItem";
import "./Home.css";
import OutfitPreview from "../../components/OutfitPreview/OutfitPreview";
import { AppDispatch } from "../../store";
import { selectUserCloth } from "../../store/slices/userCloth";
import { selectOutfit } from "../../store/slices/outfit";
import { fetchUserClothes } from "../../store/slices/userCloth";
import { fetchOutfits } from "../../store/slices/outfit";
import { fetchRecommendOutfit } from "../../store/slices/userCloth";

export default function Home() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const userClothes = useSelector(selectUserCloth);
	const outfit = useSelector(selectOutfit);
	const [Loading, setLoading] = useState(false);
	//for logout
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

	useEffect(() => {
		//closet list, outfitlist 받아오는 것
		const getData = async () => {
			setLoading(true);
			dispatch(fetchUserClothes());
			dispatch(fetchOutfits());
			dispatch(fetchRecommendOutfit());
			setLoading(false);
		};
		getData();
	}, []);

	if (Loading) {
		return <div>Loading..</div>;
	} else {
		return (
			<div className="Home">
				<div className="Home-header" data-testid="Header">
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

				<div className="HomeTop">
					<div className="ClosetDiv">
						<text id="Closet-text">Closet</text>
						<div className="Closet-image">
							<div className="Closet-item-box" data-testid="ClosetItem">
								{userClothes.userClothes.length !== 0 ? (
									userClothes.userClothes.map((cloth, index) => {
										while (index < 3) {
											return (
												<ClosetItem
													key={index}
													user_cloth_id={String(cloth.id)}
													source_url={cloth.image_link} //나중에 바꿔야함.
													weardate={cloth.dates}
													metatype={cloth.name}
													type={cloth.type}
													color={cloth.color}
													pattern={cloth.pattern}
												/>
											);
										}
									})
								) : (
									<div>
										<text id="add-cloth-text">옷을 추가해보세요!</text>
									</div>
								)}
							</div>
						</div>
						<div className="Closet-button">
							<button
								id="more-button"
								data-testid="more-btn"
								onClick={() => {
									navigate("/closet");
								}}
							>
								More
							</button>
						</div>
					</div>
					<div className="CenterDiv"></div>
					<div className="TodayOutfit" data-testid="TodayOutfit">
						<text id="TodayOutfit-text">Today{"'"}s Outfit</text>
						<div className="TodayOutfit-content">
							{userClothes.recommendOutfit !== null ? (
								<div>
									<div className="TodayOutfit-image">
										<img
											id="today-outfit-img"
											src={userClothes.recommendOutfit.image_link}
											data-testid="today-outfit-img"
										></img>
									</div>
									<div className="TodayOutfit-lable"
									data-testid = 'TodayOutfit-lable'>
										<text id="name-label">▶ 코디 설명</text>
										<text id="today-outfit-info-text">{userClothes.recommendOutfit.outfit_info}</text>
										<text id="name-label">▶ 구성 옷</text>
										{
											userClothes.recommendOutfit.userclothes.map((value, index) => {
												return(
													<div key={index}>
														<text id="today-cloth-name">{value.name}</text>
													</div>
												);
											}
										)}
										<button id="wear-button" data-testid="wear-button">
											오늘 입기
										</button>
									</div>
								</div>
							) : (
								<div style={{display: 'flex',
									flexWrap: 'nowrap',
									justifyContent: 'center',
									alignItems: 'flex-end'}}>
									<div className="TodayOutfit-image" style={{paddingLeft:'250px', width:'fit-content'}}>
										<text id="add-cloth-text"> 옷 추가해보세요! </text>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>

				<div className="HomeBottom">
					<div className="OutfitDiv">
						<div className="OutfitHead">
							<text id="Outfit-text">Outfit</text>
							<button
								id="outfit-more-button"
								data-testid="more-btn"
								onClick={() => {
									navigate("/outfit", {
										state: {
											userHave: false,
											type: null,
											color: null,
											pattern: null,
										},
									});
								}}
							>
								More
							</button>
						</div>
						<div className="OutfitImage" data-testid="OutfitPreview">
							{outfit.outfits.map((outfit, index) => {
								return (
									<div key={index} className="OutfitPreviewItem">
										<OutfitPreview
											key={index}
											source_url={outfit.image_link.toString()}
											info={outfit.outfit_info}
										/>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
