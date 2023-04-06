
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './component/Form';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/reset-password' element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;
