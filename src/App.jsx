import React, { useContext, useEffect } from "react";
import "./App.css";
import { Context } from "./main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Items from "./components/Item/Items";
import ItemDetails from "./components/Item/ItemDetails";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import PostItem from "./components/Item/PostItem";

import NotFound from "./components/NotFound/NotFound";
import MyJobs from "./components/Item/MyItems";

const App = () => {
  console.log("printing this ");
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  // if (isAuthorized) {
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await axios.get(
            "https://deploymern-kil0h6wlh-raushan6760s-projects.vercel.app/api/v1/user/getuser",
            {
              withCredentials: true,
            }
          );
          setUser(response.data.user);
          setIsAuthorized(true);
        } catch (error) {
          setIsAuthorized(false);
        }
      };
      fetchUser();
    }, [isAuthorized]);
  // }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/item/getall" element={<Items />} />
        <Route path="/job/:id" element={<ItemDetails />} />
        <Route path="/application/:id" element={<Application />} />
        <Route path="/responses/me" element={<MyApplications />} />
        <Route path="/item/post" element={<PostItem />} />
        <Route path="/item/me" element={<MyJobs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
