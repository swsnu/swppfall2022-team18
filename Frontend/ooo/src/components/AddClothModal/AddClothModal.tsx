import "./AddClothModal.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import {  classifyColor, createUserCloth } from "../../store/slices/userCloth";
import TypeFilter from "../TypeFilter/TypeFilter"
import { GithubPicker } from 'react-color';

export interface IProps {
    modal_close: (metaType: string) => void
}

const AddClothModal = (props: IProps) => {

	const [name, setName] = useState<string>("");	// 상의, 하의, 아우터
	const [type, setType] = useState<string>("");
	const [colorHex, setColorHex] = useState<string>("");
	const [color, setColor] = useState<string>("");

	const [pattern, setPattern] = useState<string>("");
	const [fileImage, setFileImage] = useState("");
	const [file, setFile] = useState<File>();
	// const [submitted, setSubmitted] = useState<boolean>(false);

	const dispatch = useDispatch<AppDispatch>();

	const METATYPEOPTIONS = [
		{ value: "Type" },
		{ value: "상의" },
		{ value: "하의" },
		{ value: "아우터" },
	];

	const COLOROPTIONS = [
        '#0e0e0e', '#9c9c9b', '#011e66', '#2508ff', '#1f4582', '#b5cbde', '#242d42',
        '', '#5b5a34', '#06b002', '#7f290c', '#ff0000', '#fe2900', '#feea00',
		'#f1c276', '#feffed', '#ffffff', '#570070', '#ff00a1', '#00c4ab', 'rainbow',
	]
	const COLORREF = [
        '블랙', '그레이', '네이비', '블루', '데님', '연청', '진청',
		'청', '카키', '그린', '브라운', '레드', '오렌지', '옐로우',
		'베이지', '아이보리', '화이트', '퍼플', '핑크', '민트', '기타색상'
	]

	// useEffect(() => {
	// 	alert(color)
	// }, [color]);

	const clickAddClothHandler = async () => {
		if (name && file && type && color && pattern) {
			const data = {
				name: name,
				image: file,
				type: type,
				color: color,
				pattern: pattern,
			};
			await dispatch(createUserCloth(data));
			props.modal_close(name);
		}
		else {
			if (!fileImage) alert('옷 사진을 업로드해주세요.')
			else if (!name || !type || !color || !pattern) alert('정보를 모두 입력해주세요.')
		}
		// setSubmitted(true);
		// window.location.reload();
	};

	const saveFileImage = async (e: any) => {
		const uploadedImage = e.target.files[0]
		setFileImage(URL.createObjectURL(uploadedImage));
		setFile(uploadedImage)

		const data = {
			image: uploadedImage
		};
		const result = await dispatch(classifyColor(data));
		setColor(result.payload.color);
	};

    const colorHandler = (color: any) => {
        setColorHex(color.hex);
		const colorIdx = COLOROPTIONS.findIndex((item) => item == color.hex);
		setColor(COLORREF[colorIdx]);
    };

	return (
		<div className="AddClothModal">
			<div className="AddClothModalHead">
				<text id="AddClothModal-text">Add New Cloth</text>
			</div>
			<div className="AddClothModalTop">
				<div className="UploadClothDiv" data-testid="UploadClothDiv">
					<div className="UploadedClothPreviewDiv">
						{fileImage ? (
							fileImage && (
								<img id="uploaded-image-preview" src={fileImage} height="400" />
							)
						) : (
							<div className="UploadedClothTempDiv"></div>
						)}
					</div>
					<input
						type="file"
						id="upload-cloth-button"
						data-testid="upload-cloth-button"
						accept="image/*"
						onChange={saveFileImage}
					/>
				</div>
				<div className="CenterDiv"></div>
				<div className="UploadedClothInfoDiv">
					<div className="UploadedClothInfoDiv-sub">
						<text id="UploadedClothInfoDiv-text">Type</text>
						<br></br>
						<select id="type-select" data-testid="select-component" onChange={(e) => setName(e.target.value)}>
							{METATYPEOPTIONS.map((option, index) => (
								<option key={index} value={option.value} >
									{option.value}
								</option>
							))}
						</select>
					</div>
					<div className="UploadedClothInfoDiv-sub">
						<text id="UploadedClothInfoDiv-text">세부 Type</text>
						<br></br>
						<TypeFilter metaType={name} selectHandler={setType}></TypeFilter>
					</div>
					<div className="UploadedClothInfoDiv-sub">
						<text id="UploadedClothInfoDiv-text">Color</text>
						<br></br>
						<GithubPicker
							data-testid="cloth-info-input-color"
							color={colorHex}
							colors={COLOROPTIONS}
							onChange={colorHandler}
						/>
						<text>{color}</text>
					</div>
					<div className="UploadedClothInfoDiv-sub">
						<text id="UploadedClothInfoDiv-text">Pattern</text>
						<br></br>
						<input
							type="text"
							id="cloth-info-input"
							data-testid="cloth-info-input-pattern"
							value={pattern}
							onChange={(e) => setPattern(e.target.value)}
						/>
					</div>
					<button
						id="create-cloth-button"
						data-testid="create-cloth-button"
						onClick={() => clickAddClothHandler()}
					>
						Add to Closet
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddClothModal;