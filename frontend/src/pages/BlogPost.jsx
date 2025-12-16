import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

const BlogPost = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPost();
    }, [slug]);

    const fetchPost = async () => {
        try {
            const response = await api.get(`/blog/${slug}`);
            setPost(response.data.post);
        } catch (error) {
            console.error('Error fetching post:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="container section"><div className="spinner"></div></div>;
    if (!post) return <div className="container section"><h2>Post not found</h2></div>;

    return (
        <div className="container" style={{ maxWidth: '800px', padding: 'var(--spacing-3xl) var(--spacing-lg)' }}>
            <span className="badge">{post.category}</span>
            <h1 style={{ margin: 'var(--spacing-md) 0' }}>{post.title}</h1>
            <div style={{ color: 'var(--color-gray-500)', marginBottom: 'var(--spacing-2xl)' }}>
                {new Date(post.publishedAt).toLocaleDateString()} • {post.readTimeMinutes} min read
            </div>
            <div style={{ lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                {post.content}
            </div>
        </div>
    );
};

export default BlogPost;
