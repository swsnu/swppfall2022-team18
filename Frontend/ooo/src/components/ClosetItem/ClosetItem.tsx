import "./ClosetItem.css"
import React from "react"


export interface IProps {
    source_url: string,
    type: string,
    color: string,
    stripe: string,
    clickClothDetailPopupHandler ?: () => void,
}

const ClosetItem = (props: IProps) => {
    return(
        <div className="ClosetItem">
            <div className="ClothImage">
                <img id = 'cloth-img' src= {props.source_url}></img>
            </div>
            <div className="ClothLable">
                <text id='type-label'>종류</text>
                <text id='type-text'>{props.type}</text>
                <text id='color-label'>색상</text>
                <text id='color-text'>{props.color}</text>
                <text id='stripe-label'>무늬</text>
                <text id='stripe-text'>{props.stripe}</text>
            </div>
            
        </div>
    )
}

export default ClosetItem