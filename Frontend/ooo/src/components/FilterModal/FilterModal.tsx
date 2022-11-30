import React from "react";
import "./FilterModal.css";
import { useState } from "react";
import TypeFilter from "../TypeFilter/TypeFilter";

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

	const ColorOptions = [
		{ value: "Color" },
		{ value: "black" },
		{ value: "white" },
		{ value: "blue" },
		{ value: "red" },
		{ value: "etc" },
	];

	const PatternOptions = [
		{ value: "Pattern" },
		{ value: "stripe" },
		{ value: "none" },
	];

	const MetaTypeOptions = [
		{ value: "옷 종류" },
		{ value: "상의" },
		{ value: "하의" },
		{ value: "아우터" },
	];

	const clickMetaTypeOptionHandler = (value: string) => {
		if (value == "옷 종류") {
			setMetaType(null);
		} else setMetaType(value);
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

	const clickColorOptionHandler = (value: string) => {
		if (value == "Color") {
			setColor(null);
		} else setColor(value);
	};

	const clickPatternOptionHandler = (value: string) => {
		if (value == "Pattern") {
			setPattern(null);
		} else setPattern(value);
	};

	return (
		<div className="FilterModal">
			<div>
				<select id="type-select">
					{MetaTypeOptions.map((option, index) => (
						<option
							key={index}
							value={option.value}
							onClick={() => clickMetaTypeOptionHandler(option.value)}
						>
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
			<select id="color-select">
				{ColorOptions.map((option, index) => (
					<option
						key={index}
						value={option.value}
						onClick={() => clickColorOptionHandler(option.value)}
					>
						{option.value}
					</option>
				))}
			</select>

			<select id="pattern-select">
				{PatternOptions.map((option, index) => (
					<option
						key={index}
						value={option.value}
						onClick={() => clickPatternOptionHandler(option.value)}
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
