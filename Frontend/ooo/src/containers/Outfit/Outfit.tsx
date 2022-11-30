import { logoutUser } from "../../api/user";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import FilterModal from "../../components/FilterModal/FilterModal";
import "./Outfit.css";
import Modal from "react-modal";
import { AppDispatch } from "../../store";
import outfit, { selectOutfit } from "../../store/slices/outfit";
import {
	fetchFilteredOutfits,
	FilterPostInputType,
} from "../../store/slices/outfit";

export interface IProps {
	userHave: boolean;
	recommend: boolean;
	type: string | null;
	color: string | null;
	pattern: string | null;
}

export default function Outfit(props: IProps) {
	const dispatch = useDispatch<AppDispatch>();
	const outfitState = useSelector(selectOutfit);

	const [userHave, setUserHave] = useState(false);
	const [recommend, setRecommend] = useState(false);
	const [clothFilter, setClothFilter] = useState(false);
	const [filters, setFilters] = useState({
		type: props.type,
		color: props.color,
		pattern: props.pattern,
	});
	const [modalOpen, setModalOpen] = useState(false);
	const [isLast, setIsLast] = useState(outfitState.isLast);

	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	const [isSending, setIsSending] = useState(false);
	const checkLoginned = () => {
		if (localStorage.getItem("username") !== null) {
			return true;
		} else return false;
	};

	useEffect(() => {
		//login check, redirect to login page
		const redirect = () => {
			if (!checkLoginned()) {
				navigate("/");
			}
		};
		redirect();
	}, [isSending]);

	useEffect(() => {
		//closet list, outfitlist 받아오는 것
		// console.log(userHave);
		const getData = async () => {
			const postInput: FilterPostInputType = {
				type: filters.type,
				color: filters.color,
				pattern: filters.pattern,
				userHave: userHave,
				recommend: recommend,
				cursor: (page - 1) * 9,
				pageSize: 9,
			};
			setIsLoading(true);
			dispatch(fetchFilteredOutfits(postInput));
			setIsLoading(false);
		};
		getData();
	}, [page, userHave, recommend, filters]);

	useEffect(() => {
		setIsLast(outfitState.isLast);
	}, [outfitState]);

	const clickUserHaveHandler = () => {
		if (userHave == true) setUserHave(false);
		else {
			setRecommend(false);
			setUserHave(true);
		}
		setPage(1);
	};

	const clickRecommendHandler = () => {
		if (recommend == true) setRecommend(false);
		else {
			setRecommend(true);
			setUserHave(false);
		}
		setPage(1);
	};

	const clickFilterHandler = () => {
		setModalOpen(true);
	};

	const clickDoneHandler = (
		type: string | null,
		color: string | null,
		pattern: string | null
	) => {
		setModalOpen(false);
		setClothFilter(true);
		setFilters({
			type: type,
			color: color,
			pattern: pattern,
		});
		setPage(1);
	};

	const clickResetHandler = () => {
		if (recommend || userHave || clothFilter) setPage(1);

		setRecommend(false);
		setUserHave(false);
		setClothFilter(false);
		setFilters({
			type: null,
			color: null,
			pattern: null,
		});
	};

	const clickNextPageHandler = () => {
		console.log(page);
		const currentPage = page;
		setPage(currentPage + 1);
	};

	const clickBeforePageHandler = () => {
		const currentPage = page;
		setPage(currentPage - 1);
	};

	const clickFirstPageHandler = () => {
		setPage(1);
	};

	const clickOutfitImageHandler = (outfit_id: number) => {
		const navigateLink = "/outfit/" + outfit_id + "/";
		navigate(navigateLink);
	};

	const clickTypeDeleteButton = () => {
		if (filters.color == null && filters.pattern == null) {
			setClothFilter(false);
		}
		const newFilter = {
			type: null,
			color: filters.color,
			pattern: filters.pattern,
		};
		setFilters(newFilter);
		setPage(1);
	};

	const clickColorDeleteButton = () => {
		if (filters.type == null && filters.pattern == null) {
			setClothFilter(false);
		}
		const newFilter = {
			type: filters.type,
			color: null,
			pattern: filters.pattern,
		};
		setFilters(newFilter);
		setPage(1);
	};

	const clickPatternDeleteButton = () => {
		if (filters.type == null && filters.color == null) {
			setClothFilter(false);
		}
		const newFilter = {
			type: filters.type,
			color: filters.color,
			pattern: null,
		};
		setFilters(newFilter);
		setPage(1);
		console.log(filters);
	};

	return (
		<div className="OutfitPage">
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
					<div className="now-filter-div">
						현재 필터 :
						{filters.type != null ? (
							<div className="now-type-filter-div">
								옷 종류 : {filters.type}
								<button
									className="type-filter-delete-button"
									onClick={() => clickTypeDeleteButton()}
								>
									delete
								</button>
							</div>
						) : (
							<></>
						)}
						{filters.color != null ? (
							<div className="now-color-filter-div">
								색 : {filters.color}
								<button
									className="color-filter-delete-button"
									onClick={() => clickColorDeleteButton()}
								>
									delete
								</button>
							</div>
						) : (
							<></>
						)}
						{filters.pattern != null ? (
							<div className="now-pattern-filter-div">
								패턴 : {filters.pattern}
								<button
									className="pattern-filter-delete-button"
									onClick={() => clickPatternDeleteButton()}
								>
									delete
								</button>
							</div>
						) : (
							<></>
						)}
					</div>

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
					{isLoading == true ? (
						<>
							<div className="loading-div">Loading...</div>
						</>
					) : (
						<>
							<div className="outfit-list-div">
								{outfitState.outfits.length == 0 ? (
									<>
										<div className="no-outfit-div">NO OUTFITS :(</div>
									</>
								) : (
									<>
										{outfitState.outfits.map((outfit, index) => {
											return (
												<div className="outfit-body" key={index}>
													<div className="OutfitImage">
														<img
															id="outfit-image"
															data-testid="outfit-image"
															src={outfit.image_link}
															onClick={() => clickOutfitImageHandler(outfit.id)}
														></img>
													</div>
													<div className="OutfitData">
														<text id="outfit-info-text">
															{outfit.outfit_info}
														</text>
													</div>
												</div>
											);
										})}
									</>
								)}
							</div>
						</>
					)}

					<div className="page-buttons-div">
						<div id="first-page-button-div">
							{page == 1 ? (
								<></>
							) : (
								<>
									<button
										id="first-page-button"
										data-testid="first-page-button"
										onClick={() => clickFirstPageHandler()}
									>
										처음으로
									</button>
								</>
							)}
						</div>
						<div id="before-page-button-div">
							{page == 1 ? (
								<></>
							) : (
								<>
									<button
										id="before-page-button"
										data-testid="before-page-button"
										onClick={() => clickBeforePageHandler()}
									>
										이전 페이지
									</button>
								</>
							)}
						</div>
						<div className="now-page-div">{page}</div>
						<div id="next-page-button-div">
							{isLast == true ? (
								<></>
							) : (
								<>
									<button
										id="next-page-button"
										data-testid="next-page-button"
										onClick={() => clickNextPageHandler()}
									>
										다음 페이지
									</button>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
