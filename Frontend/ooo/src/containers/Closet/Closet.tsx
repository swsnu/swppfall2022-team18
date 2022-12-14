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
	UserClothType,
} from "../../store/slices/userCloth";
import { AppDispatch } from "../../store";
import Modal from "react-modal";
import AddClothModal from "../../components/AddClothModal/AddClothModal";

const type_tree = [
	[
		["상의"],
		[
			"반소매 티셔츠",
			"피케/카라 티셔츠",
			"긴소매 티셔츠",
			"맨투맨/스웨트셔츠",
			"민소매 티셔츠",
			"후드 티셔츠",
			"셔츠/블라우스",
			"니트/스웨터",
			"기타 상의",
		],
	],
	[
		["하의"],
		[
			"데님 팬츠",
			"숏 팬츠",
			"코튼 팬츠",
			"레깅스",
			"슈트 팬츠/슬랙스",
			"점프 슈트/오버올",
			"트레이닝/조거 팬츠",
			"기타 바지",
		],
	],
	[
		["아우터"],
		[
			"후드 집업",
			"환절기 코트",
			"블루종/MA-1",
			"겨울 싱글 코트",
			"레더/라이더스 재킷",
			"겨울 더블 코트",
			"무스탕/퍼",
			"겨울 기타 코트",
			"롱패딩/롱헤비 아우터",
			"트러커 재킷",
			"슈트/블레이저 재킷",
			"숏패딩/숏헤비 아우터",
			"카디건",
			"패딩 베스트",
			"아노락 재킷",
			"베스트",
			"플리스/뽀글이",
			"사파리/헌팅 재킷",
			"트레이닝 재킷",
			"나일론/코치 재킷",
			"스타디움 재킷",
			"기타 아우터",
		],
	],
];

const TYPEOPTIONS = [
	{ value: "Type" },
	{ value: "상의" },
	{ value: "하의" },
	{ value: "아우터" },
];

type ClosetItem = {
	id: number;
	source_url: string;
	type: string;
	color: string;
	pattern: string;
};

export default function Closet() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const userClothState = useSelector(selectUserCloth);

	const [filterOption, setFilterOption] = useState("Type");
	const [addClothModalOpen, setAddClothModalOpen] = useState(false);
	const [submitted, setSubmitted] = useState<boolean>(false);
	const [filteredList, setFilteredList] = useState<UserClothType[]>(
		userClothState.userClothes
	);
	const [isLoading, setIsLoading] = useState(false);
	console.log(userClothState.userClothes);
	console.log(filteredList);

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
		const getData = async () => {
			setIsLoading(true);
			// await dispatch(fetchUserClothes());
			dispatch(fetchUserClothes());
			//change to
			//await
			setIsLoading(false);
		};
		getData();
		setSubmitted(false);
	}, [submitted]);

	useEffect(() => {
		getFilteredList(filterOption);
	}, [userClothState]);

	const getMetaType = (t: string) => {
		for (let i = 0; i < type_tree.length; i++) {
			if (type_tree[i][1].includes(t)) {
				return type_tree[i][0];
			}
		}
		return "";
	};

	const getFilteredList = (t: string) => {
		if (t === "Type") {
			setFilteredList(userClothState.userClothes);
		} else {
			const tmpUserCloth = userClothState.userClothes.filter((cloth) => {
				return t == getMetaType(cloth.type);
			});
			setFilteredList(tmpUserCloth);
		}
	};

	const selectFilterOption = (t: string) => {
		setFilterOption(t);
		getFilteredList(t);
	};

	const clickAddClothPopupHandler = () => {
		setAddClothModalOpen(true);
	};

	const clickAddClothDoneHandler = (metaType: string) => {
		setFilterOption(metaType); // 추가한 metatype을 return받아서 setfilteroption해줘야함
		setAddClothModalOpen(false);
		setSubmitted(true);
	};

	const clickOnDeleteHandler = () => {
		// setFilterOption(metaType); // 추가한 metatype을 return받아서 setfilteroption해줘야함
		setSubmitted(true);
	};

	return (
		<div className="Closet">
			<div className="Closet-header">
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

			<div className="ClosetTop">
				<div className="ClosetDiv">
					<div className="ClosetHead">
						<text id="Closet-text-main">Closet</text>
						<div id="Closet-select-div">
							<select
								id="type-select"
								data-testid="select-component"
								// defaultValue="Type"
								value={filterOption}
								onChange={(e) => {
									selectFilterOption(e.target.value);
								}}
							>
								{TYPEOPTIONS.map((option, index) => (
									<option key={index} value={option.value}>
										{option.value}
									</option>
								))}
							</select>
						</div>
						<button
							id="add-cloth-button"
							data-testid="add-cloth-button"
							onClick={clickAddClothPopupHandler}
						>
							Add
						</button>
						<Modal
							id="add-cloth-modal"
							data-testid="add-cloth-modal"
							isOpen={addClothModalOpen}
							// onRequestClose={() => setAddClothModalOpen(false)}
						>
							<div id="close-buton-div">
								<button
									id="modal-close-button"
									data-testid="modal-close-button"
									onClick={() => {
										setAddClothModalOpen(false);
									}}
								>
									닫기
								</button>
							</div>
							<AddClothModal
								modal_close={(metaType) => clickAddClothDoneHandler(metaType)}
							></AddClothModal>
						</Modal>
					</div>
					<div className="ClosetItems">
						{isLoading == true ? (
							<>
								<div className="loading-div">Loading...</div>
							</>
						) : (
							<>
								{filteredList.length !== 0 ? (
									filteredList.map((cloth, index) => {
										return (
											<ClosetItem
												key={index}
												user_cloth_id={String(cloth.id)}
												source_url={cloth.image_link}
												weardate={cloth.dates}
												metatype={cloth.name}
												type={cloth.type}
												color={cloth.color}
												pattern={cloth.pattern}
												tmp={clickOnDeleteHandler}
											/>
										);
									})
								) : (
									<div>
										<text id="add-cloth-text">옷을 추가해보세요!</text>
									</div>
								)}
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
