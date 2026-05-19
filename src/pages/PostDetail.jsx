import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { API_URL } from "../config";

function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/posts/${slug}`);
        setPost(res.data);
        fetchComments(res.data._id);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  const fetchComments = async (postId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/comments/${postId}`,
      );
      setComments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to comment");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/comments/${post._id}`,
        { content: newComment },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setNewComment("");
      fetchComments(post._id);
    } catch (err) {
      alert("Failed to post comment");
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div className="post-detail-page">
      <Helmet>
        <title>{post.title} | MyBlog</title>
        <meta name="description" content={post.content.substring(0, 150)} />
      </Helmet>

      <article className="post-content">
        <h1>{post.title}</h1>
        <div className="post-meta">
          <span>By {post.author?.username}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="tags">
            {post.tags.map((tag, i) => (
              <span key={i} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="content">{post.content}</div>
      </article>

      <section className="comments-section">
        <h3>Comments ({comments.length})</h3>
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">
            Post Comment
          </button>
        </form>

        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment._id} className="comment">
              <strong>{comment.author?.username}</strong>
              <p>{comment.content}</p>
              <span className="comment-date">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default PostDetail;
