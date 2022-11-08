import "./ClosetItem.css"
import React from "react"
// import {
//     deleteUserCloth,
// } from "../../store/slices/userCloth";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router";
// import { NavLink, useNavigate, useLocation } from "react-router-dom";
// import { AppDispatch } from "../../store";

export interface IProps {
    source_url: string,
    type: string,
    color: string,
    pattern: string,
    clickClothDetailPopupHandler ?: () => void,
}

const ClosetItem = (props: IProps) => {

    // const clickDeleteClothHandler = () => {
    //     navigate("/articles/create");
    // };

    // const clickMoveToRecommendedStyleHandler = () => {
    //     navigate("/articles/create");
    // };

    // const clickClothDetailCancelHandler = () => {
    //     navigate("/articles/create");
    // };
    // const navigate = useNavigate();
    // const { id } = useParams();
    // const [submitted, setSubmitted] = useState<boolean>(false);

    // const dispatch = useDispatch<AppDispatch>();

    // const clickDeleteClothHandler = async () => {
    //     const data = { cloth_id: Number(id) };
    //     const result = await dispatch(deleteUserCloth(data));
    //     // console.log(result);
    //     if (result.type === `${deleteUserCloth.typePrefix}/fulfilled`) {
    //         setSubmitted(true);
    //     } else {
    //         alert("Error on delete Cloth");
    //     }
    // };

    return(
        <div className="ClosetItem">
            <div className="ClothImage">
                <img id = 'cloth-img' src= {props.source_url}></img>
            </div>
            <div className="ClothLable">
                <text id='type-label'><b>종류</b></text>
                <text id='type-text'>{props.type}</text><br></br>
                <text id='color-label'><b>색상</b></text>
                <text id='color-text'>{props.color}</text><br></br>
                <text id='stripe-label'><b>무늬</b></text>
                <text id='stripe-text'>{props.pattern}</text><br></br>
            </div>
            
        </div>
    )
}

export default ClosetItem