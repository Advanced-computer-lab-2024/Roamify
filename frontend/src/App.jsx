import { useState } from 'react'
import './App.css'
import TourGuideItinerary from './pages/TourGuideItinerary.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <TourGuideItinerary />
    </div>
  );
}

export default App
