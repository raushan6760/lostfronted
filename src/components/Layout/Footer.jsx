import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By Raushan.</div>
      <div>
        <Link to={"https://www.facebook.com"} target="_blank">
          <FaFacebookF />
        </Link>
        <Link to={"https://www.youtube.com"} target="_blank">
          <FaYoutube />
        </Link>
        <Link to={"https://www.instagram.com/raushangupta676?igsh=YzVwNTQwbHc4OWxh"} target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={"https://www.linkedin.com/in/raushan-kumar-781a9421a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"} target="_blank">
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;