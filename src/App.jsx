import { useEffect, useState } from "react";

import "./App.css";
import Header from "./components/Header";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "./redux/actions/authActions";
import ProductDetail from "./components/ProductDetail";
import ProductListing from "./components/ProductListing";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import api from "./api/api";

function App() {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const { isAuthenticated } = useSelector((state) => state.auth); // Modify this based on your Redux state structure
	const dispatch = useDispatch();
	// Initial dispatch
	// Fetch user information on page load

	useEffect(() => {
		(async function () {
			try {
				setIsLoading(true);
				const { data } = await api.get("/user");

				dispatch(loginSuccess(data));
				setIsLoading(false);
				setError(null);
			} catch (error) {
				setIsLoading(false);
				setError(error?.message);
				console.log(error);
			}
		})();
	}, [dispatch]);
	return (
		<>
			{/* You can set protected pages using error */}
			{isLoading && <p>Loading component here</p>}
			{!isLoading && (
				<>
					<Header />
					<Routes>
						<Route exact path="/" element={<ProductListing />} />
						<Route exact path="/packages/:shareableId" element={<ProductDetail />} />
						<Route exact path="/login" element={<Login />} />
						<Route exact path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />} />
					</Routes>
				</>
			)}
		</>
	);
}

export default App;
