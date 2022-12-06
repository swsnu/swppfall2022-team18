import React from "react";
import "./FilterModal.css";
import { useState } from "react";
import TypeFilter from "../TypeFilter/TypeFilter";
import { GithubPicker } from "react-color";

export interface IProps {
	clickDoneHandler: (
		type: string | null,
		color: string | null,
		pattern: string | null
	) => void;
}

const FilterModal = (props: IProps) => {
	const [type, setType] = useState<string | null>(null);
	const [color, setColor] = useState<string | null>(null);
	const [pattern, setPattern] = useState<string | null>(null);
	const [metaType, setMetaType] = useState<string | null>(null);
	const [colorHex, setColorHex] = useState<string>("");

	const PatternOptions = [
		{ value: "Pattern" },
		{ value: "None" },
		{ value: "로고" },
		{ value: "스트라이프" },
		{ value: "체크" },
		{ value: "자수" },
	];

	const MetaTypeOptions = [
		{ value: "옷 종류" },
		{ value: "상의" },
		{ value: "하의" },
		{ value: "아우터" },
	];

	const COLOROPTIONS = [
		"#0e0e0e",
		"#9c9c9b",
		"#011e66",
		"#2508ff",
		"#1f4582",
		"#b5cbde",
		"#242d42",
		"",
		"#5b5a34",
		"#06b002",
		"#7f290c",
		"#ff0000",
		"#fe2900",
		"#feea00",
		"#f1c276",
		"#feffed",
		"#ffffff",
		"#570070",
		"#ff00a1",
		"#00c4ab",
		"rainbow",
	];
	const COLORREF = [
		"블랙",
		"그레이",
		"네이비",
		"블루",
		"데님",
		"연청",
		"진청",
		"청",
		"카키",
		"그린",
		"브라운",
		"레드",
		"오렌지",
		"옐로우",
		"베이지",
		"아이보리",
		"화이트",
		"퍼플",
		"핑크",
		"민트",
		"기타색상",
	];

	const clickMetaTypeOptionHandler = (value: string) => {
		if (value == "옷 종류") {
			setMetaType(null);
		} else {
			setMetaType(value);
		}
	};

	const clickTypeOptionHandler = (value: string) => {
		if (
			value == "상의 종류" ||
			value == "하의 종류" ||
			value == "아우터 종류"
		) {
			setType(null);
		} else setType(value);
	};

	// const clickColorOptionHandler = (value: string) => {
	// 	if (value == "Color") {
	// 		setColor(null);
	// 	} else setColor(value);
	// };

	const clickPatternOptionHandler = (value: string) => {
		if (value == "Pattern") {
			setPattern(null);
		} else setPattern(value);
	};

	const colorHandler = (color: any) => {
		setColorHex(color.hex);
		const colorIdx = COLOROPTIONS.findIndex((item) => item == color.hex);
		setColor(COLORREF[colorIdx]);
	};

	return (
		<div className="FilterModal">
			<div>
				<select
					id="meta-type-select"
					onChange={(e) => clickMetaTypeOptionHandler(e.target.value)}
				>
					{MetaTypeOptions.map((option, index) => (
						<option key={index} value={option.value}>
							{option.value}
						</option>
					))}
				</select>
				<TypeFilter
					data-testid="typefilter"
					metaType={metaType}
					selectHandler={clickTypeOptionHandler}
				></TypeFilter>
			</div>

			<br></br>
			<text>Color</text>
			<GithubPicker
				data-testid="color-select"
				color={colorHex}
				colors={COLOROPTIONS}
				onChange={colorHandler}
			/>
			<text>{color}</text>

			<select
				id="pattern-select"
				onChange={(e) => clickPatternOptionHandler(e.target.value)}
			>
				{PatternOptions.map((option, index) => (
					<option
						key={index}
						value={option.value}
						// onClick={() => clickPatternOptionHandler(option.value)}
					>
						{option.value}
					</option>
				))}
			</select>

			<button
				id="done-button"
				data-testid="done-button"
				onClick={() => props.clickDoneHandler(type, color, pattern)}
			>
				Done
			</button>
		</div>
	);
};

export default FilterModal;
