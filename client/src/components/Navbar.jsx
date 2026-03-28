import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBars, 
  FaTimes, 
  FaSignOutAlt, 
  FaSignInAlt,
  FaHome,
  FaCode,
  FaFileAlt,
  FaEnvelope,
  FaCog,
  FaUserCircle
} from 'react-icons/fa';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: FaHome },
    { name: 'Projects', path: '/projects', icon: FaCode },
    { name: 'Resume', path: '/resume.pdf', icon: FaFileAlt, external: true },
    { name: 'Contact', path: '/contact', icon: FaEnvelope },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/80 backdrop-blur-md shadow-lg' 
            : 'bg-white/60 backdrop-blur-sm'
        }`}
      >
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="relative group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <span className="text-3xl font-bold text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text">
                  Portfolio
                </span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full origin-left"
                />
              </motion.div>
            </Link>

            {/* Desktop Menu */}
            <div className="items-center hidden space-x-1 md:flex">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeLink === link.path;
                
                return link.external ? (
                  <a
                    key={link.name}
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group"
                  >
                    <motion.div
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50/50"
                    >
                      <Icon className="text-lg text-gray-500 transition-transform group-hover:rotate-12" />
                      <span className="font-medium">{link.name}</span>
                    </motion.div>
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="relative group"
                  >
                    <motion.div
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                        isActive
                          ? 'text-indigo-600 bg-indigo-50'
                          : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50/50'
                      }`}
                    >
                      <Icon
                        className={`text-lg transition-transform group-hover:rotate-12 ${
                          isActive ? 'text-indigo-600' : 'text-gray-500'
                        }`}
                      />
                      <span className="font-medium">{link.name}</span>
                      
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              })}

              {/* User Menu */}
              <div className="ml-4 pl-4 border-l border-gray-200">
                {user ? (
                  <div className="flex items-center gap-3">
                    {/* Admin Link */}
                    {user.role === 'admin' && (
                      <Link to="/admin">
                        <motion.div
                          whileHover={{ scale: 1.05, rotate: 90 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 text-gray-600 transition-all rounded-lg hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          <FaCog className="text-xl" />
                        </motion.div>
                      </Link>
                    )}

                    {/* User Profile */}
                    <div className="relative group">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                      >
                        <FaUserCircle className="text-xl" />
                        <span className="font-medium">{user.name || 'User'}</span>
                      </motion.button>

                      {/* Dropdown Menu */}
                      <div className="absolute right-0 invisible w-48 mt-2 overflow-hidden transition-all opacity-0 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
                        <div className="bg-white rounded-lg shadow-xl">
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full gap-2 px-4 py-3 text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600"
                          >
                            <FaSignOutAlt />
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link to="/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-6 py-2 text-white transition-all bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg"
                    >
                      <FaSignInAlt />
                      <span>Login</span>
                    </motion.button>
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-50 p-2 text-gray-600 transition-colors rounded-lg md:hidden hover:bg-indigo-50 hover:text-indigo-600"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaTimes className="text-2xl" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaBars className="text-2xl" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="overflow-hidden md:hidden"
            >
              <div className="px-4 py-4 space-y-2 bg-white/90 backdrop-blur-md border-t border-gray-100">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = activeLink === link.path;
                  
                  return (
                    <motion.div key={link.name} variants={itemVariants}>
                      {link.external ? (
                        <a
                          href={link.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                            isActive
                              ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600'
                              : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                          }`}
                        >
                          <Icon className={`text-xl ${
                            isActive ? 'text-indigo-600' : 'text-gray-500'
                          }`} />
                          <span className="font-medium">{link.name}</span>
                          
                          {isActive && (
                            <motion.div
                              layoutId="activeMobileIndicator"
                              className="ml-auto w-2 h-2 bg-indigo-600 rounded-full"
                            />
                          )}
                        </a>
                      ) : (
                        <Link
                          to={link.path}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                            isActive
                              ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600'
                              : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                          }`}
                        >
                          <Icon className={`text-xl ${
                            isActive ? 'text-indigo-600' : 'text-gray-500'
                          }`} />
                          <span className="font-medium">{link.name}</span>
                          
                          {isActive && (
                            <motion.div
                              layoutId="activeMobileIndicator"
                              className="ml-auto w-2 h-2 bg-indigo-600 rounded-full"
                            />
                          )}
                        </Link>
                      )}
                    </motion.div>
                  );
                })}

                {/* Mobile User Section */}
                <motion.div variants={itemVariants} className="pt-4 mt-4 border-t border-gray-200">
                  {user ? (
                    <div className="space-y-3">
                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          <FaCog className="text-xl" />
                          <span className="font-medium">Admin Panel</span>
                        </Link>
                      )}
                      
                      <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                        <FaUserCircle className="text-2xl text-indigo-600" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{user.name || 'User'}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>

                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full gap-3 px-4 py-3 text-red-600 transition-all rounded-lg hover:bg-red-50"
                      >
                        <FaSignOutAlt className="text-xl" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center w-full gap-2 px-4 py-3 text-white transition-all bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700"
                    >
                      <FaSignInAlt />
                      <span className="font-medium">Login</span>
                    </Link>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-20" />
    </>
  );
};

export default Navbar;