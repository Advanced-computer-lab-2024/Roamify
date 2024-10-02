import { useState } from 'react'
import './App.css'
import TourGuideProfile from './pages/TourGuideProfile.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <TourGuideProfile />
    </div>
  );
}

export default App
