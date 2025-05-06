import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import './Navbar.css'
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    useEffect(()=>{

        const token = localStorage.getItem("token")

        if(!token){

            navigate("/login")

        }

    })

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    Elite Quill
                </Link>
                <button 
                    className="navbar-toggle" 
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMenuOpen}
                >
                    <span className="navbar-toggle-icon"></span>
                </button>
                <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
                    <li className="navbar-item">
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => 
                                `navbar-link ${isActive ? 'active' : ''}`
                            }
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className="navbar-item">
                        <NavLink 
                            to="/blogs" 
                            className={({ isActive }) => 
                                `navbar-link ${isActive ? 'active' : ''}`
                            }
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Blogs
                        </NavLink>
                    </li>
                    <li className="navbar-item">
                        <NavLink 
                            to="/about" 
                            className={({ isActive }) => 
                                `navbar-link ${isActive ? 'active' : ''}`
                            }
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About
                        </NavLink>
                    </li>
                    <li className="navbar-item">
                        <NavLink 
                            to="/profile" 
                            className={({ isActive }) => 
                                `navbar-link ${isActive ? 'active' : ''}`
                            }
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Profile
                        </NavLink>
                    </li>
                    {/* <li className="navbar-item">
                        <NavLink 
                            to="/login" 
                            className={({ isActive }) => 
                                `navbar-link ${isActive ? 'active' : ''}`
                            }
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Login
                        </NavLink>
                    </li> */}
                    {/* <li className="navbar-item">
                        <NavLink 
                            to="/signup" 
                            className={({ isActive }) => 
                                `navbar-link ${isActive ? 'active' : ''}`
                            }
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Sign Up
                        </NavLink>
                    </li> */}
                
                </ul>
            </div>
        </nav>
    )
}

export default Navbar