import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { AppDispatch } from "../../store";
import "./OutfitDetail.css";
import {
	fetchOutfit,
	SampleClothType,
	selectOutfit,
} from "../../store/slices/outfit";
import Header from "../../components/Header/Header";
import { logoutUser } from "../../api/user";

const OutfitDetail = () => {
	const { id } = useParams();
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const outfitState = useSelector(selectOutfit);

	async function fecthOutfit() {
		setLoading(true);
		try {
			const response = await dispatch(fetchOutfit(Number(id)));
		} catch (e) {
			console.error(e);
		}
		setLoading(false);
	}

	const selectedOutfit = outfitState.selectedOutfit;

	const outfitImageSource = "img/outfit/" + selectedOutfit?.image_id + ".jpg";

	console.log(outfitImageSource);

	const clickPurchaseButtonHander = (purchase_link: string) => {
		navigate(purchase_link);
	};

	return (
		<div className="OutfitDetail">
			<div className="header">
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
			</div>
			<div className="OutfitDetail-body">
				<div className="Outfit-image">
					<img id="-outfit-img" src={outfitImageSource}></img>
				</div>
				<div className="OutfitDetailData">
					<div className="OutfitName">{selectedOutfit?.name}</div>
					<div className="OutfitInfo">{selectedOutfit?.info}</div>
					<button
						id="outfit-purchase-button"
						onClick={() =>
							clickPurchaseButtonHander(selectedOutfit!.purchase_link)
						}
					>
						Purchase Button
					</button>
					<div className="sampleClothes">
						{outfitState.sampleClothes.map((sc) => {
							const imageSource = "img/samplecloth/" + sc.image_id + ".jpg";
							return <div className></div>;
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default OutfitDetail;
