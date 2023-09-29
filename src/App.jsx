import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import ProductDetail from "./components/ProductDetail";
import ProductListing from "./components/ProductListing";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<ProductListing/>} />
        <Route exact path="/packages/:shareableId" element={<ProductDetail/>} />
        
      </Routes>
    </>
  );
}

export default App;
