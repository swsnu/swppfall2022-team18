import "./OutfitPreview.css";
import React from "react";

export interface IProps {
	source_url: string;
	info: string;
	cloth_names: string[];
	clickOutfitDetail?: () => void;
}

const OutfitPreview = (props: IProps) => {
	//print outfit as preview

	return (
		<div className="OutfitPreview">
			<div className="OutfitImage">
				<img
					id="outfit-img"
					src={props.source_url}
					onClick={props.clickOutfitDetail}
				></img>
			</div>
			<div className="OutfitLable">
				<div id="outfit-info-text">{props.info}</div>
				{props.cloth_names.map((cloth_name: string, index) => {
					return (
						<div key={index} id="cloth-name">
							{cloth_name}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default OutfitPreview;
