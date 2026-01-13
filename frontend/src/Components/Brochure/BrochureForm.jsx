import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser"; // install via npm
import './BrochureForm.css';

const API_URL = import.meta.env.VITE_API_URL;

const BrochureForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', contact: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format.';
    if (!/^\d{10}$/.test(formData.contact)) newErrors.contact = 'Contact must be 10 digits.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    try {
   await emailjs.send(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  {
    source: "Brochure Request",
    name: formData.name,
    email: formData.email,
    contact: formData.contact || "—",
    phone: "—",
  },
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY
);

// 🚀 Trigger brochure download
window.open(`${API_URL}/api/send-brochure`, "_blank");

setShowSuccess(true);
setFormData({ name: '', email: '', contact: '' });
onClose();


window.open(`${API_URL}/api/send-brochure`, "_blank");


      setShowSuccess(true);
      setFormData({ name: '', email: '', contact: '' });
      onClose();
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="brochure-overlay">
      <div className="brochure-modal">
        <button className="brochure-close" onClick={onClose}>&times;</button>
        <h2 className="brochure-title">Request Brochure</h2>
        <form onSubmit={handleSubmit} noValidate>
          <input
            className="brochure-input"
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="brochure-error">{errors.name}</p>}

          <input
            className="brochure-input"
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="brochure-error">{errors.email}</p>}

          <input
            className="brochure-input"
            type="tel"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
          />
          {errors.contact && <p className="brochure-error">{errors.contact}</p>}

          <div className="brochure-buttons">
            <button type="submit" className="brochure-submit" disabled={submitting}>
              {submitting ? "Sending..." : "Submit & Download"}
            </button>
          </div>
        </form>
        {showSuccess && <p className="brochure-success">Brochure sent successfully!</p>}
      </div>
    </div>
  );
};

export default BrochureForm;
