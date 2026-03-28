import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaPaperPlane,
  FaUser,
  FaRegSmile
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/api/contact", formData);
      setStatus("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => setStatus(""), 5000);
    } catch (err) {
      setStatus("Error sending message");
      setTimeout(() => setStatus(""), 5000);
    }

    setLoading(false);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const contactInfo = [
    { icon: FaEnvelope, text: "ss.sauravsatyam27@gmail.com", color: "text-blue-600", bgColor: "bg-blue-100", href: "mailto:ss.sauravsatyam27@gmail.com" },
    { icon: FaMapMarkerAlt, text: "Uttar Pradesh, India", color: "text-red-500", bgColor: "bg-red-100" },
    { icon: FaWhatsapp, text: "Chat on WhatsApp", color: "text-green-500", bgColor: "bg-green-100", href: "https://wa.me/917903619525" }
  ];

  return (
    <div className="relative py-20 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container relative px-6 mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-16"
        >
          <h1 className="relative inline-block mb-4 text-6xl font-bold text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text">
            Get In Touch
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
            />
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-gray-600"
          >
            Let's discuss your next project!
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-10 lg:grid-cols-2"
        >

          {/* LEFT SIDE - Profile & Info */}
          <motion.div variants={itemVariants} className="space-y-8">
            
            {/* Profile Card */}
            <motion.div 
              whileHover={{ y: -5, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.2)" }}
              className="overflow-hidden bg-white shadow-xl rounded-2xl backdrop-blur-sm bg-opacity-90"
            >
              <div className="relative h-32 bg-gradient-to-r from-indigo-500 to-purple-600">
                <div className="absolute inset-0 bg-black opacity-10"></div>
              </div>
              
              <div className="relative px-6 pb-6 -mt-16 text-center">
                <motion.img
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  src="/profile.jpg"
                  alt="Saurav Satyam"
                  className="w-32 h-32 mx-auto border-4 border-white rounded-full shadow-xl object-cover"
                />
                
                <motion.h2 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="mt-4 text-3xl font-bold text-gray-800"
                >
                  Saurav Satyam
                </motion.h2>
                
                <div className="inline-flex items-center gap-2 px-4 py-1 mt-2 bg-indigo-100 rounded-full">
                  <FaRegSmile className="text-indigo-600" />
                  <p className="text-indigo-600">MERN Stack Developer</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Info Cards */}
            <div className="grid gap-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className={`flex items-center gap-4 p-4 bg-white shadow-lg rounded-xl backdrop-blur-sm bg-opacity-90 transition-all duration-300 hover:shadow-xl`}
                >
                  <div className={`p-3 ${info.bgColor} rounded-xl`}>
                    <info.icon className={`text-xl ${info.color}`} />
                  </div>
                  
                  {info.href ? (
                    <a
                      href={info.href}
                      target={info.href.startsWith('http') ? "_blank" : "_self"}
                      rel="noreferrer"
                      className="text-lg text-gray-700 transition-colors hover:text-indigo-600"
                    >
                      {info.text}
                    </a>
                  ) : (
                    <span className="text-lg text-gray-700">{info.text}</span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 p-4 bg-white shadow-lg rounded-xl">
              <span className="text-gray-600">Connect with me:</span>
              <div className="flex gap-3">
                {[
                  { icon: FaGithub, href: "https://github.com/sauravsatyam27", color: "hover:text-gray-900" },
                  { icon: FaLinkedin, href: "https://www.linkedin.com/in/sauravsatyam27/", color: "hover:text-blue-700" },
                  { icon: FaWhatsapp, href: "https://wa.me/917903619525", color: "hover:text-green-600" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 text-2xl text-gray-600 transition-all ${social.color} bg-gray-100 rounded-xl hover:shadow-md`}
                  >
                    <social.icon />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Google Map */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="overflow-hidden shadow-xl rounded-xl"
            >
              <iframe
                title="map"
                src="https://maps.google.com/maps?q=Uttar%20Pradesh%20India&t=&z=6&ie=UTF8&iwloc=&output=embed"
                className="w-full h-64 transition-transform duration-300 rounded-xl hover:scale-105"
                loading="lazy"
              ></iframe>
            </motion.div>
          </motion.div>

          {/* CONTACT FORM */}
          <motion.div variants={itemVariants}>
            <form
              onSubmit={handleSubmit}
              className="p-8 space-y-6 bg-white shadow-2xl rounded-2xl backdrop-blur-sm bg-opacity-90"
            >
              <h3 className="mb-6 text-2xl font-semibold text-center text-gray-800">
                Send Me a Message
              </h3>

              {/* Form Fields */}
              {[
                { name: "name", type: "text", placeholder: "Your Name", icon: FaUser },
                { name: "email", type: "email", placeholder: "Your Email", icon: FaEnvelope },
                { name: "subject", type: "text", placeholder: "Subject", icon: FaPaperPlane }
              ].map((field) => (
                <motion.div
                  key={field.name}
                  className="relative"
                  whileTap={{ scale: 0.995 }}
                >
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <field.icon />
                  </div>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    required
                    value={formData[field.name]}
                    onChange={handleChange}
                    onFocus={() => setFocusedField(field.name)}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full py-4 pl-12 pr-4 text-gray-700 bg-gray-50 border-2 rounded-xl outline-none transition-all duration-300
                      ${focusedField === field.name 
                        ? 'border-indigo-500 bg-white shadow-lg' 
                        : 'border-gray-200 hover:border-gray-300'
                      }`}
                  />
                </motion.div>
              ))}

              {/* Message Field */}
              <motion.div
                className="relative"
                whileTap={{ scale: 0.995 }}
              >
                <textarea
                  name="message"
                  placeholder="Your message..."
                  rows="5"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full p-4 text-gray-700 bg-gray-50 border-2 rounded-xl outline-none transition-all duration-300 resize-none
                    ${focusedField === "message" 
                      ? 'border-indigo-500 bg-white shadow-lg' 
                      : 'border-gray-200 hover:border-gray-300'
                    }`}
                ></textarea>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-full py-4 overflow-hidden text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl group"
              >
                <span className="absolute inset-0 transition-opacity duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100"></span>
                <span className="relative flex items-center justify-center gap-2 text-lg font-semibold">
                  {loading ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      <span>Send Message</span>
                    </>
                  )}
                </span>
              </motion.button>

              {/* Status Message */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: status ? 1 : 0, y: status ? 0 : -10 }}
                className={`text-center p-3 rounded-xl ${
                  status.includes("success") 
                    ? 'bg-green-100 text-green-700' 
                    : status.includes("Error") 
                    ? 'bg-red-100 text-red-700'
                    : ''
                }`}
              >
                {status && (
                  <span className="flex items-center justify-center gap-2">
                    {status.includes("success") ? "✓" : "⚠"} {status}
                  </span>
                )}
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </div>

      {/* Add custom animations to your global CSS */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Contact;