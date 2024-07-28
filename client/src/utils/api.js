import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const fetchCompanies = async () => {
  try {
    const response = await axios.get(`${API_URL}/companies`);
    return response.data;
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }
};

export const fetchCompanyDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/companies/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching company details:', error);
    throw error;
  }
};

export const addCompany = async (companyData) => {
    try {
      const response = await axios.post(`${API_URL}/companies`, companyData);
      return response.data;
    } catch (error) {
      console.error('Error adding company:', error);
      throw error;
    }
  };

  export const addReview = async (companyId, reviewData) => {
    try {
      const response = await axios.post(`${API_URL}/companies/${companyId}/reviews`, reviewData);
      return response.data;
    } catch (error) {
      console.error('Error adding review:', error);
      throw error;
    }
  };

export const fetchReviews = async (companyId) => {
    try {
      const response = await axios.get(`${API_URL}/companies/${companyId}/reviews`);
      return response.data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  };

