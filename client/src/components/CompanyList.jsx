import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from './AddCompanyModal';
import Header from './Header';
import { fetchCompanies } from '../utils/api';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchParam, setSearchParam] = useState('name');
  const [searchValue, setSearchValue] = useState('');
  const [globalSearchValue, setGlobalSearchValue] = useState('');
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    const getCompanies = async () => {
      try {
        const data = await fetchCompanies();
        setCompanies(data);
        setFilteredCompanies(data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    getCompanies();
  }, []);

  useEffect(() => {
    const filterCompanies = () => {
      let filtered = companies;

      if (searchValue) {
        filtered = filtered.filter(company =>
          company[searchParam].toLowerCase().includes(searchValue.toLowerCase())
        );
      }

      if (globalSearchValue) {
        filtered = filtered.filter(company =>
          company.name.toLowerCase().includes(globalSearchValue.toLowerCase()) ||
          company.location.toLowerCase().includes(globalSearchValue.toLowerCase()) ||
          company.city.toLowerCase().includes(globalSearchValue.toLowerCase())
        );
      }

      setFilteredCompanies(filtered);
    };

    filterCompanies();
  }, [searchValue, searchParam, globalSearchValue, companies]);

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchParamChange = (e) => {
    setSearchParam(e.target.value);
  };

  const handleGlobalSearchValueChange = (e) => {
    setGlobalSearchValue(e.target.value);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<i key={i} className="fa-solid fa-star" style={{color:"#f44336"}}></i>);
    }
    return stars;
  };

  return (
    <>
      <div className="app">
        <Header globalSearchValue={globalSearchValue} handleGlobalSearchValueChange={handleGlobalSearchValueChange} />
        <main className="app-main">
          <div className="app-filters">
            <div className="app-filter-city">
              <label htmlFor="city">Select {searchParam}</label>
              <input
                type="text"
                id="city"
                value={searchValue}
                onChange={handleSearchValueChange}
                placeholder={`Search by ${searchParam}`} />
            </div>
            <button className="app-filter-button">Find Company</button>
            <button className="app-filter-button" onClick={openModal}>+ Add Company</button>
            <div className="app-filter-sort">
              <label htmlFor="sort">Sort:</label>
              <select id="sort" value={searchParam} onChange={handleSearchParamChange}>
                <option value="name">Name</option>
                <option value="location">Location</option>
                <option value="city">City</option>
              </select>
            </div>
          </div>
          <div className="app-results">
            {filteredCompanies.map((company) => (
              <div key={company._id} className='company-card'>

                <div className="company-info">
                  <img src={company.logo} alt={company.name} />
                  <h1 className="company-name">{company.name}</h1>
                  <div className="company-rating">
                    {renderStars(4)}
                    <span>{company.reviews.length} Reviews</span>
                  </div>
                  <p className="company-address">{company.city}</p>
                  <div className="company-rating">
                    <p>{company.description}</p>
                  </div>
                </div>
                <button className='review-details'><Link to={`/companies/${company._id}`}>
                  Detail Review
                </Link></button>
              </div>
            ))}
          </div>
        </main>
        <div>

          {showModal && <Modal show={showModal} onClose={closeModal} />}
        </div>
      </div>
    </>
  );
};

export default CompanyList;
