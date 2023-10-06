import axios from "axios";

const api = axios.create({
	baseURL: "/api",
});

// Add a request interceptor to include the token in all requests
api.interceptors.request.use((config) => {
	const user = localStorage.getItem("user");
	if (user) {
		config.headers.Authorization = `Bearer ${user.hash}`;
	}
	console.log(config);
	return config;
});

export default api;
