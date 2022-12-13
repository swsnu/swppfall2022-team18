import React from "react";
import "./FilterModal.css";
import { useState } from "react";
import TypeFilter from "../TypeFilter/TypeFilter";
import ColorFilter from "../ColorFilter/ColorFilter";
import PatternFilter from "../PatternFilter/PatternFilter";
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

	const MetaTypeOptions = [
		{ value: "옷 종류" },
		{ value: "상의" },
		{ value: "하의" },
		{ value: "아우터" },
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

	const clickColorOptionHandler = (value: string | null) => {
		console.log("check");
		console.log(value);
		if (value == "") {
			setColor(null);
		} else if (value == null) {
			setColor(null);
		} else setColor(value);
	};

	// const colorHandler = (color: any) => {
	// 	setColorHex(color.hex);
	// 	const colorIdx = COLOROPTIONS.findIndex((item) => item == color.hex);
	// 	setColor(COLORREF[colorIdx]);
	// };

	const clickPatternOptionHandler = (value: string | null) => {
		if (value == "패턴 종류") {
			setPattern(null);
		} else if (value == null) {
			setPattern(null);
		} else setPattern(value);
	};

	return (
		<div className="FilterModal">
			<div>
				<text>TYPE</text>
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
			</div>
			<div>
				<text>TYPE DETAIL</text>
				<TypeFilter
					data-testid="typefilter"
					metaType={metaType}
					selectHandler={clickTypeOptionHandler}
				></TypeFilter>
			</div>
			<div style={{ marginBottom: "5px" }}>
				<text style={{ paddingBottom: "5px" }}>COLOR</text>
				<ColorFilter
					selectHandler={clickColorOptionHandler}
					color={color}
				></ColorFilter>
				<text>{color}</text>
			</div>
			<div>
				<text>PATTERN</text>
				<PatternFilter
					selectHandler={clickPatternOptionHandler}
					pattern={pattern}
				></PatternFilter>
			</div>
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
