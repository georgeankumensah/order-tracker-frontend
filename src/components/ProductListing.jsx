import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import deliveryGuy from "../assets/delivery-guy.png";
import spinner from "../assets/spinner.gif";

import api from "../api/api";
import { selectedProduct } from "../redux/actions/productActions";
import ProductComponent from "./ProductComponent";

import Header from "./Header";

const ProductListing = () => {
	const dispatch = useDispatch();
	const [trackingId, setTrackingId] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const Loader = () => {
		return (
			<div className="flex items-center  ">
				<img src={spinner} className="w-[2rem] aspect-square" alt="spinner" />
				<p className="font-medium ml-2">Wait while we find your package..</p>
			</div>
		);
	};

	const products = useSelector((state) => state);
	console.log(products);
	const handleTrackOrder = async () => {
		console.log("trigger");
		setIsLoading(true);
		// H77ca4fJh

		await api
			.get("/order/shareable/" + trackingId)
			.then((res) => {
				console.log(res.data);
				setIsLoading(false);
				navigate(`/packages/${trackingId}`);
				dispatch(selectedProduct(res.data));
				return res.data;
			})
			.catch((err) => {
				setIsLoading(false);
				const status = err.response.status;
				if (status == 404) {
					toast.error("Tracking ID not found", {
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
				console.log(err);
				setTrackingId("");
				// return err
			});
	};

	return (
		<div className=" bg-[#f7f7f7]">
			<Header/>
			<ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
			<div className="flex items-center justify-center">
				<div className="flex flex-col pl-[2rem] gap-[1rem] relative">
					<h1 className="text-[#003C75] text-[4.40356rem] not-italic font-extrabold leading-[normal]">QUICKLY TRACK YOUR PACKAGE</h1>
					<div className="flex items-center border-[1px] w-fit shadow-lg">
						<input
							type="text"
							required
							className="w-[20rem] h-[3rem] bg-white p-[0.5rem] outline-none"
							placeholder="Tracking ID"
							value={trackingId}
							onChange={(e) => setTrackingId(e.target.value)}
						/>
						<button onClick={() => handleTrackOrder()} className="bg-green-600 h-[3rem] w-[8rem] text-xl font-bold text-white px-[15px]">
							Track
						</button>
					</div>
					{isLoading && <Loader />}
				</div>
				<img src={deliveryGuy} className="aspect-auto h-[34.625rem] bg-yellow-200" alt="delivery guy" />
			</div>
		</div>
	);
};

export default ProductListing;
