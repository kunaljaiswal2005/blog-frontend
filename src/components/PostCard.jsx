import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <div className="post-card">
      <h3>
        <Link to={`/post/${post.slug}`}>{post.title}</Link>
      </h3>
      <p className="post-excerpt">{post.content.substring(0, 150)}...</p>
      <div className="post-meta">
        <span>By {post.author?.username || "Unknown"}</span>
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
    </div>
  );
}

export default PostCard;
