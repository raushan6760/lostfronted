import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
const ItemDetails = () => {
  const { id } = useParams();
  const [items, setitems] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`https://deploymern-kil0h6wlh-raushan6760s-projects.vercel.app/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setitems(res.data.job);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, []);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  // console.log("items",items)
  return (
    <section className="jobDetail page">
      <div className="container">
        <h3>item Details</h3>
        <div className="banner">
        {items && items.item &&  items.item.url ?   <div className="resume">
          <img
            src={items.item.url}
            alt="item"
            // onClick={() => openModal(element.resume.url)}
          />
        </div>:"" }
          <p>
            Item Name : <span> {items.title}</span>
          </p>
          <p>
            Category: <span>{items.category}</span>
          </p>
          <p>
            Question To Verify : <span>{items.question}</span>
          </p>
        
          <p>
            Location: <span>{items.location}</span>
          </p>
          <p>
            Description: <span>{items.description}</span>
          </p>
          <p>
            Job Posted On: <span>{items.jobPostedOn}</span>
          </p>
          
          {user && user.role === "Employer" ? (
            <></>
          ) : (
            <Link to={`/application/${items._id}`}>Found items</Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default ItemDetails;