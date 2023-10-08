


import spinner from "../assets/spinner.gif";


const Loader = ({message}) => {
    // setFetchedStatus(status);
    return (
      <div className="flex items-center  ">
        <img src={spinner} className="w-[2rem] aspect-square" alt="spinner" />
        <p className="font-medium ml-2">{message}</p>
      </div>
    );
  };

  export default Loader;