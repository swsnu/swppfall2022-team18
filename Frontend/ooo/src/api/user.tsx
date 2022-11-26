import React from "react";
import axios from "axios";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

export const signinUser = async (username: string, pw: string) => {
	console.log("called");
	await axios
		.get("/api/ooo/user/token/")
		.then((response) => {
			console.log(response)
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
		body: data,
	};
	console.log(option)

	const response = await axios.post("/api/ooo/user/signup/", option)
	return response

};

export const logoutUser = async () => {
	await axios.get("/api/ooo/user/signout/").then(() => {
		localStorage.removeItem("username");
	})
};

export const editUser = async (pw: string) => {
	const data = { password: pw}
	const option = {
		method: 'PUT',
		headers: {
			"Content-type": "application/json;charset=UTF-8",
		},
		body: data
	}
	await axios.put("/api/ooo/user/info/", option).then((response) => {
		return response
	}).catch((e) => {
		console.log(e)
	})
}

export const deleteUser = async () => {
	await axios.delete("/api/ooo/user/info/").then(() => {
		localStorage.removeItem("username");
	}).catch((e) => {
		console.log(e)
	})
}