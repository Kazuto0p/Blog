import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BlogHome = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3010/api/loadblog', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                console.log(response.data.data[0].image);
                
                setPosts(response.data.data); // Ensure your backend sends { data: [...] }
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError('Failed to fetch posts');
            }
        };
        fetchPosts();
    }, []);

    return (
        <div>
            <style>
                {`
                    body {
                        margin: 0;
                        font-family: Arial, sans-serif;
                        background-color:#01467B;
                    }
                    .hero {

                        background-size: cover;
                        background-position: center;
                        height: 400px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        text-align: center;
                        color: white;
                    }
                    .hero h1 {
                        font-size: 48px;
                        margin: 0;
                        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                    }
                    .blog-posts {
                        max-width: 1200px;
                        margin: 40px auto;
                        padding: 0 20px;
                    }
                    .post {
                        background-color: white;
                        border-radius: 8px;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                        margin-bottom: 20px;
                        padding: 20px;
                        display: flex;
                        gap: 20px;
                        align-items: flex-start;
                    }
                    .post img {
                        width: 200px;
                        height: 150px;
                        object-fit: cover;
                        border-radius: 8px;
                    }
                    .post h3 {
                        margin: 0 0 10px;
                        font-size: 24px;
                    }
                    .post p {
                        margin: 0 0 10px;
                        color: #555;
                    }
                    .post a {
                        color: #007bff;
                        text-decoration: none;
                        font-weight: bold;
                    }
                    .post a:hover {
                        text-decoration: underline;
                    }
                    .footer {
                        background-color: #333;
                        color: white;
                        text-align: center;
                        padding: 20px 0;
                        margin-top: 40px;
                    }
                `}
            </style>

            <div className="hero">
                <h1>Welcome to Elite Quill Blogs</h1>
            </div>

            <div className="blog-posts">
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {posts.length === 0 && !error && <p>Loading posts...</p>}
                {posts.map((post, index) => (
                    <div className="post" key={index}>
                        {post.image && (
                            <img
                            src={`http://localhost:3010${post.image}`}  // This is critical
                            alt={post.title}
                          
                          />
                          
                        )}
                        <div>
                            <h3>{post.title}</h3>
                            <p>{post.excerpt}</p>
                            <p>By: {post.username || 'Unknown Author'}</p>
                            {post.link && <a href={post.link}>Read More</a>}
                        </div>
                    </div>
                ))}
            </div>

            <footer className="footer">
                <p>© 2025 My Blog. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default BlogHome;
