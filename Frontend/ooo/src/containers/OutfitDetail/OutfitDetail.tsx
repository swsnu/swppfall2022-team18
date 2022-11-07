import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { AppDispatch } from "../../store";
import axios from "axios";
import "./OutfitDetail.css";
import {
	fetchOutfit,
	fetchSampleCloth,
	selectOutfit,
} from "../../store/slices/outfit";

const OutfitDetail = async () => {
	const { id } = useParams();
	const { user } = useParams();

	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const outfitState = useSelector(selectOutfit);

	return;
};

export default OutfitDetail;
