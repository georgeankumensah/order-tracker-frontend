import axios from "axios";
import {useEffect,useState} from "react";
import api from "../api/api";

const Dashboard = () => {

    const fetchAllOrders = async () =>{
        try {
            await api.get("/orders").then(res=>{
                console.log(res.data)
            })
        } catch (error) {
            console.log(error)
        }
      
    }
    useEffect(
      fetchAllOrders(),[]
    )
    return (
        <div>
            <h1 className="text-3xl py-4">Dashboard</h1>
            <hr />
        </div>
    )
}

export default Dashboard