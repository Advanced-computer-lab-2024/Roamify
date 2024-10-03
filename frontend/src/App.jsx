import { useState } from 'react'
import './App.css'
import TourismGovernerPage from './pages/TourismGovernerPage.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <TourismGovernerPage />
    </div>
  );
}

export default App
