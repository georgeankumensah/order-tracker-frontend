import React, { useState } from "react";
import Header from "./Header";

import Loader from "./Loader";
import Modal from "./Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUserShield } from "react-icons/fa";

import api from "../api/api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAdmins,
  selectedAdmin,
  editAdmin,
  deleteAdmin,
  addAdmin,
} from "../redux/actions/adminActions";

function ManageAdmins() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      setIsLoading(true);
      await api.get("/user/admins").then((res) => {
        console.log(res.data);

        dispatch(setAdmins(res.data));
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const admins = useSelector((state) => state.admins.admins);
  const { username } = useSelector((state) => state.auth.user);
  const activeAdmin = useSelector((state) => state.admins.selectedAdmin);

  const [adminCredentials, setAdminCredentials] = useState({});

  const handleAdminEdit = (admin) => {
    // handle editing admin credentials here
    console.log(adminCredentials);
    setShowEditModal(true);
    let adminId = admin._id;
    dispatch(selectedAdmin(adminId));
  };

  const CreateAdminModal = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);

    const newAdmin = {
      username: username,
      password: password,
      isSuperAdmin: isSuperAdmin,
      isAdmin: true,
    };

    console.log(newAdmin);

    const handleCreateAdmin = async (e) => {
      try {
        await api.post("/user/register/", newAdmin).then((res) => {
          console.log(res.data);

          if (res.status === 200) {
            // setShowCreateModal(false);
            dispatch(addAdmin(res.data));
            toast.success("Admin created successfully", {
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
            toast.error(res.data.message, {
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
        });
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <Modal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
        }}
      >
        <form>
          <h1 className="text-2xl font-semibold my-[10px] text-center">
            Create Admin Login Credentials
          </h1>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="text"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              //   value={adminCredentials.password}
            />
          </div>
          <div className="mb-4 flex items-center gap-5">
            <label
              htmlFor="isAdmin"
              className="block text-gray-700 font-bold mb-2"
            >
              Is Admin
            </label>
            <input
              type="checkbox"
              name="isAdmin"
              id="isAdmin"
              checked={true}
              onChange={() => setIsSuperAdmin(true)}
            />
          </div>
          <div className="mb-4 flex items-center gap-5">
            <label
              htmlFor="isSuperAdmin"
              className="block text-gray-700 font-bold mb-2"
            >
              Is Super Admin
            </label>
            <input
              type="checkbox"
              name="isSuperAdmin"
              id="isSuperAdmin"
              checked={isSuperAdmin}
              onChange={() => setIsSuperAdmin(!isSuperAdmin)}
            />
          </div>
          <div
            className="flex
            gap-3 items-center"
          >
            <button
              type="submit"
              onClick={() => handleCreateAdmin(e)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Admin
            </button>
          </div>
        </form>
      </Modal>
    );
  };

  const EditModal = () => {
    useEffect(
      () => setAdminCredentials(...activeAdmin),
      console.log(adminCredentials),

      [activeAdmin]
    );
    const { _id, username, password, isAdmin, isSuperAdmin } = adminCredentials;
    const [newUsername, setNewUsername] = useState(username || "");
    const [newPassword, setNewPassword] = useState(password || "");
    const [newIsAdmin, setNewIsAdmin] = useState(isAdmin || false);
    const [newIsSuperAdmin, setNewIsSuperAdmin] = useState(
      isSuperAdmin || false
    );

    const updatedAdmin = {
      ...adminCredentials,
      username: newUsername,
      password: newPassword,
      isAdmin: newIsAdmin,
      isSuperAdmin: newIsSuperAdmin,
    };

    if (!adminCredentials || Object.keys(adminCredentials).length === 0) {
      console.log("Admin credentials are empty or null");
      return;
    }

    console.log(updatedAdmin);
    const handleEditAdmin = async (e) => {
      try {
        console.log("updated admin" + updatedAdmin);

        await api
          .put(`/user/admin/${_id}`, updatedAdmin)
          .then((res) => {
            console.log(res.data);
            setShowEditModal(false);
            dispatch(editAdmin(res.data));
          })
          .then((res) => {
            if (res.status === 200) {
              toast.success("Admin updated successfully", {
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
              toast.error(res.data.message, {
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
          });
      } catch (error) {
        console.log(error);
      }
    };

    const handleDeleteAdmin = async (e) => {
      try {
        console.log("updated admin" + updatedAdmin);

        await api
          .delete(`/user/admin/${_id}`)
          .then((res) => {
            console.log(res.data);
            setShowEditModal(false);
            dispatch(deleteAdmin(res.data));
          })
          .then((res) => {
            if (res.status === 200) {
              toast.success("Admin deleted successfully", {
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
              toast.error(res.data.message, {
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
          });
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
        }}
      >
        <form onSubmit={handleEditAdmin}>
          <h1 className="text-2xl font-semibold my-[10px] text-center">
            Update Admin Login Credentials
          </h1>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="text"
              name="password"
              id="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              //   value={adminCredentials.password}
            />
          </div>
          <div className="mb-4 flex items-center gap-5">
            <label
              htmlFor="isAdmin"
              className="block text-gray-700 font-bold mb-2"
            >
              Is Admin
            </label>
            <input
              type="checkbox"
              name="isAdmin"
              id="isAdmin"
              checked={newIsAdmin}
              onChange={() => setNewIsAdmin(true)}
            />
          </div>
          <div className="mb-4 flex items-center gap-5">
            <label
              htmlFor="isSuperAdmin"
              className="block text-gray-700 font-bold mb-2"
            >
              Is Super Admin
            </label>
            <input
              type="checkbox"
              name="isSuperAdmin"
              id="isSuperAdmin"
              checked={newIsSuperAdmin}
              onChange={() => setNewIsSuperAdmin(!newIsSuperAdmin)}
            />
          </div>
          <div
            className="flex 
          gap-3 items-center"
          >
            <button
              type="submit"
              onClick={() => handleEditAdmin(e)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Update
            </button>
            <button
              type="Submit"
              onClick={() => handleDeleteAdmin(e)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete this Admin (cannot be undone)
            </button>
          </div>
        </form>
      </Modal>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <ToastContainer />

      {isLoading ? (
        <Loader message={"fetching admins"} />
      ) : (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* modal here */}
          {showEditModal && <EditModal />}
          {showCreateModal && <CreateAdminModal />}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Admins
              <span className="font-normal text-sm ">
                {" "}
                (You are logged in as {username} )
              </span>
            </h1>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Admin
            </button>
          </div>
          <div className="mt-6">
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {admins &&
                admins.map((admin) => (
                  <button
                    key={admin._id}
                    onClick={() => {
                      handleAdminEdit(admin);
                    }}
                  >
                    <li className="col-span-1 bg-white rounded-lg shadow divide-y hover:bg-blue-400 text-gray-900 hover:text-white divide-gray-200">
                      <div className="w-full flex items-center justify-between p-6 space-x-6">
                        <div className="flex-1 truncate">
                          <div className="flex items-center space-x-3">
                            <FaUserShield
                              size={30}
                              className="inline-block mr-2"
                            />
                            <h3 className=" text-sm font-medium truncate">
                              {admin.username} :{" \n"}
                              {admin.isSuperAdmin ? "SuperAdmin" : "Admin"}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </li>
                  </button>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageAdmins;
