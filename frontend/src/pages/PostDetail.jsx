import { useParams, useNavigate } from 'react-router-dom';
import { usePosts } from '../PostContext.jsx';
import { useEffect, useState } from 'react';
import './PostDetail.css';

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tabs, activeTab } = usePosts();
  const [slideDirection, setSlideDirection] = useState(null);

  const decodedId = decodeURIComponent(id);
  const currentTab = tabs.find((t) => t.id === activeTab);
  const posts = currentTab?.posts || [];

  const index = posts.findIndex((p) => p.uri === decodedId);
  const post = posts[index];

  useEffect(() => {
    if (slideDirection) {
      const timeout = setTimeout(() => setSlideDirection(null), 300);
      return () => clearTimeout(timeout);
    }
  }, [slideDirection]);

  if (!post) return <p style={{ textAlign: 'center' }}>Post not found.</p>;

  const prev = posts[index - 1];
  const next = posts[index + 1];

  return (
    <div className="post-detail-wrapper">
      <button onClick={() => navigate('/')} className="back-btn">
        Retour à l'accueil
      </button>

      <div className={`post-detail-content ${slideDirection || ''}`}>
        <h2>Post details</h2>

        <div className="author-info">
          <img src={post.author.avatar} alt="avatar" className="avatar" />
          <div>
            <strong>{post.author.displayName || post.author.handle}</strong><br />
            <span className="handle">@{post.author.handle}</span>
          </div>
        </div>

        <div className="post-box">
          <p>{post.record.text}</p>
          {post.embed?.images?.length > 0 && (
            <img src={post.embed.images[0].fullsize} alt="post media" />
          )}
        </div>
      </div>

      {prev && (
        <button
          className="arrow left"
          onClick={() => {
            setSlideDirection('slide-left');
            setTimeout(() => navigate(`/post/${encodeURIComponent(prev.uri)}`), 150);
          }}
        >
          ←
        </button>
      )}
      {next && (
        <button
          className="arrow right"
          onClick={() => {
            setSlideDirection('slide-right');
            setTimeout(() => navigate(`/post/${encodeURIComponent(next.uri)}`), 150);
          }}
        >
          →
        </button>
      )}
    </div>
  );
}

export default PostDetail;
