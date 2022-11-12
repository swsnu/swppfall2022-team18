import { logoutUser } from "../../api/user";
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
//import { useDispatch, useSelector } from "react-redux";
import ClosetItem from "../../components/ClosetItem/ClosetItem";
import "./Home.css";
import OutfitPreview from "../../components/OutfitPreview/OutfitPreview";
//import { AppDispatch } from "../../../store";

export default function Home() {
	const navigate = useNavigate();
	//const dispatch = useDispatch<AppDispatch>();
	//const clothlists = useSelector(selectCloth);
	//const outfitlist = useSelector(selectOutfit).outfits;
	//const [Loading, setLoading] = useState(false);

	const today_codi = {
		codi_name: "그레이의 향연",
		rank: 70650,
		explain:
			"라이트 그레이 컬러의 재킷과 스웨트셔츠를 루즈 핏 데님 팬츠로 마무리한 캐주얼 룩",
		codi_link:
			"https://www.musinsa.com/app/styles/views/11748?use_yn_360=&style_type=&brand=&model=&tag_no=&max_rt=&min_rt=&display_cnt=60&list_kind=big&sort=view_cnt&page=1",
		cloth_links: [
			"https://www.musinsa.com/app/goods/969580/0",
			"https://www.musinsa.com/app/goods/986708/0",
		],
		codi_image:
			"http://image.msscdn.net/images/style/list/l_3_2019083016104600000076635.jpg",
	};
	const outfit_clothes = [
		[
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
				cloth_color: "연청",
				cloth_name: "와이드 데님 팬츠 (BLEACH)",
				cloth_link: "https://www.musinsa.com/app/goods/986708/0",
				cloth_num: 986708,
				cloth_image:
					"https://image.msscdn.net/images/goods_img/20190319/986708/986708_1_500.jpg?t=20220628154233",
				cloth_pattern: "None",
				cloth_type: "데님 팬츠",
			},
		],
		[
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
				cloth_color: "중청",
				cloth_name: "와이드 데님 팬츠 (LIGHT BLUE)",
				cloth_link: "https://www.musinsa.com/app/goods/858911/0",
				cloth_num: 858911,
				cloth_image:
					"https://image.msscdn.net/images/goods_img/20180914/858911/858911_6_500.jpg?t=20220628150414",
				cloth_pattern: "None",
				cloth_type: "데님 팬츠",
			},
		],
		[
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
				cloth_color: "검정",
				cloth_name: "3-스트라이프 트레이닝 팬츠 - 블랙 / CM1409",
				cloth_link: "https://www.musinsa.com/app/goods/957880/0",
				cloth_num: 957880,
				cloth_image:
					"https://image.msscdn.net/images/goods_img/20190219/957880/957880_8_500.jpg?t=20210727113258",
				cloth_pattern: "스트라이프",
				cloth_type: "트레이닝/조거 팬츠",
			},
		],
	];
	const today_clothes = [
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
			cloth_color: "그레이",
			cloth_name: "(SS19) Denim Trucker Jacket Grey",
			cloth_link: "https://www.musinsa.com/app/goods/969580/0",
			cloth_num: 969580,
			cloth_image:
				"https://image.msscdn.net/images/goods_img/20190228/969580/969580_1_500.jpg?t=20190228191158",
			cloth_pattern: "None",
			cloth_type: "트러커 재킷",
		},
	];
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
	const codi_data_list = [
		{
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
		},
		{
			codi_name: "그레이의 향연",
			rank: 70650,
			explain:
				"라이트 그레이 컬러의 재킷과 스웨트셔츠를 루즈 핏 데님 팬츠로 마무리한 캐주얼 룩",
			codi_link:
				"https://www.musinsa.com/app/styles/views/11748?use_yn_360=&style_type=&brand=&model=&tag_no=&max_rt=&min_rt=&display_cnt=60&list_kind=big&sort=view_cnt&page=1",
			cloth_links: [
				"https://www.musinsa.com/app/goods/969580/0",
				"https://www.musinsa.com/app/goods/986708/0",
			],
			codi_image:
				"http://image.msscdn.net/images/style/list/l_3_2019083016104600000076635.jpg",
		},
		{
			codi_name: "스포티룩",
			rank: 58365,
			explain:
				"화사한 아이보리 컬러의 스웨트셔츠와 트랙 팬츠를 매치하고 독특한 디자인의 캡으로 마무리한 이지 캐주얼 룩",
			codi_link:
				"https://www.musinsa.com/app/styles/views/8412?use_yn_360=&style_type=&brand=&model=&tag_no=&max_rt=&min_rt=&display_cnt=60&list_kind=big&sort=view_cnt&page=1",
			cloth_links: [
				"https://www.musinsa.com/app/goods/957879/0",
				"https://www.musinsa.com/app/goods/957880/0",
			],
			codi_image:
				"https://image.msscdn.net/images/style/detail/8412/detail_8412_1_500.jpg",
		},
		{
			codi_name: "꾸러기 룩",
			rank: 48366,
			explain:
				"오버사이즈 핏의 블레이저와 쇼츠를 매치하고 볼캡과 타이로 포인트를 더한 캐주얼 룩",
			codi_link:
				"https://www.musinsa.com/app/styles/views/14460?use_yn_360=&style_type=&brand=&model=&tag_no=&max_rt=&min_rt=&display_cnt=60&list_kind=big&sort=view_cnt&page=1",
			cloth_links: [
				"https://www.musinsa.com/app/goods/1283757/0",
				"https://www.musinsa.com/app/goods/1222009/0",
				"https://www.musinsa.com/app/goods/1213655/0",
			],
			codi_image:
				"https://image.msscdn.net/images/style/detail/14460/detail_14460_1_500.jpg",
		},
		{
			codi_name: "스트리트 캐주얼",
			rank: 45991,
			explain:
				"레트로 감성의 윈드 브레이커 재킷에 카고 팬츠와 스니커즈를 더한 스트릿 캐주얼 룩",
			codi_link:
				"https://www.musinsa.com/app/styles/views/4476?use_yn_360=&style_type=&brand=&model=&tag_no=&max_rt=&min_rt=&display_cnt=60&list_kind=big&sort=view_cnt&page=1",
			cloth_links: ["https://www.musinsa.com/app/goods/573121/0"],
			codi_image:
				"https://image.msscdn.net/images/style/detail/4476/detail_4476_1_500.jpg",
		},
		{
			codi_name: "심플한데 멋져!",
			rank: 45465,
			explain:
				"럭비 스타일의 스웨트셔츠에 크림 컬러 팬츠를 매치하고 캔버스 백을 들어 완성한 캐주얼 룩",
			codi_link:
				"https://www.musinsa.com/app/styles/views/22571?use_yn_360=&style_type=&brand=&model=&tag_no=&max_rt=&min_rt=&display_cnt=60&list_kind=big&sort=view_cnt&page=1",
			cloth_links: [
				"https://www.musinsa.com/app/goods/2038497/0",
				"https://www.musinsa.com/app/goods/1930474/0",
			],
			codi_image:
				"https://image.msscdn.net/images/style/detail/22571/detail_22571_2_500.jpg",
		},
		{
			codi_name: "자연스러운 핏의 워싱 데님 팬츠",
			rank: 39448,
			explain:
				"B 로고가 들어간 네이비 컬러 캡 BLUE YARD 39,000원선명한 색상과 움직임에 따라 다른 빛깔이 보이는 투 톤 컬러 MA-1 UNIS DESIGN 98,000원팔 부분의 그래픽이 포인트인 후드 티셔츠 BLUE YARD 75,000원이너로 입은 롱 슬리브 티셔츠 CRITIC 43,000원자연스러운 핏의 워싱 데님 팬츠 UNIS DESIGN 75,000원호랑이 일러스트가 그려진 에코백 BLUE YARD 19,000원삼선이 포인트인 레더 소재의 슈퍼스타 스니커즈 ADIDAS 119,000원",
			codi_link:
				"https://www.musinsa.com/app/styles/views/1420?use_yn_360=&style_type=&brand=&model=&tag_no=&max_rt=&min_rt=&display_cnt=60&list_kind=big&sort=view_cnt&page=1",
			cloth_links: ["https://www.musinsa.com/app/goods/479472/0"],
			codi_image:
				"https://image.msscdn.net/images/style/detail/1420/detail_1420_1_500.jpg",
		},
		{
			codi_name: "빈티지한 디자인의 플라이트 재킷",
			rank: 38804,
			explain:
				"빈티지한 디자인의 플라이트 재킷 87MM_SEOUL 172,000원로고를 펠트 자수로 새긴 스포티한 후디 COVERNAT 79,000원허리 부분에 스트링으로 사이즈 조절이 편리한 카고 팬츠 BESLOW 118,000원두 개의 포켓과 레더 플랩으로 포인트를 준 크로스백 BRADYBAGS 439,000원코튼 소재 버킷햇 LEATA 43,000원독특한 밑창이 포인트인 볼트 로우 EXCELSIOR 59,000원",
			codi_link:
				"https://www.musinsa.com/app/styles/views/1379?use_yn_360=&style_type=&brand=&model=&tag_no=&max_rt=&min_rt=&display_cnt=60&list_kind=big&sort=view_cnt&page=1",
			cloth_links: ["https://www.musinsa.com/app/goods/435580/0"],
			codi_image:
				"https://image.msscdn.net/images/style/detail/1379/detail_1379_1_500.jpg",
		},
		{
			codi_name: "언제나 든든해",
			rank: 36898,
			explain: "체크 패턴의 재킷과 데님 팬츠로 깔끔하게 연출한 세미 포멀 룩",
			codi_link:
				"https://www.musinsa.com/app/styles/views/15056?use_yn_360=&style_type=&brand=&model=&tag_no=&max_rt=&min_rt=&display_cnt=60&list_kind=big&sort=view_cnt&page=1",
			cloth_links: [
				"https://www.musinsa.com/app/goods/1292227/0",
				"https://www.musinsa.com/app/goods/1117534/0",
				"https://www.musinsa.com/app/goods/1321881/0",
			],
			codi_image:
				"https://image.msscdn.net/images/style/detail/15056/detail_15056_1_500.jpg",
		},
	];

	//useEffect(()=>{
	//closet list, outfitlist 받아오는 것
	//	setLoading(true)
	//dispatch(fetchClothes())
	//	dispatch(fetchOutfits());
	//	setLoading(false)
	//},[])


	//if (Loading) {
	//	return <div>Loading..</div>;
	//} else {
		return (
			<div className="Home">
				<div className="Home-header"
					data-testid='Header'>
					<Header
						clickInfoHandler={() => {
							navigate("/");
						}}
						clickLogoutHandler={() => {
						//	logoutUser();
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
							{/*outer_cloth_data_list.length > 2 ? (*/}
								<div className="Closet-item-box"
								data-testid='ClosetItem'>
									<ClosetItem
										source_url={outer_cloth_data_list[0].cloth_image}
										type={outer_cloth_data_list[0].cloth_type}
										color={outer_cloth_data_list[0].cloth_color}
										pattern={outer_cloth_data_list[0].cloth_pattern}
										clickClothDetailPopupHandler={() => {
											//navigate(
											//	"/outfit/${outer_cloth_data_list[0].cloth_num}/"
											//);
										}}
									/>
									<ClosetItem
										source_url={top_cloth_data_list[0].cloth_image}
										type={top_cloth_data_list[0].cloth_type}
										color={top_cloth_data_list[0].cloth_color}
										pattern={top_cloth_data_list[0].cloth_pattern}
										clickClothDetailPopupHandler={() => {
										//	navigate("/outfit/${top_cloth_data_list[0].cloth_num}/");
										}}
									/>
									<ClosetItem
										source_url={bottom_cloth_data_list[0].cloth_image}
										type={bottom_cloth_data_list[0].cloth_type}
										color={bottom_cloth_data_list[0].cloth_color}
										pattern={bottom_cloth_data_list[0].cloth_pattern}
										clickClothDetailPopupHandler={() => {
											//navigate(
											//	"/outfit/${bottom_cloth_data_list[0].cloth_num}/"
											//);
										}}
									/>
								</div>
							{/*) : (
								<div className="Closet-item-box"
								data-testid='ClosetItem'>
									{
										//closetlist.map((cloth, index)=>{
										//	<div id={index}>
										//		<ClosetItem
										//			data-testid='ClosetItem'
										//			source_url={cloth.image_id}
										//			type={cloth.type}
										//			color={cloth.color}
										//			pattern={cloth.pattern}
										//			clickClothDetailPopupHandler={()=>{ navigate('/outfit/${cloth.image_id}/')}}
										//		/>
										//	</div>
										//}
										//)
									}
								</div>
								)}*/}
						</div>
						<div className="Closet-button">
							<button
								id="more-button"
								data-testid='more-btn'
								onClick={() => {
									navigate("/closet");
								}}
							>
								More
							</button>
						</div>
					</div>
					<div className="CenterDiv"></div>
					<div className="TodayOutfit"
					data-testid='TodayOutfit'>
						<text id="TodayOutfit-text">Today{"'"}s Outfit</text>
						<div className="TodayOutfit-content">
							<div className="TodayOutfit-image" >
								<img id="today-outfit-img" src={today_codi.codi_image} data-testid = 'today-outfit-img'></img>
							</div>
							<div className="TodayOutfit-lable"
							data-testid = 'TodayOutfit-lable'>
								<text id="today-outfit-info-text">{today_codi.codi_name}</text>
								<text id="today-cloth-name">{today_clothes[0].cloth_name}</text>
								<text id="today-cloth-name">{today_clothes[1].cloth_name}</text>
								<button id="wear-button" data-testid='wear-button'>오늘 입기</button>
							</div>
						</div>
					</div>
				</div>

				<div className="HomeBottom">
					<div className="OutfitDiv">
						<div className="OutfitHead">
							<text id="Outfit-text">Outfit</text>
							<button
								id="outfit-more-button"
								data-testid='more-btn'
								onClick={() => {
									navigate("/outfit");
								}}
							>
								More
							</button>
						</div>
						<div className="OutfitImage">
							{/*{codi_data_list.length > 2 ? (*/}
								<div className="Outfit-item-box"
								data-testid='OutfitPreview'>
									<OutfitPreview
										source_url={codi_data_list[0].codi_image}
										info={codi_data_list[0].explain}
										cloth_names={outfit_clothes[0].map((cloth) => {
											return cloth.cloth_name + " ";
										})}
									/>
									<OutfitPreview
										source_url={codi_data_list[1].codi_image}
										info={codi_data_list[1].explain}
										cloth_names={outfit_clothes[1].map((cloth) => {
											return cloth.cloth_name + " ";
										})}
									/>
									<OutfitPreview
										source_url={codi_data_list[2].codi_image}
										info={codi_data_list[2].explain}
										cloth_names={outfit_clothes[2].map((cloth) => {
											return cloth.cloth_name + " ";
										})}
									/>
								</div>
							{/*}) : (
								<div className="Outfit-item-box"
								data-testid='OutfitPreview'>
									{
										//codi_data_list.map((cloth, index)=>{
										//	<div id={index}>
										//		<OutfitPreview
										//			data-testid='OutfitPreview'
										//			source_url={cloth.codi_image}
										//		    info={cloth.explain}
										//			cloth_names={outfit_clothes[index].map((c, i)=>{
										//			return c.cloth_name + " "
										//		/>
										//	</div>
										//}
										//)
									}
								</div>
								)}*/}
						</div>
					</div>
				</div>
			</div>
		);
//	}
}