import {useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import { useSelector ,useDispatch} from "react-redux";
import { logout } from "../redux/actions/authActions";
import api from "../api/api";
import { useEffect } from "react";

const Header = () => {
  const { isAuthenticated,user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

 

  const [isLoading, setIsLoading] = useState(false);
  const handleLogout =async () => {
    setIsLoading(true);
    await api.post("user/logout").then((res) => {
      console.log(res.data);
      setIsLoading(false);
      localStorage.removeItem("user");
      navigate(`/login`);
    }).catch((err) => {
      console.log(err);
      setIsLoading(false);
    }
    )

    dispatch(logout())
  }
  return (
    <div className="bg-[#1a1c1d] h-[5rem] flex items-center px-[2rem] w-full shadow-sm">
      <div className="flex items-center justify-between w-full">
        <Link to="/" className="mr-[2rem]">
          <h1 className="text-xl font-bold text-white">GoldTracker</h1>
        </Link>
        {
          isAuthenticated && (<>
          <div className="text-white flex  gap-5">
          <Link to="/dashboard">
                Dashboard
            </Link>
         {
          user.isSuperAdmin && (
            <Link to="/admins">
              Manage Admins
            </Link>

          )
         }

          </div>
        <button onClick={()=>handleLogout()} className={`${isLoading? "bg-red-800":"bg-red-400"} text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300`}>
          {isLoading ? "Logging you out" : "Log out"}
        </button>
          </>
        )
        }
      </div>
    </div>
  );
};

export default Header;
