import { logoutUser } from "../../api/user";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import FilterModal from "../../components/FilterModal/FilterModal";
import "./Outfit.css";
import Modal from "react-modal";
import { AppDispatch } from "../../store";
import { selectOutfit } from "../../store/slices/outfit";
import { fetchOutfits } from "../../store/slices/outfit";

export default function Outfit() {
	const [userHave, setUserHave] = useState(false);
	const [recommend, setRecommend] = useState(false);
	const [clothFilter, setClothFilter] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false)
	const dispatch = useDispatch<AppDispatch>();
	const outfitState = useSelector(selectOutfit);

	const navigate = useNavigate();
	//get current filter and save in local storage -> toggle button

	//make cursor

	//call api POST outfit/ to fetch filtered outfit

	//print all outfits

	//make outfit image as button to navigate to outfit detail page

	const clickUserHaveHandler = () => {
		if (userHave == true) setUserHave(false);
		else {
			setRecommend(false);
			setUserHave(true);
		}
	};

	const clickRecommendHandler = () => {
		if (recommend == true) setRecommend(false);
		else {
			setRecommend(true);
			setUserHave(false);
		}
	};

	const clickFilterHandler = () => {
		setModalOpen(true);
	};

	const clickDoneHandler = () => {
		setModalOpen(false);
		setClothFilter(true);
	};

	const clickResetHandler = () => {
		setRecommend(false);
		setUserHave(false);
		setClothFilter(false);
	};

	const [isSending, setIsSending] = useState(false)
	const checkLoginned = () => {
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

	useEffect(()=>{
		//closet list, outfitlist 받아오는 것
			const getData = async() => {
				setIsLoading(true)
				dispatch(fetchOutfits());
				setIsLoading(false)
			}
			getData()
		},[])

	return (
		<div className="OutfitPage">
			<Header
				clickInfoHandler={() => {
					navigate("/setting");
				}}
				clickLogoutHandler={async() => {
					await logoutUser().catch((error) => console.log(error))
					setIsSending(!isSending)
				}}
				clickHeaderHandler={() => {
					navigate("/home");
				}}
			></Header>
			<div className="OutfitBody">
				<div className="OutfitTitle">Outfits</div>
				<div className="OutfitButtons">
					<button
						id={userHave ? "userhave-button-on" : "userhave-button"}
						onClick={() => clickUserHaveHandler()}
					>
						userHave
					</button>
					<button
						id={recommend ? "recommend-button-on" : "recommend-button"}
						onClick={() => clickRecommendHandler()}
					>
						recommend
					</button>
					<button
						id={clothFilter ? "filter-button-on" : "filter-button"}
						onClick={() => clickFilterHandler()}
					>
						Filter
					</button>
					<button id="filter-reset-button" onClick={() => clickResetHandler()}>
						Reset
					</button>
				</div>
				<Modal id="filter-modal" isOpen={modalOpen}>
					<FilterModal clickDoneHandler={clickDoneHandler}></FilterModal>
					<div id="close-buton-div">
						<button
							id="modal-close-button"
							data-testid="modal-close-button"
							onClick={() => {
								setModalOpen(false);
							}}
						>
							닫기
						</button>
					</div>
				</Modal>
				<div className="OutfitImages">
					{outfitState.outfits.map((outfit, index) => {
						return (
							<div className="outfit-body" key={index}>
								<div className="OutfitImage">
									<img
										id="outfit-image"
										data-testid="outfit-image"
										src={outfit.image_link}
									></img>
								</div>
								<div className="OutfitData">
									<text id="outfit-info-text">{outfit.outfit_info}</text>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
