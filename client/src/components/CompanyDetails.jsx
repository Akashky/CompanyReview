import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewSection from './ReviewSection';
import Header from './Header';
import ReviewModal from './ReviewModal';
import { fetchCompanyDetails } from '../utils/api';

const CompanyDetails = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getCompanyDetails = async () => {
      try {
        const data = await fetchCompanyDetails(id);
        setCompany(data.company);
      } catch (error) {
        console.error('Error fetching company details:', error);
      }
    };

    getCompanyDetails();
  }, [id]);

  if (!company) return <p>Loading...</p>;

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="app">
      <Header />
      <div className="app-results">
        <div key={company._id} className='company-card1'>

          <div className="company-info">
            <h1 className="company-name">{company.name}</h1>
            <img src={company.logo} alt={company.name} />
            <p className="company-address">{company.city}</p>
            <p>Location: {company.location}</p>
          </div>
          <div>
            <p>Founded On: {new Date(company.foundedOn).toLocaleDateString()}</p>
            <button className='add_review' onClick={openModal}>
              + Add Review </button>
          </div>
        </div>
        <div>
          <ReviewSection companyId={id} reviews={company.reviews} />
        </div>
        {showModal && <ReviewModal show={showModal} onClose={closeModal} companyId={id} reviews={company.reviews} />}
      </div>
    </div>
  );
};

export default CompanyDetails;
