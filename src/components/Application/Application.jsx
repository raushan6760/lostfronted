import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [answer, setAnswer] = useState("");
  // const [resume, setResume] = useState(null);

  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  // Function to handle file input changes
  // const handleFileChange = (event) => {
  //   const resume = event.target.files[0];
  //   setResume(resume);
  // };

  const { id } = useParams();
  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("answer", answer);
    formData.append("description", description);
    // formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        "https://deploymern-kil0h6wlh-raushan6760s-projects.vercel.app/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setName("");
      setEmail("");
      setDescription("");
      setPhone("");
      setAnswer("");
      // setResume("");
      toast.success(data.message);
      navigateTo("/item/getall");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }

  return (
    <section className="application">
      <div className="container">
        <h3>Verification Form</h3>
        <form onSubmit={handleApplication}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Give Answer of That Question To Verify Item is Yours"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <textarea
            placeholder="Item Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {/* <div>
            <label
              style={{ textAlign: "start", display: "block", fontSize: "20px" }}
            >
              Select Resume
            </label>
            <input
              type="file"
              accept=".pdf, .jpg, .png"
              onChange={handleFileChange}
              style={{ width: "100%" }}
            />
          </div> */}
          <button type="submit">Send Form</button>
        </form>
      </div>
    </section>
  );
};

export default Application;