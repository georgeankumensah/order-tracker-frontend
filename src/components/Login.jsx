// Login.js
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// import axios from "axios";
import api from "../api/api";
import { loginSuccess } from "../redux/actions/authActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import spinner from "../assets/spinner.gif";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	// const user = useSelector((state) => state.auth);

	const navigate = useNavigate();

	const handleLogin = async () => {
		setIsLoading(true);
		await api
			.post("/user/login/", { username, password })
			.then((res) => {
				console.log(res.data.status);
				setIsLoading(false);
				const user = res.data;
				dispatch(loginSuccess(user));
				navigate(`/dashboard`);
				if (user.isAdmin) {
					// const token = user.token;
					// console.log(token);
					// localStorage.setItem("token", token);
					localStorage.setItem("user", JSON.stringify(user));
					navigate(`/dashboard`);
				}
				return res.data;
			})
			.catch((err) => {
				console.log(err);
				setIsLoading(false);
				const status = err.response.status;

				if (status == 404) {
					toast.error("user not found", {
						position: "bottom-left",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
					});
				} else {
					toast.error(err.message, {
						position: "bottom-left",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
					});
				}
				// return err
			});

		const user = { username /* other user data */ };
		dispatch(loginSuccess(user));
	};

	const Loader = () => {
		return (
			<div className="flex items-center  ">
				<img src={spinner} className="w-[2rem] aspect-square" alt="spinner" />
				<p className="font-medium ml-2">Loging you in...</p>
			</div>
		);
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
			<div className="bg-white p-8 rounded-lg shadow-lg">
				<h2 className="text-2xl font-bold mb-4">Login</h2>
				<form className="flex flex-col space-y-4">
					<div className="flex flex-col">
						<label htmlFor="username" className="text-lg font-medium mb-2">
							Username
						</label>
						<input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="border border-gray-400 rounded-lg py-2 px-3" />
					</div>
					<div className="flex flex-col">
						<label htmlFor="password" className="text-lg font-medium mb-2">
							Password
						</label>
						<input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-gray-400 rounded-lg py-2 px-3" />
					</div>
					<button
						type="button"
						disabled={isLoading ? true : false}
						onClick={handleLogin}
						className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300 disabled:bg-slate-400">
						Login
					</button>
					{isLoading && <Loader />}
				</form>
			</div>
		</div>
	);
};
export default Login;
