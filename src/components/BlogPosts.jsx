import React, { useEffect, useState } from "react";

const API_URL = "https://newsapi.org/v2/top-headlines?category=business&apiKey=YOUR_API_KEY";

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setPosts(data.articles.slice(0, 3)); // Display only the top 3 articles
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="bg-gray-100 py-10 px-5">
      <h1 className="text-5xl font-bold text-center text-purple-900 mb-10">
        Corporate Posts
      </h1>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {posts.map((post, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
            <img
              src={post.urlToImage || "https://via.placeholder.com/300"}
              alt={post.title}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold mt-4">{post.title}</h2>
            <p className="text-sm text-gray-600 mt-1">
              {new Date(post.publishedAt).toDateString()} | <span className="text-purple-700 font-bold">Business</span>
            </p>
            <p className="text-gray-700 mt-3">{post.description}</p>
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 font-semibold mt-2 inline-block"
            >
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPosts;
