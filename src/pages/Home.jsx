import { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import { API_URL } from "../config";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("${API_URL}/api/posts");
        setPosts(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <div className="loading">Loading posts...</div>;

  return (
    <div className="home-page">
      <h1>Latest Blog Posts</h1>
      <div className="posts-grid">
        {posts.length === 0 ? (
          <p>No posts yet. Be the first to write one! ✍️</p>
        ) : (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        )}
      </div>
    </div>
  );
}

export default Home;
