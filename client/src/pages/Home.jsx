import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeaturedProjects();
  }, []);

  const fetchFeaturedProjects = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "https://api.github.com/users/sauravsatyam27/repos"
      );

      const projectsData = res.data.filter((repo) => !repo.fork).slice(0, 6);

      setFeaturedProjects(projectsData);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load projects");
      setFeaturedProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const skills = [
    "React",
    "Node.js",
    "MongoDB",
    "Express",
    "JavaScript",
    "TypeScript",
    "Tailwind CSS",
    "GraphQL",
    "MySQL",
    "C++",
  ];

  return (
    <div>

      {/* HERO */}
      <section className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold mb-6"
          >
            Hi, I'm <span className="text-yellow-300">Saurav Satyam</span>
          </motion.h1>

          <p className="text-xl md:text-2xl mb-6 opacity-90">
            Full Stack Developer • MERN Stack • Problem Solver
          </p>

          <p className="max-w-2xl mx-auto mb-10 text-lg opacity-80">
            I build scalable web applications and beautiful user interfaces
            using modern technologies.
          </p>

          <div className="flex justify-center gap-5">
            <Link
              to="/projects"
              className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              View Projects
            </Link>

            <Link
              to="/contact"
              className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-700 transition"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-14">
            Featured Projects
          </h2>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
            </div>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/projects"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-14">
            Skills & Technologies
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {skills.map((skill) => (
              <motion.div
                key={skill}
                whileHover={{ scale: 1.1 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-5 text-center shadow-lg"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">About Me</h2>

          <p className="text-lg text-gray-700 mb-10">
            I'm a passionate developer who enjoys building modern web
            applications and solving real world problems using technology.
            I love working with the MERN stack and continuously improving
            my coding skills.
          </p>

          <div className="flex justify-center gap-8 text-3xl">
            <a
              href="https://github.com/sauravsatyam27"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-700"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/sauravsatyam27/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://x.com/sauravsatyam27"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaTwitter />
            </a>

            <a
              href="mailto:ss.sauravsatyam27@gmail.com"
              className="hover:text-red-500"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white text-center">
        <h2 className="text-4xl font-bold mb-6">
          Let's Build Something Amazing
        </h2>

        <p className="mb-8 text-lg opacity-90">
          Have an idea or project? Let's work together.
        </p>

        <Link
          to="/contact"
          className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Get In Touch
        </Link>
      </section>

    </div>
  );
};

export default Home;