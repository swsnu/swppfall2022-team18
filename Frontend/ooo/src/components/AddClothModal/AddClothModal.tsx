import "./AddClothModal.css"
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { createUserCloth } from "../../store/slices/userCloth";
import Modal from 'react-modal'
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

    const navigate = useNavigate()
    
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
        const data = { name: name, image_id: image_id ?? 0, type: type, color: color, pattern: pattern };
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


    const [file, setFile] = useState<File>();
    const [previewURL, setPreviewURL] = useState<string | null>();
    const [preview,setPreview] = useState(null);
    // const fileRef= useRef();

    // useEffect(() => {
    //     setPreview(<img className='img_preview' src={previewURL}></img>);
    //     return () => {}
    // }, [previewURL])


    // const handleFileOnChange = (event: any) => {//파일 불러오기
    //     event.preventDefault();
    //     let file = event.target.files[0];
    //     let reader = new FileReader();
    
    //     reader.onloadend = (e) => {
    //         setFile(file);
    //         setPreviewURL(reader.result);
    //     }
    //     if(file) { reader.readAsDataURL(file); }
    // }
      
    // const handleFileButtonClick = (e) => {//버튼 대신 클릭하기
    //     e.preventDefault();
    //     fileRef.current.click(); // file 불러오는 버튼을 대신 클릭함
    // }

    // if (submitted) {
    //     // return <Navigate to="/closet" />;
    //     navigate("/closet/");
    // }
    // else {
        return (
            <div className='AddClothModal'>
                <div className='AddClothModalHead'>
                    <text id='AddClothModal-text'>Add New Cloth</text>
                </div>
                <div className="AddClothModalTop">
                    <div className='UploadClothDiv'>
                        <input type='file'
                            id='upload-cloth-button'
                            accept='image/*'
                            // onChange={handleFileOnChange}
                        />
                    </div>
                    <div className='CenterDiv'></div>
                    <div className='UploadedClothInfoDiv'>
                        <div className='UploadedClothInfoDiv-sub'>
                            <text id='UploadedClothInfoDiv-text'>Name</text>
                            <br></br>
                            <input
                                type="text"
                                id="cloth-info-input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='UploadedClothInfoDiv-sub'>
                            <text id='UploadedClothInfoDiv-text'>Type</text>
                            <br></br>
                            <input
                                type="text"
                                id="cloth-info-input"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            />
                        </div>
                        <div className='UploadedClothInfoDiv-sub'>
                            <text id='UploadedClothInfoDiv-text'>Color</text>
                            <br></br>
                            <input
                                type="text"
                                id="cloth-info-input"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                            />
                        </div>
                        <div className='UploadedClothInfoDiv-sub'>
                            <text id='UploadedClothInfoDiv-text'>Pattern</text>
                            <br></br>
                            <input
                                type="text"
                                id="cloth-info-input"
                                value={pattern}
                                onChange={(e) => setPattern(e.target.value)}
                            />
                        </div>
                        <button id="create-cloth-button" onClick={()=>clickAddClothHandler()}>Add to Closet</button>
                    </div>
                </div>
            </div>
        )
    // }
}

export default AddClothModal