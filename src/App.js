import './App.css';
import { Route, Routes } from 'react-router-dom';
import EarlyAccess from './Components/EarlyAccessPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<EarlyAccess />} />
    </Routes>
  );
}

export default App;