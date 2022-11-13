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

import neet from "../../assets/images/neet.jpg";
import hood from "../../assets/images/hood.jpg";
import pants from "../../assets/images/pants.jpg";
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

	const top_cloth_data_list = [
		{
			cloth_color: "베이지",
			cloth_name: "릴랙스 오버사이즈 크루넥 - 베이지 / CM1408",
			cloth_link: "https://www.musinsa.com/app/goods/957879/0",
			cloth_num: 957879,
			cloth_image:
				"https://image.msscdn.net/images/goods_img/20190219/957879/957879_6_500.jpg?t=20210727092552",
			cloth_pattern: "로고",
			cloth_type: "맨투맨/스웨트셔츠",
		},
		{
			cloth_color: "화이트",
			cloth_name: "릴렉스 핏 옥스포드 워크 셔츠 [화이트]",
			cloth_link: "https://www.musinsa.com/app/goods/1222009/0",
			cloth_num: 1222009,
			cloth_image:
				"https://image.msscdn.net/images/goods_img/20191113/1222009/1222009_1_500.jpg?t=20191113104338",
			cloth_pattern: "None",
			cloth_type: "셔츠/블라우스",
		},
	];
	const bottom_cloth_data_list = [
		{
			cloth_color: "연청",
			cloth_name: "와이드 데님 팬츠 (BLEACH)",
			cloth_link: "https://www.musinsa.com/app/goods/986708/0",
			cloth_num: 986708,
			cloth_image:
				"https://image.msscdn.net/images/goods_img/20190319/986708/986708_1_500.jpg?t=20220628154233",
			cloth_pattern: "None",
			cloth_type: "데님 팬츠",
		},
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
			cloth_color: "검정",
			cloth_name: "3-스트라이프 트레이닝 팬츠 - 블랙 / CM1409",
			cloth_link: "https://www.musinsa.com/app/goods/957880/0",
			cloth_num: 957880,
			cloth_image:
				"https://image.msscdn.net/images/goods_img/20190219/957880/957880_8_500.jpg?t=20210727113258",
			cloth_pattern: "스트라이프",
			cloth_type: "트레이닝/조거 팬츠",
		},
	];
	const outer_cloth_data_list = [
		{
			cloth_color: "그레이",
			cloth_name: "(SS19) Denim Trucker Jacket Grey",
			cloth_link: "https://www.musinsa.com/app/goods/969580/0",
			cloth_num: 969580,
			cloth_image:
				"https://image.msscdn.net/images/goods_img/20190228/969580/969580_1_500.jpg?t=20190228191158",
			cloth_pattern: "None",
			cloth_type: "트러커 재킷",
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
		{
			cloth_color: "블랙",
			cloth_name: "오버사이즈 블레이저 [블랙]",
			cloth_link: "https://www.musinsa.com/app/goods/1283757/0",
			cloth_num: 1283757,
			cloth_image:
				"https://image.msscdn.net/images/goods_img/20200130/1283757/1283757_1_500.jpg?t=20200130110037",
			cloth_pattern: "None",
			cloth_type: "슈트/블레이저 재킷",
		},
		{
			cloth_color: "그레이",
			cloth_name: "후디드 스웨트 집업_짧은 길이 [멜란지 그레이]",
			cloth_link: "https://www.musinsa.com/app/goods/1213655/0",
			cloth_num: 1213655,
			cloth_image:
				"https://image.msscdn.net/images/goods_img/20191105/1213655/1213655_2_500.jpg?t=20200706110939",
			cloth_pattern: "None",
			cloth_type: "후드 집업",
		},
		{
			cloth_color: "블랙",
			cloth_name: "라이트웨이트 밴딩 하프 슬랙스 [블랙]",
			cloth_link: "https://www.musinsa.com/app/goods/1079390/0",
			cloth_num: 1079390,
			cloth_image:
				"https://image.msscdn.net/images/goods_img/20190620/1079390/1079390_5_500.jpg?t=20210705143724",
			cloth_pattern: "None",
			cloth_type: "슈트 팬츠/슬랙스",
		},
	];

	return (
		<div className="Closet">
			<div className="Closet-header">
				<Header
					clickInfoHandler={() => {
						navigate("/");
					}}
					clickLogoutHandler={() => {
						logoutUser();
					}}
					clickHeaderHandler={() => {
						navigate("/home");
					}}
				></Header>
			</div>

			<div className="ClosetTop">
				<div className="ClosetDiv">
					<div className="ClosetHead">
						<div id="Closet-text-main">Closet</div>
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

					<div id="Closet-text-sub">Outwear</div>
					<div className="Closet-image-sub">
						<ClosetItem
							source_url={outer_cloth_data_list[0].cloth_image}
							type={outer_cloth_data_list[0].cloth_type}
							color={outer_cloth_data_list[0].cloth_color}
							pattern={outer_cloth_data_list[0].cloth_pattern}
							// clickClothDetailPopupHandler={() => setAddClothModalOpen}
						/>
						{/* {userClothState.userClothes.map((td) => { // userCloth.ts -> userClothes: []
                            return (
                                <ClosetItem
                                    key={td.id}
                                    source_url={"img/outfit/" + td.image_id + ".jpg"}
                                    type={td.type}
                                    color={td.color}
                                    pattern={td.pattern}
                                    // clickDetail={() => clickArticleHandler(td)} clickClothDetailPopupHandler는 컴포넌트에 구현되어있어야함
                                />
                            );
                        })} */}
					</div>

					<div id="Closet-text-sub">Top</div>
					<div className="Closet-image-sub">
						<ClosetItem
							source_url={top_cloth_data_list[0].cloth_image}
							type={top_cloth_data_list[0].cloth_type}
							color={top_cloth_data_list[0].cloth_color}
							pattern={top_cloth_data_list[0].cloth_pattern}
							// clickClothDetailPopupHandler={() => setClothDetailModalOpen}
						/>
						{/* <Modal isOpen={clothDetailModalOpen} onRequestClose={() => setClothDetailModalOpen(false)}>
                            <ClothDetailModal></ClothDetailModal>
                        </Modal> */}
						<ClosetItem
							source_url={top_cloth_data_list[1].cloth_image}
							type={top_cloth_data_list[1].cloth_type}
							color={top_cloth_data_list[1].cloth_color}
							pattern={top_cloth_data_list[1].cloth_pattern}
						/>
					</div>

					<div id="Closet-text-sub">Bottom</div>
					<div className="Closet-image-sub">
						<ClosetItem
							source_url={bottom_cloth_data_list[0].cloth_image}
							type={bottom_cloth_data_list[0].cloth_type}
							color={bottom_cloth_data_list[0].cloth_color}
							pattern={bottom_cloth_data_list[0].cloth_pattern}
						/>
						<ClosetItem
							source_url={bottom_cloth_data_list[1].cloth_image}
							type={bottom_cloth_data_list[1].cloth_type}
							color={bottom_cloth_data_list[1].cloth_color}
							pattern={bottom_cloth_data_list[1].cloth_pattern}
						/>
					</div>

					{/* closetItem 컴포넌트 가져오고, onclick clickClothDetailPopupHandler 달기 */}
					{/* 상의 div, 하의 div 나눠서 가져와야 함. 제목도 달고 */}
				</div>
			</div>
		</div>
	);
}
