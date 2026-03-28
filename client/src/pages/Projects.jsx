import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import ProjectCard from '../components/ProjectCard';
import { 
  FaGithub, 
  FaCode, 
  FaFilter, 
  FaTimes,
  FaSearch,
  FaRocket,
  FaStar,
  FaCodeBranch 
} from 'react-icons/fa';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    languages: {},
    topLanguages: []
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://api.github.com/users/sauravsatyam27/repos");
      
      // Remove forked repos and sort by updated date
      const projectsData = res.data
        .filter(repo => !repo.fork)
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

      // Process language stats
      const languageStats = {};
      projectsData.forEach(repo => {
        if (repo.language) {
          languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
        }
      });

      const topLangs = Object.entries(languageStats)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([lang]) => lang);

      setProjects(projectsData);
      setStats({
        total: projectsData.length,
        languages: languageStats,
        topLanguages: topLangs
      });
      setError(null);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects. Please try again later.');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter and search projects
  const getFilteredProjects = () => {
    let filtered = [...projects];

    // Apply category filter
    if (filter !== 'all') {
      filtered = filtered.filter(project => 
        project.language?.toLowerCase() === filter.toLowerCase()
      );
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(query) ||
        (project.description && project.description.toLowerCase().includes(query)) ||
        (project.language && project.language.toLowerCase().includes(query))
      );
    }

    return filtered;
  };

  const filteredProjects = getFilteredProjects();
  const languages = ['all', ...stats.topLanguages];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <div className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container relative px-4 mx-auto">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-16"
        >
          {/* <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block p-3 mb-6 bg-indigo-500 bg-opacity-20 rounded-2xl backdrop-blur-sm"
          >
            <FaCode className="text-4xl text-indigo-300" />
          </motion.div> */}

          <h1 className="relative inline-block mb-6 text-5xl md:text-6xl font-bold">
            <span className="text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text">
              My Projects
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-2xl mx-auto text-xl text-gray-300"
          >
            Exploring the intersection of creativity and technology through innovative web solutions
          </motion.p>

          {/* Stats Counter */}
          {!loading && !error && projects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-8 mt-10"
            >
              <div className="flex items-center gap-3 px-6 py-3 bg-white bg-opacity-10 rounded-2xl backdrop-blur-sm">
                <FaRocket className="text-2xl text-indigo-400" />
                <div>
                  <p className="text-sm text-gray-400">Total Projects</p>
                  <p className="text-2xl font-bold text-white">{stats.total}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 bg-white bg-opacity-10 rounded-2xl backdrop-blur-sm">
                <FaCodeBranch className="text-2xl text-purple-400" />
                <div>
                  <p className="text-sm text-gray-400">Technologies</p>
                  <p className="text-2xl font-bold text-white">{Object.keys(stats.languages).length}</p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Search and Filter Bar */}
        {!loading && !error && projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-12"
          >
            <div className="flex flex-col gap-4 p-4 bg-white bg-opacity-5 rounded-2xl backdrop-blur-md border border-white/10 lg:flex-row lg:items-center lg:justify-between">
              
              {/* Search Input */}
              <div className="relative flex-1">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects by name, description, or technology..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-3 pl-12 pr-4 text-white placeholder-gray-400 bg-white bg-opacity-10 border border-white/20 rounded-xl focus:outline-none focus:border-indigo-400 focus:bg-opacity-20 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>

              {/* Filter Toggle Button (Mobile) */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center gap-2 px-6 py-3 text-white transition-all bg-indigo-600 rounded-xl lg:hidden hover:bg-indigo-700"
              >
                <FaFilter />
                <span>Filters</span>
              </button>

              {/* Filter Buttons */}
              <div className={`${showFilters ? 'flex' : 'hidden'} lg:flex flex-wrap gap-2`}>
                {languages.map((lang) => (
                  <motion.button
                    key={lang}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilter(lang)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      filter === lang
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                        : 'bg-white bg-opacity-10 text-gray-300 hover:bg-opacity-20 border border-white/10'
                    }`}
                  >
                    {lang === 'all' ? 'All Projects' : lang}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Active Filters Display */}
            {(filter !== 'all' || searchQuery) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap items-center gap-2 mt-4"
              >
                <span className="text-sm text-gray-400">Active filters:</span>
                {filter !== 'all' && (
                  <span className="flex items-center gap-1 px-3 py-1 text-sm text-indigo-300 bg-indigo-500 bg-opacity-20 rounded-full">
                    Language: {filter}
                    <button onClick={() => setFilter('all')} className="ml-1 hover:text-white">
                      <FaTimes size={12} />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="flex items-center gap-1 px-3 py-1 text-sm text-purple-300 bg-purple-500 bg-opacity-20 rounded-full">
                    Search: "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} className="ml-1 hover:text-white">
                      <FaTimes size={12} />
                    </button>
                  </span>
                )}
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-indigo-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <p className="mt-6 text-lg text-gray-300">Fetching awesome projects...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center"
          >
            <div className="p-8 bg-red-500 bg-opacity-10 rounded-2xl backdrop-blur-sm border border-red-500/20">
              <FaCode className="mx-auto mb-4 text-5xl text-red-400" />
              <p className="mb-4 text-red-300">{error}</p>
              <button 
                onClick={fetchProjects}
                className="px-6 py-3 text-white transition-all bg-red-600 rounded-lg hover:bg-red-700 hover:shadow-lg"
              >
                Try Again
              </button>
            </div>
          </motion.div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <AnimatePresence mode="wait">
            {filteredProjects.length > 0 ? (
              <motion.div
                key="projects-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    variants={itemVariants}
                    custom={index}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="py-20 text-center"
              >
                <div className="inline-block p-8 bg-white bg-opacity-5 rounded-2xl backdrop-blur-sm border border-white/10">
                  <FaSearch className="mx-auto mb-4 text-5xl text-gray-500" />
                  <p className="mb-2 text-xl text-white">No projects found</p>
                  <p className="text-gray-400">
                    {projects.length === 0 
                      ? 'No projects available at the moment.' 
                      : 'Try adjusting your search or filter criteria.'}
                  </p>
                  {(filter !== 'all' || searchQuery) && (
                    <button
                      onClick={() => {
                        setFilter('all');
                        setSearchQuery('');
                      }}
                      className="px-6 py-2 mt-6 text-indigo-300 transition-all border border-indigo-500 rounded-lg hover:bg-indigo-500 hover:text-white"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* GitHub Link */}
        {!loading && !error && projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 text-center"
          >
            <a
              href="https://github.com/sauravsatyam27"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 text-white transition-all bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-700 hover:to-purple-700 hover:shadow-2xl group"
            >
              <FaGithub className="text-2xl transition-transform group-hover:rotate-12" />
              <span className="text-lg font-semibold">View All on GitHub</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </a>
          </motion.div>
        )}
      </div>

      {/* Custom Animations */}
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
        .bg-grid-pattern {
          background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </div>
  );
};

export default Projects;