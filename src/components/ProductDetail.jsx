import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectedProduct } from "../redux/actions/productActions";
import useClipboard from "react-use-clipboard";
import { AiOutlineCopy } from "react-icons/ai";
import { Chrono } from "react-chrono";

import spinner from "../assets/spinner.gif";

const ProductDetail = () => {
  const { shareableId } = useParams();
  const [fetchedStatus, setFetchedStatus] = useState([]);
  const orderStatus = fetchedStatus;
  const [isCopied, setCopied] = useClipboard(shareableId, {
    successDuration: 1000,
  });

  // yTknS4TqO
  const [isLoading, setIsLoading] = useState(false);
  const url = "https://goldordertracker.onrender.com";
  const dispatch = useDispatch();
  const order = useSelector((state) => state.product);
  const {
    name,
    destination,
    image,
    _id,
    qty,
    status,

    otherInformation,
    details,
  } = order;

  console.log(order);
  console.log(shareableId);

  console.log(orderStatus);

  // const getStatus = () => {
  //   const statusIndex = orderStatus.findIndex((item) => item.title === status);
  //   return statusIndex;
  // };

  const Loader = () => {
    setFetchedStatus(status);
    return (
      <div className="flex items-center  ">
        <img src={spinner} className="w-[2rem] aspect-square" alt="spinner" />
        <p className="font-medium ml-2">Updating package details..</p>
      </div>
    );
  };

  const fetchOrderDetails = async () => {
    setIsLoading(true);
    await axios
      .get(url + "/orders/shareable/" + shareableId)
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        dispatch(selectedProduct(res.data));
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        // return err
      });
  };

  useEffect(() => {
    if (shareableId && shareableId != "") fetchOrderDetails();
    console.log("updated data");
  }, [shareableId]);

  return (
    <div className="mx-[6rem] mt-[2rem]">
      {isLoading && <Loader />}
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl text-[#0a0a0a] font-medium">
            Order ID : {_id}
          </h1>
          <div className="flex items-center gap-[1rem]">
            <p className="font-medium text-[#0a0a0a]">Order date : </p>
            <p className=" font-medium text-[#0a0a0a]">Estimated delivery : </p>
          </div>
        </div>
        <button onClick={setCopied} className="font-medium">
          Tracking ID :{" "}
          {isCopied ? (
            <span className="rounded-sm p-1 bg-green-400 text-white">
              Copied <AiOutlineCopy className="inline-block ml-2" />
            </span>
          ) : (
            <span className="rounded-sm p-1 bg-[#aaa7a7] text-white">
              {shareableId}
              <AiOutlineCopy className="inline-block ml-2" />
            </span>
          )}
        </button>
      </div>
      <hr className="my-[2rem]" />
      {!isLoading && (
        <>
          <div className="flex  items-start gap-[2rem]">
            <img
              className="w-[20rem] aspect-auto rounded-md"
              src={image}
              alt={name}
            />
            <div>
                <ul className="steps">
                  <li className="step step-primary">Order Confirmed</li>
                  <li className="step step-primary">Shipped</li>
                  <li className="step">Out For Delivery</li>
                  <li className="step">Delivered</li>
                </ul>

              <br />
              <p className="font-medium relative  text-[#0a0a0a] border-2 border-red-600">
                Package Name : <br />{" "}
                <span className="font-normal text-xl">{name}</span>{" "}
              </p>
              {destination && (
                <>
                  <p>{destination.to}</p>
                  <p>{destination.from}</p>
                </>
              )}
              <br />
              <p className="font-medium text-[#0a0a0a]">
                Package Contains : <br />
                {details}
              </p>
              <br />
              <p className="font-medium text-[#0a0a0a]">Quantity : {qty}</p>
              <p className="font-medium text-[#0a0a0a]">Status : </p>
              {/* <p>{warehouses}</p> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
