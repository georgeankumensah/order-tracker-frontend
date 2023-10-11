import { useEffect, useState } from "react";

import "./App.css";
import Header from "./components/Header";
import { Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "./redux/actions/authActions";
import ProductDetail from "./components/ProductDetail";
import ProductListing from "./components/ProductListing";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import ManageAdmins from "./components/ManageAdmins";

import api from "./api/api";

function App() {
	const [isLoading, setIsLoading] = useState(null);
	const [error, setError] = useState(false);
	const { isAuthenticated,user } = useSelector((state) => state.auth); // Modify this based on your Redux state structure
	const dispatch = useDispatch();
	// Initial dispatch
	// Fetch user information on page load

	useEffect(() => {
		(async function () {
			try {
				setIsLoading(true);
				const { data } = await api.get("/user/").then(()=>
					{setIsLoading(false);}
				);
				console.log(data);

				dispatch(loginSuccess(data));
				
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
			{/* {
				error && <p className="py-1 text-center bg-red-500 text-white text-sm">{error}</p>
			} */}
			{!isLoading && (
				<>
					<Routes>
						{/* public routes */}
						<Route exact path="/" element={<ProductListing />} />
						<Route exact path="/packages/:shareableId" element={<ProductDetail />} />
						{/* protected routes */}
						<Route exact path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" replace />} />
						<Route exact path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />} />
						<Route exact path="/admins" element={(user && user.isSuperAdmin)? <ManageAdmins /> : <Navigate to="/login" replace />} />
						<Route exact path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</>
			)}
		</>
	);

}

export default App;
