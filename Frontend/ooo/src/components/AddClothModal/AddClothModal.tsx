import "./AddClothModal.css";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { createUserCloth } from "../../store/slices/userCloth";
import Modal from "react-modal";
import { Url } from "url";

// const TodoModal = (props: any) => (
//     <Modal
//       isOpen={!!props.selectedTodo}
//       contentLabel="Selected Todo"
//       onRequestClose={props.onModalClose}
//     >
//       <h3>Selected Option</h3>
//       {props.selectedTodo && <p>{props.selectedTodo}</p>}
//       <button onClick={props.onModalClose}>Okay</button>
//     </Modal>
// )

//   export default TodoModal

// export interface IProps {
//     // name: string,
//     // image_id?: number,
//     // type: string,
//     // color: string,
//     // pattern: string
//     // setModalOpen: (e:boolean) => void,
// }

const AddClothModal = () => {
	const navigate = useNavigate();

	// const closeModal = () => {
	//     props.setModalOpen(false);
	// };

	const [name, setName] = useState<string>("");
	const [image_id, setImageId] = useState<number>();
	const [type, setType] = useState<string>("");
	const [color, setColor] = useState<string>("");
	const [pattern, setPattern] = useState<string>("");
	const [submitted, setSubmitted] = useState<boolean>(false);
	const dispatch = useDispatch<AppDispatch>();

	const clickAddClothHandler = async () => {
		const data = {
			name: name,
			image_id: image_id ?? 0,
			type: type,
			color: color,
			pattern: pattern,
		};
		if (type == "" || color == "" || pattern == "") {
			return alert("Please fill in all the details.");
		}
		const result = await dispatch(createUserCloth(data));
		console.log(result);

		if (result.type === `${createUserCloth.typePrefix}/fulfilled`) {
			setSubmitted(true);
		} else {
			alert("Error on create UserCloth");
		}
	};

	const [fileImage, setFileImage] = useState("");

	const saveFileImage = (e: any) => {
		setFileImage(URL.createObjectURL(e.target.files[0]));
	};

	if (submitted) {
		navigate("/closet/");
	}

	return (
		<div className="AddClothModal">
			<div className="AddClothModalHead">
				<text id="AddClothModal-text">Add New Cloth</text>
			</div>
			<div className="AddClothModalTop">
				<div className="UploadClothDiv">
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
						accept="image/*"
						onChange={saveFileImage}
					/>
				</div>
				<div className="CenterDiv"></div>
				<div className="UploadedClothInfoDiv">
					<div className="UploadedClothInfoDiv-sub">
						<text id="UploadedClothInfoDiv-text">Name</text>
						<br></br>
						<input
							type="text"
							id="cloth-info-input"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="UploadedClothInfoDiv-sub">
						<text id="UploadedClothInfoDiv-text">Type</text>
						<br></br>
						<input
							type="text"
							id="cloth-info-input"
							value={type}
							onChange={(e) => setType(e.target.value)}
						/>
					</div>
					<div className="UploadedClothInfoDiv-sub">
						<text id="UploadedClothInfoDiv-text">Color</text>
						<br></br>
						<input
							type="text"
							id="cloth-info-input"
							value={color}
							onChange={(e) => setColor(e.target.value)}
						/>
					</div>
					<div className="UploadedClothInfoDiv-sub">
						<text id="UploadedClothInfoDiv-text">Pattern</text>
						<br></br>
						<input
							type="text"
							id="cloth-info-input"
							value={pattern}
							onChange={(e) => setPattern(e.target.value)}
						/>
					</div>
					<button
						id="create-cloth-button"
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

// const [file, setFile] = useState('');
// const [previewURL, setPreviewURL] = useState('');
// const [preview, setPreview] = useState();
// // const fileRef= useRef();

// const handleFileOnChange = (event: any) => {
//     event.preventDefault();
//     let file = event.target.files[0];
//     let reader = new FileReader();

//     reader.onloadend = (e) => {
//         setFile(file);
//         if (reader.result) { setPreviewURL(reader.result.toString()); }
//     }
//     if(file) { reader.readAsDataURL(file); }
// }

// useEffect(() => {
//     setPreview(<img className='img_preview' src={previewURL}></img>);
//     return () => {}
// }, [previewURL])
///

// const [imgBase64, setImgBase64] = useState(""); // 파일 base64
// const [imgFile, setImgFile] = useState(null);	//파일

// const handleChangeFile = (event: any) => {
//     console.log("HI")
//     const reader = new FileReader();

//     reader.onloadend = () => {
//         const base64 = reader.result;
//         if (base64) {
//             console.log(base64)
//             setImgBase64(base64.toString());
//         }
//     }
//     if (event.target.files[0]) {
//         console.log(event.target.files[0])
//         reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
//         setImgFile(event.target.files[0]); // 파일 상태 업데이트
//     }
// }

// const handleFileButtonClick = (e) => {//버튼 대신 클릭하기
//     e.preventDefault();
//     fileRef.current.click(); // file 불러오는 버튼을 대신 클릭함
// }