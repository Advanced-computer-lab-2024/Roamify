import { useState } from 'react'
import './App.css'
import AdvertiserPage from './pages/AdvertiserPage.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <AdvertiserPage />
    </div>
  );
}

export default App
