import "./Header.css"
import React from "react"

export interface IProps {
    clickInfo ?: () => void,
    clickLogout ?: () => void
}

const Header = (props: IProps) => {
    return(
        <div className="Header">
            <div className="headerText">
                <text id='appName'>oOo</text>
                <text id='detailAppName'>:recommend your outfit</text>
            </div>
            <div className="headerButton">
                <button id='infoButton' onClick={props.clickInfo}>내 정보</button>
                <button id='logoutButton' onClick={props.clickLogout}>로그아웃</button>
            </div>
            
        </div>
    )
}

export default Header