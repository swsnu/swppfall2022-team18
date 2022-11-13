import "./Header.css";
import React from "react";

export interface IProps {
	clickHeaderHandler?: () => void;
	clickInfoHandler?: () => void;
	clickLogoutHandler?: () => void;
}

const Header = (props: IProps) => {
	return (
		<div className="Header">
			<div className="headerText" onClick={props.clickHeaderHandler}>
				<div id="appName">oOo</div>
				<div id="detailAppName">:recommend your outfit</div>
			</div>
			<div className="headerButton">
				<button id="infoButton" onClick={props.clickInfoHandler}>
					내 정보
				</button>
				<button id="logoutButton" onClick={props.clickLogoutHandler}>
					로그아웃
				</button>
			</div>
		</div>
	);
};

export default Header;
