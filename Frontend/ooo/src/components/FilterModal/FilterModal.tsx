import React from "react";
import "./FilterModal.css";

export interface IProps {
	clickDoneHandler?: () => void;
}

const FilterModal = (props: IProps) => {
	// const [typeFilter, setTypeFilter] = useState("");
	// const [colorFilter, setColorFilter] = useState("");
	// const [patternFilter, setPatternFilter] = useState("");

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
		{ value: "T-Shirt" },
		{ value: "Shirt" },
		{ value: "Jean" },
		{ value: "Jacket" },
	];

	return (
		<div className="FilterModal">
			<select id="type-select">
				{TYPEOPTIONS.map((option, index) => (
					<option key={index} value={option.value}>
						{option.value}
					</option>
				))}
			</select>
			<select id="color-select">
				{COLOROPTIONS.map((option, index) => (
					<option key={index} value={option.value}>
						{option.value}
					</option>
				))}
			</select>

			<select id="pattern-select">
				{PATTERNOPTIONS.map((option, index) => (
					<option key={index} value={option.value}>
						{option.value}
					</option>
				))}
			</select>

			<button id="done-button" onClick={props.clickDoneHandler}>
				Done
			</button>
		</div>
	);
};

export default FilterModal;