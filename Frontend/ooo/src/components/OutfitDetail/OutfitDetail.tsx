import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { AppDispatch } from "../../store";
import axios from "axios";
import "./OutfitDetail.css";

const OutfitDetail = async () => {
	const { id } = useParams();

	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	// const apiUrl = "api/ooo/outfit/" + id + "/";

	// try {
	// 	const response = await axios.get(apiUrl);
	// 	console.log(response.data);
	// } catch (error) {
	// 	console.error(error);
	// }

	return;
};

export default OutfitDetail;
