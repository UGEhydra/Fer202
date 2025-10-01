import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedin, FaYoutube, FaGoogle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhone, FaFax } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#e67e22", padding: "20px", color: "black" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        {/* Địa chỉ (trái) */}
        <div style={{ marginLeft: "40px" }}>
          <h3>Our Address</h3>
          <p>Khu đô thị FPT Đà Nẵng</p>
          <p><FaPhone /> +840231111111</p>
          <p><FaFax /> +852 8765 4321</p>
          <p><MdEmail /> fptuni@fpt.edu.vn</p>
        </div>

        {/* Icon mạng xã hội (phải) */}
        <div style={{ display: "flex", gap: "20px", marginRight: "20%", marginTop: "60px" }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "black" }}>
            <FaGoogle size={20} />
          </button>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "black" }}>
            <FaFacebookF size={20} />
          </button>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "black" }}>
            <FaLinkedin size={20} />
          </button>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "black" }}>
            <FaTwitter size={20} />
          </button>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "black" }}>
            <FaYoutube size={20} />
          </button>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "black" }}>
            <MdEmail size={20} />
          </button>
        </div>
      </div>

      {/* Bản quyền */}
      <div style={{ textAlign: "center", marginTop: "15px" }}>
        © Copyright 2023
      </div>
    </footer>
  );
};

export default Footer;
