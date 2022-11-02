import "./ClosetItem.css"
import React from "react"


export interface IProps {
    source_url: string,
    clickClothDetailPopupHandler ?: () => void,
}

const Header = (props: IProps) => {
    return(
        <div className="ClosetItem">
            <div className="ClothImage">
                <text>{props.source_url}</text>
                <img src= {require(props.source_url).default}></img>
            </div>
            <div className="ClothLable">
                <text>Label 내용</text>
            </div>
            
        </div>
    )
}

export default Header