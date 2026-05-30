import { Link } from "react-router-dom";

function PostCard({ post }) {
  const readingTime = Math.ceil(post.content.split(" ").length / 200);

  return (
    <Link to={`/post/${post.slug}`} style={{ textDecoration: "none" }}>
      <div className="post-card">
        <h3>
          <span>{post.title}</span>
        </h3>
        <p className="post-excerpt">{post.content.substring(0, 140)}...</p>
        <div className="post-meta">
          <span>📝 {readingTime} min read</span>
          <span>
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
        {post.author && (
          <p
            style={{
              fontSize: "0.9rem",
              color: "#64748b",
              marginBottom: "1rem",
            }}
          >
            By <strong>{post.author.username}</strong>
          </p>
        )}
        {post.tags && post.tags.length > 0 && (
          <div className="tags">
            {post.tags.map(
              (tag, i) =>
                tag && (
                  <span key={i} className="tag">
                    {tag}
                  </span>
                ),
            )}
          </div>
        )}
      </div>
    </Link>
  );
}

export default PostCard;
