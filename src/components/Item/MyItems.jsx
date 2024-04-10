import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyItems = () => {
  const [myItems, setMyItems] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();
  //Fetching all Items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await axios.get(
          "https://deploymern-kil0h6wlh-raushan6760s-projects.vercel.app/api/v1/job/getmyjobs", //
          { withCredentials: true }
        );
        setMyItems(data.myJobs); //cap
      } catch (error) {
        toast.error(error.response.data.message);
        setMyItems([]);
      }
    };
    fetchItems();
  }, []);
  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  //Function For Enabling Editing Mode
  const handleEnableEdit = (ItemId) => {
    //Here We Are Giving Id in setEditingMode because We want to enable only that Item whose ID has been send.
    setEditingMode(ItemId);
  };

  //Function For Disabling Editing Mode
  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  //Function For Updating The Item
  const handleUpdateItem = async (ItemId) => {
    const updatedItem = myItems.find((Item) => Item._id === ItemId);
    await axios
      .put(`https://deploymern-kil0h6wlh-raushan6760s-projects.vercel.app/api/v1/job/update/${ItemId}`, updatedItem, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  //Function For Deleting Item
  const handleDeleteItem = async (ItemId) => {
    await axios
      .delete(`https://deploymern-kil0h6wlh-raushan6760s-projects.vercel.app/api/v1/job/delete/${ItemId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyItems((prevItems) =>
          prevItems.filter((Item) => Item._id !== ItemId)
        );
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (ItemId, field, value) => {
    // Update the Item object in the Items state with the new value
    setMyItems((prevItems) =>
      prevItems.map((Item) =>
        Item._id === ItemId ? { ...Item, [field]: value } : Item
      )
    );
  };

  return (
    <>
      <div className="myJobs page">
        {" "}
        {/* cap*/}
        <div className="container">
          <h1>Your Posted Items</h1>
          {myItems.length > 0 ? (
            <>
              <div className="banner">
                {myItems.map((element) => (
                  <div className="card" key={element._id}>
                    <div className="content">
                      <div className="short_fields">
                        <div>
                          <span>Item Name :</span>
                          <input
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.title}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "title",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          {" "}
                          <span>
                            What you have Asked Question For This Item:
                          </span>
                          <input
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.question}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "question",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        {/* <div>
                          <span>City:</span>
                          <input
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.city}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "city",
                                e.target.value
                              )
                            }
                          />
                        </div> */}
                        <div>
                          <span>Category:</span>
                          <select
                            value={element.category}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "category",
                                e.target.value
                              )
                            }
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                          >
                            <option value="Mobile">Mobile</option>
                            <option value="Laptop">Laptop</option>
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
                            <option value="Others">Others</option>
                          </select>
                        </div>
                        {/* <div>
                          <span>
                            Salary:{" "}
                            {element.fixedSalary ? (
                              <input
                                type="number"
                                disabled={
                                  editingMode !== element._id ? true : false
                                }
                                value={element.fixedSalary}
                                onChange={(e) =>
                                  handleInputChange(
                                    element._id,
                                    "fixedSalary",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              <div>
                                <input
                                  type="number"
                                  disabled={
                                    editingMode !== element._id ? true : false
                                  }
                                  value={element.salaryFrom}
                                  onChange={(e) =>
                                    handleInputChange(
                                      element._id,
                                      "salaryFrom",
                                      e.target.value
                                    )
                                  }
                                />
                                <input
                                  type="number"
                                  disabled={
                                    editingMode !== element._id ? true : false
                                  }
                                  value={element.salaryTo}
                                  onChange={(e) =>
                                    handleInputChange(
                                      element._id,
                                      "salaryTo",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            )}
                          </span>
                        </div> */}
                        <div>
                          {" "}
                          <span>Found Item By User:</span>
                          <select
                            value={element.expired}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "expired",
                                e.target.value
                              )
                            }
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                          >
                            <option value={true}>YES</option>
                            <option value={false}>NO</option>
                          </select>
                        </div>
                      </div>
                      <div className="long_field">
                        <div>
                          <span>Description:</span>{" "}
                          <textarea
                            rows={5}
                            value={element.description}
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "description",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <span>Location: </span>
                          <textarea
                            value={element.location}
                            rows={5}
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "location",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>

                      <div className="short_fields">
                        <div>
                          {element && element.item && element.item.url ? (
                            <div className="resume">
                              <img
                                src={element.item.url}
                                alt="item"
                                // onClick={() => openModal(element.resume.url)}
                              />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    {/* Out Of Content Class */}
                    <div className="button_wrapper">
                      <div className="edit_btn_wrapper">
                        {editingMode === element._id ? (
                          <>
                            <button
                              onClick={() => handleUpdateItem(element._id)}
                              className="check_btn"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => handleDisableEdit()}
                              className="cross_btn"
                            >
                              <RxCross2 />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleEnableEdit(element._id)}
                            className="edit_btn"
                          >
                            Edit
                          </button>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteItem(element._id)}
                        className="delete_btn"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>
              You've not posted any Item or may be you deleted all of your
              Items!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyItems;
