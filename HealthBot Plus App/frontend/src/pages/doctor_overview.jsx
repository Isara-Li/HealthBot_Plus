import React from 'react';
import { FaEnvelope, FaUser, FaUniversity, FaBriefcase, FaHospitalAlt, FaIdBadge, FaStickyNote, FaClipboardCheck, FaCheck } from 'react-icons/fa'; // Import icons
import { useSelector } from 'react-redux';
import Navbar from "../components/navbar_doctor_overview"; // Import Navbar
import Footer from "../components/footer"; // Import Footer

function DoctorOverview() {
  const { currentUser } = useSelector((state) => state.user);

  const doctorInfo = {
    name: 'Dr. Athula',
    email: 'doctor@gmail.com',
    age: 51,
    country: 'Sri Lanka',
    profile: 'https://static.vecteezy.com/system/resources/previews/001/511/502/non_2x/male-doctor-icon-free-vector.jpg', // Fixed doctor profile image
    specializations: ['Dermatology', 'Melanoma Treatment', 'Cosmetic Dermatology'],
    qualifications: ['MBBS (University of Colombo)', 'MD in Dermatology (University of Colombo)', 'Fellowship in Skin Cancer Treatment (Australia)'],
    experience: '25 years of experience in treating skin diseases, with a special focus on skin cancer and cosmetic dermatology.',
    hospitals: ['National Hospital of Sri Lanka', 'Teaching Hospital Karapitiya', 'District General Hospital Matara'],
    registration: 'Sri Lanka Medical Council - Reg No: 12345',
    specialNote: 'Dr. Athula has been a pioneer in using AI for skin disease detection and has contributed to multiple research papers on skin cancer detection.'
  };

  return (
    <div>
      <Navbar activePage="doctor_overview" /> {/* Pass the activePage prop */}
      <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg mt-6">
        
        {/* Doctor Profile Image */}
        <div className="text-center mb-8">
          <img
            src={doctorInfo.profile} // Always use the correct doctor's profile image
            alt="Doctor Profile"
            className="w-40 h-40 rounded-full border-2 border-gray-300 mx-auto cursor-pointer"
          />
        </div>

        {/* Doctor Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Info Box */}
          <div className="p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <FaUser className="text-blue-500 text-2xl mr-3" />
              <h3 className="text-2xl font-semibold">Basic Information</h3>
            </div>
            <p><strong>Name:</strong> {doctorInfo.name}</p>
            <p><strong>Email:</strong> {doctorInfo.email}</p>
            <p><strong>Age:</strong> {doctorInfo.age}</p>
            <p><strong>Country:</strong> {doctorInfo.country}</p>
          </div>

          {/* Specializations Box */}
          <div className="p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <FaBriefcase className="text-blue-500 text-2xl mr-3" />
              <h3 className="text-2xl font-semibold">Specializations</h3>
            </div>
            <ul className="ml-6 mt-2">
              {doctorInfo.specializations.map((spec, index) => (
                <li key={index} className="text-gray-700 flex items-center">
                  <FaCheck className="text-green-500 mr-2" /> {spec}
                </li>
              ))}
            </ul>
          </div>

          {/* Qualifications Box */}
          <div className="p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <FaUniversity className="text-blue-500 text-2xl mr-3" />
              <h3 className="text-2xl font-semibold">Qualifications</h3>
            </div>
            <ul className="ml-6 mt-2">
              {doctorInfo.qualifications.map((qualification, index) => (
                <li key={index} className="text-gray-700 flex items-center">
                  <FaCheck className="text-green-500 mr-2" /> {qualification}
                </li>
              ))}
            </ul>
          </div>

          {/* Experience Box */}
          <div className="p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <FaClipboardCheck className="text-blue-500 text-2xl mr-3" />
              <h3 className="text-2xl font-semibold">Experience</h3>
            </div>
            <p className="text-gray-700">{doctorInfo.experience}</p>
          </div>

          {/* Hospitals Box */}
          <div className="p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <FaHospitalAlt className="text-blue-500 text-2xl mr-3" />
              <h3 className="text-2xl font-semibold">Practicing Hospitals</h3>
            </div>
            <ul className="ml-6 mt-2">
              {doctorInfo.hospitals.map((hospital, index) => (
                <li key={index} className="text-gray-700 flex items-center">
                  <FaCheck className="text-green-500 mr-2" /> {hospital}
                </li>
              ))}
            </ul>
          </div>

          {/* Registration Box */}
          <div className="p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <FaIdBadge className="text-blue-500 text-2xl mr-3" />
              <h3 className="text-2xl font-semibold">Registration</h3>
            </div>
            <p className="text-gray-700">{doctorInfo.registration}</p>
          </div>

          {/* Special Note Box */}
          <div className="p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <FaStickyNote className="text-blue-500 text-2xl mr-3" />
              <h3 className="text-2xl font-semibold">Special Note</h3>
            </div>
            <p className="text-gray-700">{doctorInfo.specialNote}</p>
          </div>
        </div>
      </div>

      
      <Footer />
    </div>
  );
}

export default DoctorOverview;
