import { useEffect } from "react";
import api from "../api/api";

const Dashboard = () => {
	useEffect(() => {
		const fetchAllOrders = async () => {
			try {
				await api.get("/orders").then((res) => {
					console.log(res.data);
				});
			} catch (error) {
				console.log(error);
			}
		};
		fetchAllOrders();
	}, []);
	return (
		<div>
			<h1 className="text-3xl py-4">Dashboard</h1>
			<hr />
		</div>
	);
};

export default Dashboard;
