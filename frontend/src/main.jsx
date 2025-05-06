import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import PostDetail from './pages/PostDetail.jsx';
import { PostProvider } from './PostContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PostProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="/post/:id" element={<PostDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PostProvider>
  </React.StrictMode>
);
