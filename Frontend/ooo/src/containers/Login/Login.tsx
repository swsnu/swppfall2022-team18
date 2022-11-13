import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signinUser } from "../../api/user";
import "./Login.css";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [login, setLogin] = useState(false);
	const [wrongInput, setWrongInput] = useState(false);

	const navigate = useNavigate();

	const checkLoginned = () => {
		console.log(localStorage.getItem("token"));
		return (
			localStorage.getItem("username") !== null &&
			(localStorage.getItem("token") !== null ||
				localStorage.getItem("token") !== undefined)
		);
		// return false;
	};

	useEffect(() => {
		const redirect = () => {
			if (checkLoginned()) {
				navigate("/home");
			}
		};
		redirect();
	}, []);

	const postLoginHandler = async () => {
		await signinUser(username, password);
		if (checkLoginned()) {
			setLogin(true);
		} else {
			setWrongInput(true);
		}
	};

	if (login) {
		return <Navigate to="/home" />;
	} else {
		return (
			<div className="Login">
				<div className="header-div">
					<div id="appName">oOo</div>
					<div id="detailAppName">:recommend your outfit</div>
				</div>
				<div className="form">
					<div className="form-margin-left"></div>
					<div className="login-form">
						<div className="login-text">
							<div id="signin-signup-text">로그인 및 회원가입</div>
						</div>
						<div className="username-div">
							<div id="username-text">ID</div>
							<input
								id="username-input"
								data-testid="username-input"
								type="text"
								value={username}
								onChange={(event) => setUsername(event.target.value)}
							/>
						</div>
						<div className="pw-div">
							<div id="pw-text">PW</div>
							<input
								id="pw-input"
								data-testid="pw-input"
								value={password}
								onChange={(event) => setPassword(event.target.value)}
							/>
						</div>
						<div className="wrong-div">
							{!wrongInput ? (
								<div></div>
							) : (
								<div id="wrong-text">ID, Password가 틀렸습니다.</div>
							)}
						</div>
						<div className="button-div">
							<button
								id="login-button"
								data-testid="login-button"
								onClick={() => postLoginHandler()}
							>
								로그인
							</button>
							<button
								id="signup-button"
								data-testid="signup-button"
								onClick={() => postLoginHandler()}
							>
								회원가입
							</button>
						</div>
					</div>
					<div className="form-margin-right"></div>
				</div>
			</div>
		);
	}
}
