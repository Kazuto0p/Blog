import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProfilePage.css'


const ProfilePage = () => {
    const [newPost, setNewPost] = useState({
        title: '',
        excerpt: '',
        image: null,
        link: '',
        username: ''
    });
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image' && files && files[0]) {
            setNewPost((prev) => ({ ...prev, image: files[0] }));
        } else {
            setNewPost((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!newPost.title || !newPost.excerpt || !newPost.username) {
            setError('Please fill in title, excerpt, and username');
            return;
        }

        const formData = new FormData();
        formData.append('title', newPost.title);
        formData.append('excerpt', newPost.excerpt);
        if (newPost.image) {
            formData.append('image', newPost.image);
        }
        formData.append('link', newPost.link);
        formData.append('username', newPost.username);
        formData.append('userId', '60d21b4667d0d8992e610c85'); // Placeholder; replace with auth user ID

        try {
            console.log('Sending post data:', Object.fromEntries(formData));
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:3010/api/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Post created:', response.data);
            setNewPost({ title: '', excerpt: '', image: null, link: '', username: '' });
            navigate('/');
        } catch (error) {
            console.error('Error creating post:', error);
            setError(error.response?.data?.message || 'Failed to create post');
        }
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3010/api/loadblog');
                console.log(response);
                setPosts(response.data.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError('Failed to fetch posts');
            }
        };
        fetchPosts();
    }, []);

    return (
        <div className="container">
        
            {/* <h1 className="blog-title">Elite Quill</h1> */}
            <div className="wrapper">
                <form className="add-post-form" onSubmit={handleSubmit}>
                    <h2>Add New Post</h2>
                    {error && <div className="error-message">{error}</div>}
                    <div className="input-group">
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            type="text"
                            placeholder="Post title"
                            name="title"
                            value={newPost.title}
                            onChange={handleInputChange}
                            required
                            style={{color:'black'}}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="excerpt">Excerpt</label>
                        <textarea
                            id="excerpt"
                            name="excerpt"
                            placeholder="Post excerpt"
                            value={newPost.excerpt}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="image">Image</label>
                        <input
                            id="image"
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="link">Link (optional)</label>
                        <input
                            id="link"
                            type="text"
                            name="link"
                            placeholder="Post link"
                            value={newPost.link}
                            onChange={handleInputChange}
                            style={{color:'black'}}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            placeholder="Your username"
                            value={newPost.username}
                            onChange={handleInputChange}
                            required

                            style={{color:'black'}}
                        />
                    </div>
                    <button type="submit">Add Post</button>
                </form>
            </div>
            <div className="posts-list">
                <h2>My Posts</h2>
                {posts.length === 0 ? (
                    <p>No posts yet. Add one above!</p>
                ) : (
                    posts.map((post, index) => (
                        <div className="post" key={index}>
                            {post.image && (
                                 <img
                                 src={`http://localhost:3010${post.image}`}  // This is critical
                                 alt={post.title}
                                 
                               />
                            )}
                            <h3>{post.title}</h3>
                            <p>{post.excerpt}</p>
                            <p>By: {post.username}</p>
                            {post.link && <a href={post.link}>Read More</a>}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProfilePage;