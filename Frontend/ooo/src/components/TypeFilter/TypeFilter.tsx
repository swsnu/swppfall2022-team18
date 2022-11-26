import React, { useState, useEffect } from "react";

export interface IProps {
	metaType: string | null;
	selectHandler: (value: string) => void;
}

const TypeFilter = (props: IProps) => {
	const [metaType, setMetaType] = useState<string | null>(props.metaType);

	const TopTypeOptions = [
		{ value: "상의 종류" },
		{ value: "반소매 티셔츠" },
		{ value: "피케/카라 티셔츠" },
		{ value: "긴소매 티셔츠" },
		{ value: "맨투맨/스웨트셔츠" },
		{ value: "민소매 티셔츠" },
		{ value: "후드 티셔츠" },
		{ value: "셔츠/블라우스" },
		{ value: "니트/스웨터" },
		{ value: "기타 상의" },
	];

	const BottomTypeOptions = [
		{ value: "하의 종류" },
		{ value: "데님 팬츠" },
		{ value: "숏 팬츠" },
		{ value: "코튼 팬츠" },
		{ value: "레깅스" },
		{ value: "슈트 팬츠/슬랙스" },
		{ value: "점프 슈트/오버올" },
		{ value: "트레이닝/조거 팬츠" },
		{ value: "기타 바지" },
	];

	const OuterTypeOptions = [
		{ value: "아우터 종류" },
		{ value: "후드 집업" },
		{ value: "환절기 코트" },
		{ value: "블루종/MA-1" },
		{ value: "겨울 싱글 코트" },
		{ value: "레더/라이더스 재킷" },
		{ value: "겨울 더블 코트" },
		{ value: "무스탕/퍼" },
		{ value: "겨울 기타 코트" },
		{ value: "롱패딩/롱헤비 아우터" },
		{ value: "트러커 재킷" },
		{ value: "슈트/블레이저 재킷" },
		{ value: "숏패딩/숏헤비 아우터" },
		{ value: "카디건" },
		{ value: "패딩 베스트" },
		{ value: "아노락 재킷" },
		{ value: "베스트" },
		{ value: "플리스/뽀글이" },
		{ value: "사파리/헌팅 재킷" },
		{ value: "트레이닝 재킷" },
		{ value: "나일론/코치 재킷" },
		{ value: "스타디움 재킷" },
		{ value: "기타 아우터" },
	];

	const NullTypeOptions = [{ value: "세부 종류" }];

	useEffect(() => {
		setMetaType(props.metaType);
	}, [props]);

	if (metaType == null) {
		return (
			<>
				<select id="type-select" disabled={true}>
					{NullTypeOptions.map((option, index) => (
						<option key={index} value={option.value}>
							{option.value}
						</option>
					))}
				</select>
			</>
		);
	} else if (metaType == "상의") {
		return (
			<>
				<select id="type-select">
					{TopTypeOptions.map((option, index) => (
						<option
							key={index}
							value={option.value}
							onClick={() => props.selectHandler(option.value)}
						>
							{option.value}
						</option>
					))}
				</select>
			</>
		);
	} else if (metaType == "하의") {
		return (
			<>
				<select id="type-select">
					{BottomTypeOptions.map((option, index) => (
						<option
							key={index}
							value={option.value}
							onClick={() => props.selectHandler(option.value)}
						>
							{option.value}
						</option>
					))}
				</select>
			</>
		);
	} else {
		return (
			<>
				<select id="type-select">
					{OuterTypeOptions.map((option, index) => (
						<option
							key={index}
							value={option.value}
							onClick={() => props.selectHandler(option.value)}
						>
							{option.value}
						</option>
					))}
				</select>
			</>
		);
	}
};

export default TypeFilter;
