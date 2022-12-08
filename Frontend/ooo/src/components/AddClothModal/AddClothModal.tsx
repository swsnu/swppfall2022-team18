import "./AddClothModal.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";

import { classifyColor, createUserCloth } from "../../store/slices/userCloth";
import TypeFilter from "../TypeFilter/TypeFilter";
import { GithubPicker } from "react-color";

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

	const COLOROPTIONS = [
		"#0e0e0e",
		"#9c9c9b",
		"#011e66",
		"#2508ff",
		"#1f4582",
		"#b5cbde",
		"#242d42",
		"",
		"#5b5a34",
		"#06b002",
		"#7f290c",
		"#ff0000",
		"#fe2900",
		"#feea00",
		"#f1c276",
		"#feffed",
		"#ffffff",
		"#570070",
		"#ff00a1",
		"#00c4ab",
		"rainbow",
	];
	const COLORREF = [
		"블랙",
		"그레이",
		"네이비",
		"블루",
		"데님",
		"연청",
		"진청",
		"청",
		"카키",
		"그린",
		"브라운",
		"레드",
		"오렌지",
		"옐로우",
		"베이지",
		"아이보리",
		"화이트",
		"퍼플",
		"핑크",
		"민트",
		"기타색상",
	];

	const PatternOptions = [
		{ value: "Pattern" },
		{ value: "None" },
		{ value: "로고" },
		{ value: "스트라이프" },
		{ value: "체크" },
		{ value: "자수" },
	];

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

	// const clickColorOptionHandler = (value: string) => {
	// 	if (value == "Color") {
	// 		setColor(null);
	// 	} else setColor(value);
	// };

	const colorHandler = (color: any) => {
		setColorHex(color.hex);
		const colorIdx = COLOROPTIONS.findIndex((item) => item == color.hex);
		setColor(COLORREF[colorIdx]);
	};

	const clickPatternOptionHandler = (value: string) => {
		if (value == "Pattern") {
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
								<img id="uploaded-image-preview" src={fileImage} height="400" width="600px"/>
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
						<GithubPicker
							data-testid="cloth-info-input-color"
							color={colorHex}
							colors={COLOROPTIONS}
							onChange={colorHandler}
						/>
						<text>{color}</text>
					</div>

					<div className="UploadedClothInfoDiv-sub">
						<text id="UploadedClothInfoDiv-text">▶ PATTERN</text>
						<select
							id="pattern-select"
							data-testid="pattern-select"
							onChange={(e) => clickPatternOptionHandler(e.target.value)}
						>
							{PatternOptions.map((option, index) => (
								<option key={index} value={option.value}>
									{option.value}
								</option>
							))}
						</select>
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
