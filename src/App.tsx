import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import CreateMovie from './pages/CreateMovie';
import MovieDetail from './pages/MovieDetail';
import UpdateMovie from './pages/UpdateMovie';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateMovie />} />
        <Route path="/edit/:id" element={<UpdateMovie />} />
        <Route path="/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  )

}

export default App
