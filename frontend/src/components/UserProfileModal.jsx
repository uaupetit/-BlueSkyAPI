import { useEffect, useState } from 'react';
import axios from 'axios';
import './UserProfileModal.css';

function UserProfileModal({ handle, onClose }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await axios.get(`http://localhost:3000/users/${handle}`);
        setProfile(res.data);
      } catch (err) {
        console.error("Erreur profil :", err);
      }
    }

    fetchProfile();
  }, [handle]);

  if (!profile) return null;

  return (
    <div className="profile-overlay" onClick={onClose}>
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="close-btn">×</button>
        <img src={profile.avatar} alt="avatar" className="profile-avatar" />
        <h2 className="profile-name">{profile.displayName || profile.handle}</h2>
        <p className="profile-handle">@{profile.handle}</p>
        <p className="profile-bio">{profile.description || "Pas de bio."}</p>
      </div>
    </div>
  );
}

export default UserProfileModal;
