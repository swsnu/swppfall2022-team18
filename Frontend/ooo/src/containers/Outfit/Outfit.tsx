import { logoutUser } from "../../api/user";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import FilterModal from "../../components/FilterModal/FilterModal";
import ClosetItem from "../../components/ClosetItem/ClosetItem";
import OutfitPreview from "../../components/OutfitPreview/OutfitPreview";
import "./Outfit.css";
import Modal from "react-modal";

export default function Outfit() {
	const [userHave, setUserHave] = useState(false);
	const [recommend, setRecommend] = useState(false);
	const [clothFilter, setClothFilter] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);

	const outfits = [
		{
			name: "나쁠게 없어!",
			rank: 58575,
			info: "트러커 재킷과 스트라이프 패턴 티셔츠를 코디하고 데님 팬츠로 심플하게 연출한 캠퍼스 룩",
			purchase_link:
				"https://www.musinsa.com/app/styles/views/8679?use_yn_360=&style_type=&brand=&model=&tag_no=&max_rt=&min_rt=&display_cnt=60&list_kind=big&sort=view_cnt&page=1",
			cloth_links: [
				"https://www.musinsa.com/app/goods/952064/0",
				"https://www.musinsa.com/app/goods/858911/0",
			],
			image_url:
				"https://image.msscdn.net/images/style/detail/8679/detail_8679_1_500.jpg",
			cloth_names: ["", ""],
		},
		{
			name: "그레이의 향연",
			rank: 70650,
			info: "라이트 그레이 컬러의 재킷과 스웨트셔츠를 루즈 핏 데님 팬츠로 마무리한 캐주얼 룩",
			purchase_link:
				"https://www.musinsa.com/app/styles/views/11748?use_yn_360=&style_type=&brand=&model=&tag_no=&max_rt=&min_rt=&display_cnt=60&list_kind=big&sort=view_cnt&page=1",
			cloth_links: [
				"https://www.musinsa.com/app/goods/969580/0",
				"https://www.musinsa.com/app/goods/986708/0",
			],
			image_url:
				"http://image.msscdn.net/images/style/list/l_3_2019083016104600000076635.jpg",
			cloth_names: [""],
		},
		{
			name: "스포티룩",
			rank: 58365,
			info: "화사한 아이보리 컬러의 스웨트셔츠와 트랙 팬츠를 매치하고 독특한 디자인의 캡으로 마무리한 이지 캐주얼 룩",
			purchase_link:
				"https://www.musinsa.com/app/styles/views/8412?use_yn_360=&style_type=&brand=&model=&tag_no=&max_rt=&min_rt=&display_cnt=60&list_kind=big&sort=view_cnt&page=1",
			cloth_links: [
				"https://www.musinsa.com/app/goods/957879/0",
				"https://www.musinsa.com/app/goods/957880/0",
			],
			image_url:
				"https://image.msscdn.net/images/style/detail/8412/detail_8412_1_500.jpg",
			cloth_names: ["", ""],
		},
		{
			name: "꾸러기 룩",
			rank: 48366,
			info: "오버사이즈 핏의 블레이저와 쇼츠를 매치하고 볼캡과 타이로 포인트를 더한 캐주얼 룩",
			purchase_link:
				"https://www.musinsa.com/app/styles/views/14460?use_yn_360=&style_type=&brand=&model=&tag_no=&max_rt=&min_rt=&display_cnt=60&list_kind=big&sort=view_cnt&page=1",
			cloth_links: [
				"https://www.musinsa.com/app/goods/1283757/0",
				"https://www.musinsa.com/app/goods/1222009/0",
				"https://www.musinsa.com/app/goods/1213655/0",
			],
			image_url:
				"https://image.msscdn.net/images/style/detail/14460/detail_14460_1_500.jpg",
			cloth_names: ["", ""],
		},
		{
			name: "스트리트 캐주얼",
			rank: 45991,
			info: "레트로 감성의 윈드 브레이커 재킷에 카고 팬츠와 스니커즈를 더한 스트릿 캐주얼 룩",
			purchase_link:
				"https://www.musinsa.com/app/styles/views/4476?use_yn_360=&style_type=&brand=&model=&tag_no=&max_rt=&min_rt=&display_cnt=60&list_kind=big&sort=view_cnt&page=1",
			cloth_links: ["https://www.musinsa.com/app/goods/573121/0"],
			image_url:
				"https://image.msscdn.net/images/style/detail/4476/detail_4476_1_500.jpg",
			cloth_names: ["", ""],
		},
		{
			name: "심플한데 멋져!",
			rank: 45465,
			info: "럭비 스타일의 스웨트셔츠에 크림 컬러 팬츠를 매치하고 캔버스 백을 들어 완성한 캐주얼 룩",
			purchase_link:
				"https://www.musinsa.com/app/styles/views/22571?use_yn_360=&style_type=&brand=&model=&tag_no=&max_rt=&min_rt=&display_cnt=60&list_kind=big&sort=view_cnt&page=1",
			cloth_links: [
				"https://www.musinsa.com/app/goods/2038497/0",
				"https://www.musinsa.com/app/goods/1930474/0",
			],
			image_url:
				"https://image.msscdn.net/images/style/detail/22571/detail_22571_2_500.jpg",
			cloth_names: ["", ""],
		},
		{
			name: "자연스러운 핏의 워싱 데님 팬츠",
			rank: 39448,
			info: "B 로고가 들어간 네이비 컬러 캡 BLUE YARD 39,000원선명한 색상과 움직임에 따라 다른 빛깔이 보이는 투 톤 컬러 MA-1 UNIS DESIGN 98,000원팔 부분의 그래픽이 포인트인 후드 티셔츠 BLUE YARD 75,000원이너로 입은 롱 슬리브 티셔츠 CRITIC 43,000원자연스러운 핏의 워싱 데님 팬츠 UNIS DESIGN 75,000원호랑이 일러스트가 그려진 에코백 BLUE YARD 19,000원삼선이 포인트인 레더 소재의 슈퍼스타 스니커즈 ADIDAS 119,000원",
			purchase_link:
				"https://www.musinsa.com/app/styles/views/1420?use_yn_360=&style_type=&brand=&model=&tag_no=&max_rt=&min_rt=&display_cnt=60&list_kind=big&sort=view_cnt&page=1",
			cloth_links: ["https://www.musinsa.com/app/goods/479472/0"],
			image_url:
				"https://image.msscdn.net/images/style/detail/1420/detail_1420_1_500.jpg",
			cloth_names: ["", ""],
		},
		{
			name: "빈티지한 디자인의 플라이트 재킷",
			rank: 38804,
			info: "빈티지한 디자인의 플라이트 재킷 87MM_SEOUL 172,000원로고를 펠트 자수로 새긴 스포티한 후디 COVERNAT 79,000원허리 부분에 스트링으로 사이즈 조절이 편리한 카고 팬츠 BESLOW 118,000원두 개의 포켓과 레더 플랩으로 포인트를 준 크로스백 BRADYBAGS 439,000원코튼 소재 버킷햇 LEATA 43,000원독특한 밑창이 포인트인 볼트 로우 EXCELSIOR 59,000원",
			purchase_link:
				"https://www.musinsa.com/app/styles/views/1379?use_yn_360=&style_type=&brand=&model=&tag_no=&max_rt=&min_rt=&display_cnt=60&list_kind=big&sort=view_cnt&page=1",
			cloth_links: ["https://www.musinsa.com/app/goods/435580/0"],
			image_url:
				"https://image.msscdn.net/images/style/detail/1379/detail_1379_1_500.jpg",
			cloth_names: ["", ""],
		},
		{
			name: "언제나 든든해",
			rank: 36898,
			info: "체크 패턴의 재킷과 데님 팬츠로 깔끔하게 연출한 세미 포멀 룩",
			purchase_link:
				"https://www.musinsa.com/app/styles/views/15056?use_yn_360=&style_type=&brand=&model=&tag_no=&max_rt=&min_rt=&display_cnt=60&list_kind=big&sort=view_cnt&page=1",
			cloth_links: [
				"https://www.musinsa.com/app/goods/1292227/0",
				"https://www.musinsa.com/app/goods/1117534/0",
				"https://www.musinsa.com/app/goods/1321881/0",
			],
			image_url:
				"https://image.msscdn.net/images/style/detail/15056/detail_15056_1_500.jpg",
			cloth_names: ["", ""],
		},
	];

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

	const clickResetHandler = () => {
		setRecommend(false);
		setUserHave(false);
		setClothFilter(false);
	};

	const clickOutfitImageHandler = () => {
		navigate("1/");
	};

	return (
		<div className="OutfitPage">
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
						recomment
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
				<Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}>
					<FilterModal></FilterModal>
				</Modal>
				<div className="OutfitImages">
					{outfits.map((outfit) => {
						return (
							<div className="outfit-body" key={outfit.name}>
								<div className="OutfitImage">
									<img
										id="outfit-image"
										src={outfit.image_url}
										onClick={() => clickOutfitImageHandler()}
									></img>
								</div>
								<div className="OutfitData">
									<text id="outfit-info-text">{outfit.info}</text>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
