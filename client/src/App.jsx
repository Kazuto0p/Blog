import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./Components/Nav/Navbar";
import Login from "./Components/Login/Login";
import Signup from "./Components/Login/Signup";
import BlogHome from "./Pages/Home";
import ProfilePage from "./Pages/profile/ProfilePage";

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Navbar />
                
                <div className="content">
                    <Routes>
                        <Route path="/" element={<BlogHome/>} />
                        <Route path="/blogs" element={<div>Blogs Page (To be implemented)</div>} />
                        <Route path="/about" element={<div>About Page (To be implemented)</div>} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/forgot-password" element={<div>Forgot Password Page (To be implemented)</div>} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;