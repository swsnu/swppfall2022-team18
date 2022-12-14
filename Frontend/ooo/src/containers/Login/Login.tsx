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

	const clickSignUpHandler = () => {
		navigate("/signup");
	};

	if (login) {
		return <Navigate to="/home" />;
	} else {
		return (
			<div className="Login">
				<div className="Header">
				<div className="header-div">
					<text id="appName">oOo</text>
					<text id="detailAppName">:recommend your outfit</text>
				</div>
				</div>
				<div className="form">
					<div className="form-margin-left"></div>
					<div className="login-form">
						<div className="login-text">
							<text id="signin-signup-text">로그인</text>
						</div>
						<div className="username-div">
							<input
								id="username-input"
								data-testid="username-input"
								type="text"
								placeholder="아이디"
								value={username}
								onChange={(event) => setUsername(event.target.value)}
							/>
						</div>
						<div className="pw-div">
							<input
								id="pw-input"
								data-testid="pw-input"
								value={password}
								type={'password'}
								placeholder="비밀번호"
								onChange={(event) => setPassword(event.target.value)}
							/>
						</div>
						<div className="wrong-div">
							{!wrongInput ? (
								<div></div>
							) : (
								<text data-testid="wrong-text" id="wrong-text">
									ID, Password가 틀렸습니다.
								</text>
							)}
						</div>
						<div className="button-div">
							<button
								id="login-button"
								data-testid="login-button-test"
								onClick={() => postLoginHandler()}
							>
								로그인
							</button>
							<button
								id="signup-button"
								data-testid="signup-button"
								onClick={() => clickSignUpHandler()}
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
