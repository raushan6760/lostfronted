import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { GiCogLock } from "react-icons/gi";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  useEffect(() => {
    try {
      axios
        .get("https://deploymern-kil0h6wlh-raushan6760s-projects.vercel.app/api/v1/job/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
    }
  },[]);

  return (
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE ITEMS</h1>
        <div className="banner">
          {jobs.jobs &&
            jobs.jobs.map((element) => {
              console.log(element)
              return (
                <div className="card" key={element._id}>
                {element && element.item && element.item.url ?   <div className="resume">
          <img
            src={element.item.url}
            alt="item" height="500px" 
  // height: auto; /* Maintain aspect ratio */
  // object-fit: cover;
            // onClick={() => openModal(element.resume.url)}
          />
        </div>:"" }
                
                  <p>{element.title}</p>
                  {/* <p>{element.category}</p> */}
                  <p>Found : {element.location}</p>
                  <p>Posted At :{element.jobPostedOn}</p>
                  <Link to={`/job/${element._id}`}>Item Details</Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
