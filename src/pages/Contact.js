import React from "react";
import WomanImg from "../img/contact/woman.png";
import { motion } from "framer-motion";
import { transition1 } from "../transitions";
import { useContext } from "react";
import { CursorContext } from "../context/CursorContext";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { Alert } from "@mui/material";

const Contact = () => {
  const form = useRef();
  const [successPopup, setSuccessPopup] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_hsabpgz", "template_f2repdk", form.current, {
        publicKey: "1E947Y6KRpTfWvsmv",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          setSuccessPopup(true);
          var frm = document.getElementsByName("contact-form")[0];
          frm.reset();
          setTimeout(() => setSuccessPopup(false), 3000);
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext);
  return (
    <motion.section
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={transition1}
      className="section"
    >
      <div className="container mx-auto h-full">
        <div className="flex flex-col lg:flex-row h-full items-center justify-start pt-36 gap-x-8 text-center lg:text-left">
          {/* bg */}
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={transition1}
            className="hidden lg:flex bg-[#eef7f9] absolute bottom-0 left-0 right-0 top-72 -z-10"
          ></motion.div>
          {/* text & form */}
          <div
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            className="lg:flex-1 lg:pt-32 px-4"
          >
            <h1 className="h1">Contact me</h1>
            <p className="mb-12">I would love to get suggestions from you.</p>
            <form
              name="contact-form"
              className="flex flex-col gap-y-4"
              ref={form}
              onSubmit={sendEmail}
            >
              <div className="flex gap-x-10">
                <input
                  required
                  name="user_name"
                  className="outline-none border-b border-b-primary h-[60px] bg-transparent font-secondary w-full pl-3 placeholder:text=[#757879]"
                  placeholder="Your name"
                  type="text"
                />
                <input
                  required
                  name="user_email"
                  className="outline-none border-b border-b-primary h-[60px] bg-transparent font-secondary w-full pl-3 placeholder:text=[#757879]"
                  placeholder="Your email address"
                  type="email"
                />
              </div>
              <input
                required
                name="message"
                className="outline-none border-b border-b-primary h-[60px] bg-transparent font-secondary w-full pl-3 placeholder:text=[#757879]"
                placeholder="Your message"
                type="text"
              />
              <input
                type="submit"
                value="Send it"
                className="btn mb-[30px] mx-auto lg:mx-0 self-start cursor-pointer"
              />
            </form>
          </div>
          {/* image */}
          <motion.div
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ transition: transition1, duration: 1.5 }}
            className="lg:flex-1"
          >
            <img src={WomanImg} alt="4 womens in grid layout" />
          </motion.div>
        </div>
      </div>
      {successPopup && (
        <div
          className={`flex justify-center items-center mx-auto absolute top-[10%] transition-transform duration-500 ${
            successPopup ? "left-1/2 -translate-x-1/2" : "-left-full"
          }`}
        >
          <Alert severity="info" variant="filled" className="w-96">
            Email sent successfully!
          </Alert>
        </div>
      )}
    </motion.section>
  );
};

export default Contact;
