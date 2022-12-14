import "./AddClothModal.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { classifyColor, createUserCloth } from "../../store/slices/userCloth";
import TypeFilter from "../TypeFilter/TypeFilter";
import ColorFilter from "../ColorFilter/ColorFilter";
import PatternFilter from "../PatternFilter/PatternFilter";

export interface IProps {
	modal_close: (metaType: string) => void;
}

const AddClothModal = (props: IProps) => {
	const [metaType, setMetaType] = useState<string | null>(null); // 상의, 하의, 아우터
	const [type, setType] = useState<string | null>(null);
	const [color, setColor] = useState<string | null>(null);
	const [colorHex, setColorHex] = useState<string>("");
	const [pattern, setPattern] = useState<string | null>(null);
	const [fileImage, setFileImage] = useState("");
	const [file, setFile] = useState<File>();
	// const [submitted, setSubmitted] = useState<boolean>(false);

	const dispatch = useDispatch<AppDispatch>();

	const MetaTypeOptions = [
		{ value: "옷 종류" },
		{ value: "상의" },
		{ value: "하의" },
		{ value: "아우터" },
	];

	// useEffect(() => {
	// 	alert(color)
	// }, [color]);

	const clickAddClothHandler = async () => {
		if (metaType && file && type && color && pattern) {
			const data = {
				name: metaType,
				image: file,
				type: type,
				color: color,
				pattern: pattern,
			};
			await dispatch(createUserCloth(data));
			props.modal_close(metaType);
		} else {
			if (!fileImage) alert("옷 사진을 업로드해주세요.");
			else if (!metaType || !type || !color || !pattern)
				alert("정보를 모두 입력해주세요.");
		}
		// setSubmitted(true);
		// window.location.reload();
	};

	const saveFileImage = async (e: any) => {
		const uploadedImage = e.target.files[0];
		setFileImage(URL.createObjectURL(uploadedImage));
		setFile(uploadedImage);

		const data = {
			image: uploadedImage,
		};
		const result = await dispatch(classifyColor(data));
		setColor(result.payload.color);
	};

	const clickMetaTypeOptionHandler = (value: string) => {
		if (value == "옷 종류") {
			setMetaType(null);
		} else {
			setMetaType(value);
		}
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

	const clickColorOptionHandler = (value: string | null) => {
		console.log("check");
		console.log(value);
		if (value == "") {
			setColor(null);
		} else if (value == null) {
			setColor(null);
		} else setColor(value);
	};

	// const colorHandler = (color: any) => {
	// 	setColorHex(color.hex);
	// 	const colorIdx = COLOROPTIONS.findIndex((item) => item == color.hex);
	// 	setColor(COLORREF[colorIdx]);
	// };

	const clickPatternOptionHandler = (value: string | null) => {
		if (value == "패턴 종류") {
			setPattern(null);
		} else if (value == null) {
			setPattern(null);
		} else setPattern(value);
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
								<img
									id="uploaded-image-preview"
									src={fileImage}
									height="400"
									width="500px"
								/>
							)
						) : (
							<div className="UploadedClothTempDiv">
								<pre className="UploadedClothTempDiv-text"><b>
									옷이 가운데에 위치하도록 사진을 찍어주세요{"\n"}
									AI가 업로드한 옷 색깔을 예측해드립니다
								</b></pre>
							</div>
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
						<text id="UploadedClothInfoDiv-text">▶ TYPE</text>
						<select
							id="meta-type-select"
							data-testid="meta-type-select"
							onChange={(e) => clickMetaTypeOptionHandler(e.target.value)}
						>
							{MetaTypeOptions.map((option, index) => (
								<option key={index} value={option.value}>
									{option.value}
								</option>
							))}
						</select>
					</div>
					<div className="UploadedClothInfoDiv-sub">
						<text id="UploadedClothInfoDiv-text">▶ TYPE DETAIL</text>
						<TypeFilter
							metaType={metaType}
							selectHandler={clickTypeOptionHandler}
						></TypeFilter>
					</div>

					<div className="UploadedClothInfoDiv-sub">
						<text id="UploadedClothInfoDiv-text">▶ COLOR</text>
						<ColorFilter
							selectHandler={clickColorOptionHandler}
							color={color}
						></ColorFilter>
						{/* <div>
							<GithubPicker
								data-testid="cloth-info-input-color"
								color={colorHex}
								colors={COLOROPTIONS}
								onChange={colorHandler}
							/>
						</div> */}
						<text>{color}</text>
					</div>

					<div className="UploadedClothInfoDiv-sub">
						<text id="UploadedClothInfoDiv-text">▶ PATTERN</text>
						<PatternFilter
							selectHandler={clickPatternOptionHandler}
							pattern={pattern}
						></PatternFilter>
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
