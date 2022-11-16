import React from "react";
import axios from "axios";

export const signinUser = async (username: string, pw: string) => {
	console.log("called");
	await axios
		.get("/api/ooo/user/token/")
		.then((response) => {
			console.log(response);
		})
		.catch((error) => {
			console.log(error.response);
		});

	const data = { username: username, password: pw };
	console.log(data);
	const option = {
		method: "POST",
		headers: {
			"Content-type": "application/json;charset=UTF-8",
			"X-CSRFToken": localStorage.getItem("token"),
		},
		body: data,
	};
	// console.log(localStorage.getItem('token'))
	await axios
		.post("/api/ooo/user/signin/", option)
		.then(() => {
			localStorage.setItem("username", username);
		})
		.catch((error) => {
			console.log(error.response);
		});
};

export const signupUser = async (username: string, pw: string) => {
	const data = { username: username, password: pw };
	const option = {
		method: "POST",
		headers: {
			"Content-type": "application/json;charset=UTF-8",
		},
		body: JSON.stringify(data),
	};

	await axios.post("/api/ooo/user/signup/", option).catch((error) => {
		console.log(error.response);
	});
};

export const logoutUser = async () => {
	const data = { username: localStorage.getItem("username") };
	const option = {
		method: "POST",
		headers: {
			"Content-type": "application/json;charset=UTF-8",
			"X-CSRFTOKEN": "JkwYDkuqKG8UYeeWgBoYwbVEem1wyS9h",
		},
		body: JSON.stringify(data),
	};
	console.log(localStorage.getItem("token"));
	await axios.post("/api/ooo/user/logout/", option).then(() => {
		localStorage.removeItem("token");
		localStorage.removeItem("username");
	});
};
