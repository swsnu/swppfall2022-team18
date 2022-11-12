import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import Modal from "react-modal";
import "./FilterModal.css";

export interface IProps {
	clickDoneHandler?: () => void;
}

const FilterModal = (props: IProps) => {
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

	const handleChange = (e: any) => {
		console.log(e.target.value);
	};

	return (
		<div className="FilterModal">
			<select id="type-select" onChange={handleChange}>
				{TYPEOPTIONS.map((option, index) => (
					<option key={index} value={option.value}>
						{option.value}
					</option>
				))}
			</select>
			<select id="color-select" onChange={handleChange}>
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
