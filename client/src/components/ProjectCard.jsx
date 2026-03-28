import React from "react";
import { FaGithub, FaExternalLinkAlt, FaStar } from "react-icons/fa";

const ProjectCard = ({ project }) => {
  if (!project) return null;

  // Fields returned by GitHub API
  const {
    name,
    description,
    html_url,
    homepage,
    language,
    stargazers_count,
    updated_at,
  } = project;

  return (
    <div className="card group bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      {/* Project Name */}
      <h3 className="text-xl font-bold mb-2 text-gray-800">{name}</h3>

      {/* Description */}
      <p className="text-gray-600 mb-4 line-clamp-2">
        {description || "No description available"}
      </p>

      {/* Tech / Language + Stars */}
      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
        {language && (
          <span className="bg-gray-100 px-2 py-1 rounded">{language}</span>
        )}

        <span className="flex items-center gap-1">
          <FaStar className="text-yellow-500" />
          {stargazers_count}
        </span>

        {updated_at && (
          <span>
            Updated: {new Date(updated_at).toLocaleDateString()}
          </span>
        )}
      </div>

      {/* Links */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-3">
          {/* GitHub Repo */}
          <a
            href={html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-primary-600 transition-colors"
          >
            <FaGithub size={20} />
          </a>

          {/* Live Demo (if exists in repo settings) */}
          {homepage && (
            <a
              href={homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              <FaExternalLinkAlt size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;