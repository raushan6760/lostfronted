import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How This Works</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p>Create Account</p>
              <p>
              Initially, you have to create an account to get
started.
              </p>
            </div>
            <div className="card">
              <MdFindInPage />
              <p>Find an Item/Post an Item</p>
              <p>
              List your item on the wall by filling certain
details and image. That's it !
              </p>
            </div>
            <div className="card">
              <IoMdSend />
              <p>Get Notified / Contact</p>
              <p>
              After an item is posted, we notify our registered users about it, and upon approval, you can obtain the contact information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;