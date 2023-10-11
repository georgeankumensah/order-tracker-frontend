import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectedProduct, setProducts } from "../redux/actions/productActions";
import api from "../api/api";
import Header from "./Header";

import Modal from "./Modal";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const packages = useSelector((state) => state.allProducts.products);

  // states
  const [showCreateOrder, setShowCreateOrder] = useState(false);

  showCreateOrder == true ? console.log("create is true") : console.log("false");

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


  const CreateOrderModal = () => {
    (
      <Modal>
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto lg:w-1/2">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
        </div>
      </Modal>
    );
  };



  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      {setShowCreateOrder && CreateOrderModal}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl py-4">Dashboard</h1>
          <button
            onClick={() => setShowCreateOrder(true)}
            className="bg-blue-500 hover:bg-blue-700 h-fit text-white font-bold py-2 px-4 rounded"
          >
            Create Admin
          </button>
        </div>
        <hr className="mb-4" />
        <div>
          {packages &&
            packages.map((item, index) => {
              return (
                <Link
                  key={item._id}
                  to={`/packages/${item.shareableID}`}
                  onClick={() => {
                    dispatch(selectedProduct(item));
                  }}
                >
                  <div className=" bg-white mb-2 hover:cursor-pointer  flex items-center rounded-lg py-3 px-3 shadow  hover:bg-blue-400 text-gray-900 hover:text-white divide-gray-200">
                    <h3>No. {index}.</h3> <p>{item.name}</p>
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
