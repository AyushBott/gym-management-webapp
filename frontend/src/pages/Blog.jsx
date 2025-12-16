import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await api.get('/blog');
            setPosts(response.data.posts);
        } catch (error) {
            console.error('Error fetching blog posts:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="container section"><div className="spinner"></div></div>;

    return (
        <div className="container section">
            <h1>Health & Wellness Blog</h1>
            <p>Expert tips, workout guides, and wellness advice</p>

            <div className="grid grid-3" style={{ marginTop: 'var(--spacing-2xl)' }}>
                {posts.map(post => (
                    <Link to={`/blog/${post.slug}`} key={post.id} className="card">
                        <div style={{ height: '180px', background: 'var(--gradient-secondary)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--spacing-md)' }}></div>
                        <span className="badge">{post.category}</span>
                        <h3 style={{ margin: 'var(--spacing-md) 0' }}>{post.title}</h3>
                        <p>{post.excerpt}</p>
                        <div style={{ marginTop: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-500)' }}>
                            {post.readTimeMinutes} min read • {new Date(post.publishedAt).toLocaleDateString()}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Blog;
