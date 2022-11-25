import React from "react";
import "./FilterModal.css";
import { useState } from "react";

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

	const COLOROPTIONS = [
		{ value: "Color" },
		{ value: "black" },
		{ value: "white" },
		{ value: "blue" },
		{ value: "red" },
		{ value: "etc" },
	];

	const PATTERNOPTIONS = [
		{ value: "Pattern" },
		{ value: "stripe" },
		{ value: "none" },
	];

	const TYPEOPTIONS = [
		{ value: "Type" },
		{ value: "T-Shirt" },
		{ value: "Shirt" },
		{ value: "Jean" },
		{ value: "Jacket" },
	];

	const clickTypeOptionHandler = (value: string) => {
		if (value == "Type") {
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
			<select id="type-select">
				{TYPEOPTIONS.map((option, index) => (
					<option
						key={index}
						value={option.value}
						onClick={() => clickTypeOptionHandler(option.value)}
					>
						{option.value}
					</option>
				))}
			</select>
			<select id="color-select">
				{COLOROPTIONS.map((option, index) => (
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
				{PATTERNOPTIONS.map((option, index) => (
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
				onClick={() => props.clickDoneHandler(type, color, pattern)}
			>
				Done
			</button>
		</div>
	);
};

export default FilterModal;
