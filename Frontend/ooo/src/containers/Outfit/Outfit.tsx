import { logoutUser } from "../../api/user";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import ClosetItem from "../../components/ClosetItem/ClosetItem";
import "./Outfit.css";

export default function Outfit() {
	const navigate = useNavigate();
	//get current filter and save in local storage -> toggle button

	//make cursor

	//call api POST outfit/ to fetch filtered outfit

	//print all outfits

	//make outfit image as button to navigate to outfit detail page

	return (
		<div className="">
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
			<div className="OutfitTop"></div>
		</div>
	);
}
