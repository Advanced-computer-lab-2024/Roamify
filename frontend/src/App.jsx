import { useState } from 'react'
import './App.css'
import AdvertiserProfile from './pages/AdvertiserProfile.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <AdvertiserProfile />
    </div>
  );
}

export default App
