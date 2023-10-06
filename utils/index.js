import axios from "axios";
const url = "http://localhost:8000";
export const getTrackingDetails = (trackingId) => {
	axios
		.get(url + "/orders/shareable/" + trackingId)
		.then((res) => {
			// console.log(res.data)
			return res.data;
		})
		.catch((err) => {
			console.log(err);
			// return err
		});
};
