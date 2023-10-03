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
  const [statusName,setStatusName] = useState([
    "Order Confirmed",
    "Shipped",
    "Out For Delivery",
    "Delivered"

  ])
  const orderStatus = fetchedStatus;
  const [isCopied, setCopied] = useClipboard(shareableId, {
    successDuration: 1000,
  });

  // GwAm61LKE
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
    currentWarehouse,
    expectedArrivalTime,
    createdAt,
    otherInformation,
    details,
  } = order;

  const formattedOrderDate = createdAt ? new Date(createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : "UNKNOWN";
  const formattedArrivalDate = expectedArrivalTime ? new Date(expectedArrivalTime).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : "UNKNOWN";

  // mE6Z6YtWz
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
    <div className="px-[6rem] pt-[2rem] bg-white ">
      {isLoading && <Loader />}
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl text-[#0a0a0a] font-medium">
            Order ID : {_id}
          </h1>
          <div className="flex items-center gap-[1rem]">
            <p className="font-medium text-[#0a0a0a] mr-2">Order date : {formattedOrderDate}</p>
            <p className=" font-medium  text-green-500">Estimated delivery : {formattedArrivalDate || " UNKNOWN"} </p>
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
                <ul className="steps font-medium">
                  {
                    statusName.map((item,index) => {
                      const statusLength = orderStatus.length;
                      return (
                        <li className={`step ${index < statusLength  ? "step-info " : ""}`} key={index}>{item}</li>
                      )
                    })

                  }
                </ul>

              <br />
              <p className="font-medium relative mt-3  text-[#0a0a0a] ">
                Package Name : <br />{" "}
                <span className="font-normal text-xl">{name}</span>{" "}
              </p>
              <br />
              <p className="font-medium text-[#0a0a0a]">Quantity : <span className="font-normal text-sm">{qty}</span></p>
              {destination && (
                <>
                  <p  className="font-medium relative mt-3  text-[#0a0a0a] ">From :  <span className="font-normal text-sm">{destination.from}</span></p>
                  <p  className="font-medium relative mt-3  text-[#0a0a0a] ">To :  <span className="font-normal text-sm">{destination.to}</span></p>
                </>
              )}
              <br />
              <p className="font-medium text-[#0a0a0a]">
                Package Contains (Package details) : <br />
                <span className="font-normal text-sm">{details}</span>
                
              </p>
              <br />
              <p className="font-medium text-[#0a0a0a] ">Currently At : <span className="font-normal text-sm">{currentWarehouse || "UNKNOWN"}</span> </p>
              <br />
              <p className="font-medium text-[#0a0a0a] mb-[60px]">
                Important Information : <br />
                {Object.entries(otherInformation).map(([key, value]) => (
                  <span key={key}>
                    {key}: <span className="font-normal text-sm">{value}</span>
                    <br />
                  </span>
                ))}
              </p>
            </div>
            <div className="flex flex-col   border-l-[3px] pl-[2rem] border-[#c7c7c7]">
          <h1 className="text-2xl  font-semibold">History</h1>
          <hr className="h-2 mt-2" />
          <br />
          <ol>
          {status && status.map((item, index) => {
            const arrivalDate = new Date(item.arrivalDate);
            const today = new Date();
            const diffTime = Math.abs(today - arrivalDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            const formattedDate = `${diffDays} days ago`;
            return (
              <li key={index}>
                <div className="flex items-center gap-[1rem]">
                  <p className="font-normal text-[#0a0a0a]">
                    {item.statusTitle} -
                  </p>
                  <p className="font-normal text-sm">{formattedDate}</p>
                </div>
              </li>
            );
          })}
          </ol></div>
          </div>
             
             
        </>
      )}
    </div>
  );
};

export default ProductDetail;
