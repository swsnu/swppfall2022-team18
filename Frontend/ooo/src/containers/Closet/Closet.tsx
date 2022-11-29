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
	UserClothType,
} from "../../store/slices/userCloth";
import { AppDispatch } from "../../store";
import Modal from "react-modal";

import AddClothModal from "../../components/AddClothModal/AddClothModal";
// import ClothDetailModal from '../../components/ClothDetailModal/ClothDetailModal'

type ClosetItem = {
	id: number;
	source_url: string;
	type: string;
	color: string;
	pattern: string;
};

export default function Closet() {
	const type_tree =  [
		[['상의'], ['반소매 티셔츠', '피케/카라 티셔츠', '긴소매 티셔츠', '맨투맨/스웨트셔츠', '민소매 티셔츠', '후드 티셔츠', '셔츠/블라우스', '니트/스웨터', '기타 상의']], 
		[['바지'], ['데님 팬츠', '숏 팬츠', '코튼 팬츠', '레깅스', '슈트 팬츠/슬랙스', '점프 슈트/오버올', '트레이닝/조거 팬츠', '기타 바지']], 
		[['아우터'], ['후드 집업', '환절기 코트', '블루종/MA-1', '겨울 싱글 코트', '레더/라이더스 재킷', '겨울 더블 코트',
				'무스탕/퍼', '겨울 기타 코트', '롱패딩/롱헤비 아우터', '트러커 재킷', '슈트/블레이저 재킷', '숏패딩/숏헤비 아우터', '카디건', '패딩 베스트', '아노락 재킷',
				'베스트', '플리스/뽀글이', '사파리/헌팅 재킷', '트레이닝 재킷', '나일론/코치 재킷', '스타디움 재킷', '기타 아우터']]]
	
	const TYPEOPTIONS = [
		{ value: "Type" },
		{ value: "상의" },
		{ value: "바지" },
		{ value: "아우터" },
	];
	
	const navigate = useNavigate();
	const userClothState = useSelector(selectUserCloth);
	const dispatch = useDispatch<AppDispatch>();

	const [addClothModalOpen, setAddClothModalOpen] = useState(false);
	const [filteredList, setFilteredList] = useState<UserClothType[]>([]);


	const clickAddClothPopupHandler = () => {
		setAddClothModalOpen(true);
	};

	const getType = (t:string) => {
		for(let i =0; i< type_tree.length; i++){
			if(t in type_tree[i][1]){
				return type_tree[i][0]
			}
		}
		return ""
	}

	//for logout
	const [isSending, setIsSending] = useState(false)
	const checkLoginned = () => {
		if(localStorage.getItem("username") !== null){
			return true
		}
		else return false
	};

	const filter_list = (t:string) => {
		if(t === 'type'){
			setFilteredList(userClothState.userClothes)
		}
		else{
			const tmpUserCloth = userClothState.userClothes.filter((cloth) => {t === getType(cloth.type)})
			setFilteredList(tmpUserCloth)
		}
	}

	useEffect(() => {
		dispatch(fetchUserClothes());
		filter_list('type');
	}, []);


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
			</div>

			<div className="ClosetTop">
				<div className="ClosetDiv">
					<div className="ClosetHead">
						<text id="Closet-text-main">Closet</text>
						<div id='Closet-select-div'>
							<select id="type-select" 
							data-testid="select-component"
							onChange={(e) => {filter_list(e.target.value)}}>
								{TYPEOPTIONS.map((option, index) => (
									<option key={index} value={option.value} >
										{option.value}
									</option>
								))}
							</select>
						</div>
						<button id="add-cloth-button" data-testid="add-cloth-button" onClick={clickAddClothPopupHandler}>
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
						filteredList.length !== 0 ? filteredList.map((cloth, index) => {
							return(
								<ClosetItem
								key={index}
								source_url={cloth.image_link}
								type={cloth.type}
								color={cloth.color}
								pattern={cloth.pattern}
							/>
							)
						})
					:
					<div>
						<text id='add-cloth-text'>옷을 추가해보세요!</text>
					</div>
					}
				</div>
			</div>
		</div>
	);
}
