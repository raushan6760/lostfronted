import React, { useContext } from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";
import { Context } from "../../main";
const HeroSection = () => {
  const {  user } = useContext(Context);
  return (
    <>
      <div className="heroSection">
        <div className="container">
          <div className="title">
          <h3>Welcome {user.name} !!!</h3>
            <h1>Discover your lost items by logging into my website</h1>
            {/* <h1>your interests and skills</h1> */}
            <p>
              Start by signing up for an account and posting your items.
              Afterward, you can reclaim your items by verifying the person who
              has taken them, by asking them one question related to the item.
            </p>
          </div>
          <div className="image">
            <img src="/lost1.png" alt="hero" />
          </div>
        </div>
        <div className="card mb-3" style={{ maxWidth: "full" }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src="/laptop.webp"
                className="img-fluid rounded-start"
                alt="not load image "
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h3 className="card-title">My Project Inspiration </h3>
                <br />  <br /> <br />
                <p className="card-text">
                  Colleges are the place where we come to home mentioning about
                  losing our new earphone which might have kept in a desk but
                  not sure if it's still there. This problem feels so relatable
                  to most of the college students. A problem will still remain
                  the same until someone builds a solution to it.
                </p>
                
                {/* <p className="card-text">
                  <small className="text-body-secondary">
                    Last updated 3 mins ago
                  </small>
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
