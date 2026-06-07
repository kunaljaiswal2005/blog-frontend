import { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔴 यह line add करो सबसे पहले!
  const API_URL =
    import.meta.env.VITE_API_URL || "https://blog-backend-f56m.onrender.com";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // 🔴 यहाँ API_URL use करो!
        const res = await axios.get(`${API_URL}/api/posts`);
        setPosts(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err.message);
        setPosts([]);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <div className="loading">✨ Loading stories...</div>;
  if (error) return <div className="loading">❌ Error: {error}</div>;

  return (
    <div className="container">
      <div className="home-page">
        <h1>Discover Stories</h1>
        <p>Explore inspiring articles and creative thoughts</p>
        <div className="posts-grid">
          {posts.length === 0 ? (
            <p
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "3rem",
                color: "#999",
              }}
            >
              📝 No stories yet. Be the first to write one!
            </p>
          ) : (
            posts.map((post) => <PostCard key={post._id} post={post} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
