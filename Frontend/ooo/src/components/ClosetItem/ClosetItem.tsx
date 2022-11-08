import "./ClosetItem.css"
import React from "react"
import {
    deleteUserCloth,
} from "../../store/slices/userCloth";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { AppDispatch } from "../../store";
import Modal from 'react-modal'
import ClothDetailModal from '../../components/ClothDetailModal/ClothDetailModal'

export interface IProps {
    source_url: string,
    type: string,
    color: string,
    pattern: string,
    // clickClothDetailPopupHandler ?: () => void,
}

const ClosetItem = (props: IProps) => {

    const [clothDetailModalOpen, setClothDetailModalOpen] = useState(false)

    const clickClothDetailPopupHandler = () => {
        setClothDetailModalOpen(true)
    };

    return(
        <div className="ClosetItem">
            <div className="ClothImage" onClick={clickClothDetailPopupHandler}>
                <img id = 'cloth-img' src= {props.source_url}></img>
            </div>
            <Modal isOpen={clothDetailModalOpen} onRequestClose={() => setClothDetailModalOpen(false)}>
                <ClothDetailModal></ClothDetailModal>
            </Modal>
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