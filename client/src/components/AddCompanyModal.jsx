import { useState } from 'react';
import { addCompany } from '../utils/api';

const Modal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        foundedOn: '',
        city: '',
        logo: '',
        description: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addCompany(formData); 
            console.log("response", response);
            alert('Company profile created successfully');
        } catch (error) {
            console.error('Error adding company:', error);
            alert('Failed to create company profile');
        }
        onClose();
    };

    return (
        <div className="add-company-modal">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>
                    &times;
                </span>
                <h2>Add Review</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="company-name">Company name<span style={{color:"red"}}>*</span></label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location<span style={{color:"red"}}>*</span></label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                        <span className="location-icon">
                            <i className="fas fa-map-marker-alt"></i>
                        </span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="founded-on">Founded on<span style={{color:"red"}}>*</span></label>
                        <input
                            type="date"
                            name="foundedOn"
                            value={formData.foundedOn}
                            onChange={handleChange}
                            required
                        />
                        <span className="calendar-icon">
                            <i className="fas fa-calendar-alt"></i>
                        </span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City<span style={{color:"red"}}>*</span></label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">URL Logo<span style={{color:"red"}}>*</span></label>
                        <input
                            type="text"
                            name="logo"
                            value={formData.logo}
                            onChange={handleChange}
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">Description<span style={{color:"red"}}>*</span></label>
                        <textarea
                        style={{width:"100%", height:"60px", border:"1px solid #ccc"}}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required />
                    </div>
                    <button type="submit" className="save-button">
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Modal;