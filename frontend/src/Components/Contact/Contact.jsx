import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { FiPhoneCall, FiMail, FiMapPin } from "react-icons/fi";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { FaRegEnvelope } from "react-icons/fa";
import arrowImg from "../../assets/images/icon/arrow.svg";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    contactNumber: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState(""); // "success" or "error"
  const [errors, setErrors] = useState({});

  // Field change handler
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  // Clear status after 4 seconds
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus("");
        setStatusType("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  // Validation function
  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "Name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.firstName)) {
      errors.firstName = "Name can only contain letters and spaces.";
    }

    if (!formData.contactNumber.trim()) {
      errors.contactNumber = "Contact number is required.";
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      errors.contactNumber = "Contact number must be 10 digits.";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      errors.email = "Invalid email address.";
    }

    if (!formData.subject.trim()) {
      errors.subject = "Subject is required.";
    }

    if (!formData.message.trim()) {
      errors.message = "Message cannot be empty.";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message should be at least 10 characters.";
    }

    return errors;
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("Please fix the errors before submitting.");
      setStatusType("error");
      return;
    }

    setErrors({});
    setStatus("Sending...");
    setStatusType("success");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          source: "Contact Form",
          name: formData.firstName || "—",
          email: formData.email || "—",
          contact: formData.contactNumber || "—",
          subject: formData.subject || "—",
          message: formData.message || "—",
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus("Message sent successfully!");
      setStatusType("success");
      setFormData({
        firstName: "",
        contactNumber: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("Failed to send. Please try again.");
      setStatusType("error");
    }
  };

  return (
    <section className="section-area bg-light section-sp1 pt-5">
      <div className="container">
        <div className="row align-items-xl-end">
          {/* Contact Info */}
          <div className="col-lg-6 mb-4">
            <div className="row g-2 pe-xl-3">
              <div className="col-xl-6 col-md-6">
                <div className="featured-bx5">
                  <div className="featured-content">
                    <h5 className="featured-title">Call us</h5>
                    <p>Call us (except Tuesday)</p>
                  </div>
                  <div className="featured-text-icon">
                    <FiPhoneCall className="text-primary me-2" style={{ width: 40, height: 28 }} />
                    <p className="text">+91 76769 73099</p>
                  </div>
                </div>
              </div>

              <div className="col-xl-6 col-md-6">
                <div className="featured-bx5">
                  <div className="featured-content">
                    <h5 className="featured-title">Chat Us</h5>
                    <p>Chat with our team (except Tuesday)</p>
                  </div>
                  <div className="featured-text-icon">
                    <HiOutlineChatBubbleLeftRight className="text-primary me-2" style={{ width: 40, height: 28 }} />
                    <p className="text">+91 76769 73099</p>
                  </div>
                </div>
              </div>

              <div className="col-xl-6 col-md-6">
                <div className="featured-bx5">
                  <div className="featured-content">
                    <h5 className="featured-title">Supports</h5>
                    <p>We’re here to help</p>
                  </div>
                  <div className="featured-text-icon">
                    <FaRegEnvelope className="text-primary" />
                    <p className="text">aasthachits369@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="col-xl-6 col-md-6">
                <div className="featured-bx5">
                  <div className="featured-content">
                    <h5 className="featured-title">Visit us</h5>
                    <p>Visit our office </p>
                  </div>
                  <div className="featured-text-icon">
                    <FiMapPin className="text-primary me-2" />
                    <p className="text">Chandra Layout, Bengaluru, Karnataka 560040</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-6 mb-4">
            <div className="form-card contact-form-card">
              <form className="ajax-form m-auto" onSubmit={handleSubmit}>
                <div className="heading-bx style1">
                  <h2 className="title-head-sm mb-0">Contact our Friendly Team</h2>
                  <p className="text-primary" style={{ fontSize: 16 }}>Let us know how we can help.</p>
                </div>

                <div className="row">
                  {/** First Name **/}
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                        id="firstName"
                        placeholder="Your name..."
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                      {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                    </div>
                  </div>

                  {/** Contact Number **/}
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="contactNumber">Contact Number</label>
                      <input
                        type="tel"
                        className={`form-control ${errors.contactNumber ? "is-invalid" : ""}`}
                        id="contactNumber"
                        placeholder="Contact number..."
                        value={formData.contactNumber}
                        onChange={handleChange}
                      />
                      {errors.contactNumber && <div className="invalid-feedback">{errors.contactNumber}</div>}
                    </div>
                  </div>

                  {/** Email **/}
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        id="email"
                        placeholder="Email address..."
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                  </div>

                  {/** Subject **/}
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="subject">Subject</label>
                      <input
                        type="text"
                        className={`form-control ${errors.subject ? "is-invalid" : ""}`}
                        id="subject"
                        placeholder="Type here..."
                        value={formData.subject}
                        onChange={handleChange}
                      />
                      {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                    </div>
                  </div>

                  {/** Message **/}
                  <div className="col-12">
                    <div className="form-group advance-input">
                      <label htmlFor="message">Message</label>
                      <textarea
                        rows="4"
                        className={`form-control ${errors.message ? "is-invalid" : ""}`}
                        id="message"
                        placeholder="Leave us a message..."
                        value={formData.message}
                        onChange={handleChange}
                      />
                      {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                    </div>
                  </div>

                  <div className="col-12">
                    <button type="submit" className="btn btn-primary btn-lg btn-standard">
                      Submit Now
                      <span className="btn-icon bg-secondary-500">
                        <img src={arrowImg} alt="arrow" />
                      </span>
                    </button>
                  </div>
                </div>

                {status && (
                  <div className="ajax-message mt-3">
                    <p className={statusType === "success" ? "message-success" : "message-error"}>
                      {status}
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
