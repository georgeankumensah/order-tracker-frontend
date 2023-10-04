import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import { Route, Routes ,Navigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import ProductDetail from "./components/ProductDetail";
import ProductListing from "./components/ProductListing";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);


  console.log(isAuthenticated);
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<ProductListing />} />
        <Route
          exact
          path="/packages/:shareableId"
          element={<ProductDetail />}
        />
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
          }
          // element={<Dashboard />}
        />
      </Routes>
    </>
  );
}

export default App;
