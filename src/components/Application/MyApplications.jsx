import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  // const [validate, setvalidate] = useState(false);

  const { isAuthorized } = useContext(Context);

  const navigateTo = useNavigate();

  const [dynamicObject, setdynamicobject] = useState({});
  const [validateitem, setvalidateitem] = useState({});

  // console.log(validate);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.role === "Employer") {
          const response = await axios.get(
            "https://deploymern-kil0h6wlh-raushan6760s-projects.vercel.app/api/v1/application/employer/getall",
            {
              withCredentials: true,
            }
          );
          setApplications(response.data.applications);
        } else {
          const response = await axios.get(
            "https://deploymern-kil0h6wlh-raushan6760s-projects.vercel.app/api/v1/application/jobseeker/getall",
            {
              withCredentials: true,
            }
          );
          setApplications(response.data.applications);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchData();
  }, [isAuthorized]);

  useEffect(
    () => {
      applications.map((element) => {
        console.log("inside useEffect function ", element);
        if (element.validate === true) {
          console.log(
            "validation true of jobseeker",
            element.applicantID.user,
            element.employerID.user
          );
          const dynamickey = `validate${element.applicantID.user}_${element.employerID.user}`;
          setdynamicobject((prevState) => ({
            ...prevState,
            [dynamickey]: true,
          }));
        }
      });
    },
    [applications],
    [isAuthorized]
  );

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
    }
  }, [isAuthorized]);

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`https://deploymern-kil0h6wlh-raushan6760s-projects.vercel.app/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const employeedeleteApplication = (id) => {
    try {
      console.log("not validate coming in delete");
      axios
        .delete(
          `https://deploymern-kil0h6wlh-raushan6760s-projects.vercel.app/api/v1/application/deleteemployee/${id}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const validateApplication = async (id) => {
    try {
      console.log("working ");
      const applicationId = prompt("Please enter ItemId");
      if (!applicationId) return; // Exit if the user cancels or does not provide an ID

      console.log("Application ID:", applicationId);
      const validatekey = `validate${applicationId}`;
      localStorage.setItem(validatekey,true)
      setvalidateitem((prevState) => ({
        ...prevState,
        [validatekey]: true,
      }));
      // Find the application with the matching ID
      const application = applications.find((element) => element._id === id);
      if (!application) {
        console.error("Application not found");
        return;
      }

      console.log("Employer ID:", application.name, application.phone);

      // Make a PATCH request to update the application
      const response = await axios.put(
        `https://deploymern-kil0h6wlh-raushan6760s-projects.vercel.app/api/v1/application/application/${applicationId}`,
        {},
        { withCredentials: true }
      );

      console.log(
        "Application updated successfully:",
        response.data.application
      );
    } catch (error) {
      console.error("Error updating application:", error);
      // Handle errors gracefully, e.g., display a toast message to the user
      toast.error("An error occurred while updating the application.");
    }
  };

  const notValidateApplication = (id) => {
    console.log("clicked not validate ", id);
    employeedeleteApplication(id);
  };

  return (
    <section className="my_applications page">
      {user && user.role === "Job Seeker" ? (
        <div className="container">
          <h1>My Responses</h1>
          {applications.length <= 0 ? (
            <>
              {" "}
              <h4>No Response Found</h4>{" "}
            </>
          ) : (
            applications.map((element) => {
              return (
                <JobSeekerCard
                  dynamicObject={dynamicObject}
                  element={element}
                  key={element._id}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      ) : (
        <div className="container">
          <h1>Applications From Lost Items</h1>
          {applications.length <= 0 ? (
            <>
              <h4>No Response Found</h4>
            </>
          ) : (
            applications.map((element) => {
              return (
                <EmployerCard
                  // validate={validate}
                  verify={() => validateApplication(element._id)}
                  notverify={() => notValidateApplication(element._id)}
                  validateitem={validateitem}
                  element={element}
                  key={element._id}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({
  element,
  deleteApplication,
  openModal,
  dynamicObject,
}) => {
  const key = `validate${element.applicantID.user}_${element.employerID.user}`;
  const [phone, setphone] = useState("");

  axios
    .get(
      `https://deploymern-kil0h6wlh-raushan6760s-projects.vercel.app/api/v1/user/getemployee/${element.employerID.user}`,
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      console.log("employee deatials successfully:", response.data.empoloyee);
      setphone(response.data.empoloyee.phone);
    })
    .catch((error) => {
      console.error("Error updating application:", error);
    });

  let iskey = false;
  iskey = dynamicObject.hasOwnProperty(key);
  console.log("key  from job ", iskey, phone);

  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Question : </span> {element.question} <br />
            <span>Answer:</span> {element.answer}
          </p>
          <p>
            <span>Item Description :</span> {element.description}
          </p>

          {element.validate && iskey ? (
            <>
              <button
                style={{
                  backgroundColor: "green",
                  width: "145px",
                  height: "35x",
                }}
              >
                Approved
              </button>
              <p style={{ color: "blue" }}>
                Here is the Number : <b>{phone}</b> , You can contact{" "}
              </p>
            </>
          ) : (
            <>
              <button
                style={{
                  backgroundColor: "red",
                  width: "145px",
                  height: "35x",
                }}
              >
                <b>pending state</b>
              </button>
              <p style={{ color: "blue" }}>
                wait for Approval then you can get his number{" "}
              </p>
            </>
          )}
        </div>
        <div className="resume">
          {element && element.imgsource ? (
            <img
              src={element.imgsource}
              alt="resume"
              onClick={() => openModal(element.imgsource)}
            />
          ) : (
            ""
          )}
        </div>
        <div className="btn_area">
          <button onClick={() => deleteApplication(element._id)}>
            Delete Application
          </button>
        </div>
      </div>
    </>
  );
};

const EmployerCard = ({
  element,
  openModal,
  verify,
  notverify,
  validateitem,
}) => {
  // console.log("verify in employe",verify)
  // console.log("validate", validate);
  // console.log("validate in employe",validate)

  let itemkey = `validate${element._id}`;
  let isvalidate = localStorage.getItem(`validate${element._id}`)
  let isvalidates = false;

  isvalidates = validateitem.hasOwnProperty(itemkey);
  console.log("key  from validate ", isvalidate,isvalidates);

  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          {/* <p> */}
          <h4>ITEM ID :{element._id} </h4>
          {/* </p> */}
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Question Asked By You : </span> {element.question} <br />
            <span>Answer of your question:</span> {element.answer}
          </p>
          <p>
            <span>description:</span> {element.description}
          </p>

          <h5 style={{ color: "blue" }}>
            Is Validated :{(isvalidate || isvalidates) ? "YES" : "NO"}
          </h5>

          <button
            onClick={() => verify(element._id)}
            style={{ backgroundColor: "green", width: "145px", height: "35x" }}
          >
            <b>Validate </b>
          </button>
          <button
            onClick={() => notverify(element._id)}
            style={{ backgroundColor: "red", width: "145px", height: "35x" }}
          >
            <b>Delete Response </b>
          </button>
        </div>
        <div className="resume">
          {element && element.imgsource ? (
            <img
              src={element.imgsource}
              alt="resume"
              onClick={() => openModal(element.imgsource)}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
