import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CompanyList from './components/CompanyList';
import CompanyDetails from './components/CompanyDetails';
import './index.css'

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<CompanyList />} />
          <Route path="/companies/:id" element={<CompanyDetails />} />
        </Routes>
    </Router>
  );
};

export default App;
