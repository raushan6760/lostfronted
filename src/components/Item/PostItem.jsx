import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
const PostItem = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [question, setquestion] = useState("");
  // const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
 
  const [item, setitem] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const handleFileChange = (event) => {
    const item = event.target.files[0];
    setitem(item);
  };
// contryb --> question  and city remove 

  const handleJobPost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("question", question);
    formData.append("location", location);
    // formData.append("city", city);
    formData.append("item", item);

    try {
      const { data } = await axios.post(
        "https://deploymern-kil0h6wlh-raushan6760s-projects.vercel.app/api/v1/job/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setTitle("");
      setDescription("");
      setCategory("");
      setquestion("");
      setLocation("");
      // setCity("");
      setitem(null);
      toast.success(data.message);
      navigateTo("/item/getall");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const navigateTo = useNavigate();
  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  return (
    <>
      <div className="job_post page">
        <div className="container">
          <h3>POST NEW ITEM</h3>
          <form onSubmit={handleJobPost}>
            <div className="wrapper">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Item Name"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Mobile">Mobile</option>
                <option value="Laptop">
                  Laptop
                </option>
                <option value="Mobile Charger">
                  Mobile Charger 
                </option>
                <option value="Laptop Charger">
                  Laptop Charger 
                </option>
                <option value="Book / Copy ">Book / Copy </option>
                <option value="EarPhone / Headphone">
                  EarPhone / Headphone 
                </option>
                <option value="Key">Key </option>
                <option value="Others">
                  Others 
                </option>
     
              </select>
            </div>
            <div className="wrapper">
              <input
                type="text"
                value={question}
                onChange={(e) => setquestion(e.target.value)}
                placeholder="Enter A Question Base On Item (e.g - what is colour of phone)"
              />
              {/* <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              /> */}
            </div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="From which location was this item retrieved? (e.g- Mess)"
            />

            <div>
              <label
                style={{
                  textAlign: "start",
                  display: "block",
                  fontSize: "20px",
                }}
              >
                Select item
              </label>
              <input
                type="file"
                accept=".pdf, .jpg, .png"
                onChange={handleFileChange}
                style={{ width: "100%" }}
              />
            </div>
            {/* <div className="salary_wrapper">
              <select
                value={salaryType}
                onChange={(e) => setSalaryType(e.target.value)}
              >
                <option value="default">Select Salary Type</option>
                <option value="Fixed Salary">Fixed Salary</option>
                <option value="Ranged Salary">Ranged Salary</option>
              </select>
              <div>
                {salaryType === "default" ? (
                  <p>Please provide Salary Type *</p>
                ) : salaryType === "Fixed Salary" ? (
                  <input
                    type="number"
                    placeholder="Enter Fixed Salary"
                    value={fixedSalary}
                    onChange={(e) => setFixedSalary(e.target.value)}
                  />
                ) : (
                  <div className="ranged_salary">
                    <input
                      type="number"
                      placeholder="Salary From"
                      value={salaryFrom}
                      onChange={(e) => setSalaryFrom(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Salary To"
                      value={salaryTo}
                      onChange={(e) => setSalaryTo(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div> */}
            <textarea
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Item Description"
            />
            <button type="submit">Post Item</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostItem;
