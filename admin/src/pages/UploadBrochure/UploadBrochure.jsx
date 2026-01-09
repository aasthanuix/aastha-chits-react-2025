import React, { useState } from "react";
import "./UploadBrochure.css";

const API_URL = import.meta.env.VITE_API_URL;

const UploadBrochure = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState(""); 

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
    setSuccess("");
    setUploadedUrl("");
  };

  const handleUpload = async () => {
  if (!file) return setError("Please select a PDF brochure");

  const formData = new FormData();
  formData.append("brochure", file);

  try {
    setUploading(true);

    const res = await fetch(`${API_URL}/api/admin/upload-brochure`, {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    if (data.brochure?.fileUrl) {
      setSuccess("Brochure uploaded successfully!");
      setUploadedUrl(data.brochure.fileUrl);
      setFile(null);
    } else {
      setError("Upload failed. Try again.");
      console.error(data);
    }
  } catch (err) {
    console.error(err);
    setError("Something went wrong");
  } finally {
    setUploading(false);
  }
};

  return (
    <div className="upload-wrapper">
      <div className="upload-card">
        <h2>Upload Brochure</h2>
        <p className="subtitle">
          Update the official brochure. This will be used across the website and emails.
        </p>

        <div
  className="upload-box"
  onClick={() => document.getElementById("brochureInput").click()}
>
  <span className="upload-placeholder-icon">📁</span>
  <p>{file ? file.name : "Click to select PDF brochure"}</p>
  <input
    id="brochureInput"
    type="file"
    accept="application/pdf"
    onChange={handleFileChange}
  />
</div>

        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}

        {/* {uploadedUrl && (
          <p>
            View uploaded brochure:{" "}
            <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">
              {uploadedUrl}
            </a>
          </p>
        )} */}

        <button
          className="upload-btn"
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Brochure"}
        </button>
      </div>
    </div>
  );
};

export default UploadBrochure;
