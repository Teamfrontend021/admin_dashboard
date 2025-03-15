import React, { useEffect, useState } from "react";
import "./BlogPosts.css";

const API_URL =
  "https://newsapi.org/v2/top-headlines?category=business&apiKey=6e385cc964a9492d8f2f67e479c475a7";

const BlogPosts = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPosts(data.articles.slice(0, 6)); // Fetching top 6 articles
      } catch (error) {
        setError(`Error fetching news: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div className="loading-text">Loading...</div>;
  }

  if (error) {
    return <div className="error-text">{error}</div>;
  }

  return (
    <div className="blog-posts-container">
      <h1 className="blog-posts-title">Corporate Posts</h1>
      <div className="blog-posts-grid">
        {posts.map((post, index) => (
          <div key={index} className="blog-post-card">
            <img
              src={post.urlToImage || "https://via.placeholder.com/200"}
              alt={post.title}
              className="blog-post-image"
            />
            <h2 className="blog-post-title">{post.title}</h2>
            <p className="blog-post-date">
              {new Date(post.publishedAt).toDateString()} |{" "}
              <span className="category-text">Business</span>
            </p>
            <p className="blog-post-description">
              {post.description
                ? post.description.length > 100
                  ? post.description.substring(0, 100) + "..."
                  : post.description
                : "No description available."}
            </p>
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="blog-post-link"
            >
              Read more →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPosts;
