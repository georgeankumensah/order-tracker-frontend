import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectedProduct, setProducts } from "../redux/actions/productActions";
import api from "../api/api";
import Header from "./Header";

const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth);
  const packages = useSelector((state) => state.allProducts.products);
  console.log(user);
  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        await api.get("/order").then((res) => {
          console.log(res.data);
          dispatch(setProducts(res.data));
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllOrders();
  }, [dispatch]);
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
	  <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

      <h1 className="text-3xl py-4">Dashboard</h1>
      <hr className="mb-4"/>
      <div>
        {packages &&
          packages.map((item,index) => {
            return (
				<Link to={`/packages/${item.shareableID}`} onClick={()=>{
					dispatch(selectedProduct(item))
				} }>
              <div className=" bg-white mb-2 hover:cursor-pointer  flex items-center rounded-lg py-3 px-3 shadow  hover:bg-blue-400 text-gray-900 hover:text-white divide-gray-200">
                <h3 >No.{" "} {index}.</h3>
				{" "}
				<p>
				{item.name}
				</p>
              </div>
			  </Link>
            );
          })}
      </div>
	  </div>

    </div>
  );
};

export default Dashboard;
