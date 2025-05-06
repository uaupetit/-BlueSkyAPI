import { createContext, useContext, useState } from 'react';

const PostContext = createContext();

export function PostProvider({ children }) {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);

  const addTab = (query, posts) => {
    const id = Date.now();
    const newTab = { id, query, posts };
    setTabs((prev) => [...prev, newTab]);
    setActiveTab(id);
  };

  const removeTab = (id) => {
    setTabs((prev) => prev.filter((tab) => tab.id !== id));
    if (activeTab === id && tabs.length > 1) {
      const newTabs = tabs.filter((tab) => tab.id !== id);
      setActiveTab(newTabs[newTabs.length - 1].id);
    } else if (tabs.length === 1) {
      setActiveTab(null);
    }
  };

  return (
    <PostContext.Provider value={{ tabs, activeTab, addTab, setActiveTab, removeTab }}>
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  return useContext(PostContext);
}

export function useTabs() {
  return useContext(PostContext);
}
