import { useState } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar.jsx';
import UserProfileModal from '../components/UserProfileModal.jsx';
import { usePosts } from '../PostContext.jsx';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { tabs, activeTab, addTab, setActiveTab, removeTab } = usePosts();
  const navigate = useNavigate();

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/search?q=${query}`);
      addTab(query, response.data);
    } catch (err) {
      console.error('Erreur lors de la recherche :', err);
    } finally {
      setLoading(false);
    }
  };

  const currentTab = tabs.find((t) => t.id === activeTab);

  return (
    <div className="home-container">
      <SearchBar onSearch={handleSearch} />
      {loading && <p className="loading-text">Chargement...</p>}

      <div className="tabs">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab ${tab.id === activeTab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.query}
            <button className="close-tab" onClick={(e) => {
              e.stopPropagation();
              removeTab(tab.id);
            }}>×</button>
          </div>
        ))}
      </div>

      {currentTab &&
        currentTab.posts.map((post) => (
          <div key={post.uri} className="post-card">
            <div className="post-header" onClick={() => setSelectedUser(post.author.handle)}>
              <img src={post.author.avatar} alt="avatar" />
              <strong>{post.author.displayName || post.author.handle}</strong>
            </div>
            <p className="post-text">{post.record.text}</p>

            {post.embed?.images && post.embed.images.length > 0 && (
              <div className="post-images">
                {post.embed.images.map((img, i) => (
                  <img key={i} src={img.thumb} alt="post-img" className="post-image" />
                ))}
              </div>
            )}

            <p className="post-link" onClick={() => navigate(`/post/${encodeURIComponent(post.uri)}`)}>
              Voir le détail →
            </p>
          </div>
        ))}

      {selectedUser && (
        <UserProfileModal handle={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
}

export default Home;
