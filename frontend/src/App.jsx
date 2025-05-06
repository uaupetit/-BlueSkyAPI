import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1 className="page-title">Bluesky Searcher</h1>
      <Outlet />
    </div>
  );
}

export default App;
