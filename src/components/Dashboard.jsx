import { useEffect } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { setProducts } from "../redux/actions/productActions";
import api from "../api/api";
import Header from "./Header";

const Dashboard = () => {
	 const dispatch = useDispatch();
	 const { user } = useSelector((state) => state.auth);
	 const orders = useSelector((state) => state.product);
	 console.log(user);
	useEffect(() => {
		const fetchAllOrders = async () => {
			try {
				await api.get("/order").then((res) => {
					console.log(res.data);
					dispatch(setProducts(res.data))
				});
			} catch (error) {
				console.log(error);
			}
		};
		fetchAllOrders();
	}, []);
	return (
		<div>
			<Header />
			<h1 className="text-3xl py-4">Dashboard</h1>
			<hr />
		</div>
	);
};

export default Dashboard;
