import React from 'react';
import { FaQuoteLeft, FaRegCommentDots } from 'react-icons/fa';
import NavbarPatientStories from '../components/navbar_patient_stories'; 


const patients = [
    {
      _id: '66e6ee53641ff11feec05005',
      name: 'Isara Liyanage',
      age: '51',
      country: 'Sri Lanka',
      sex: 'male',
      profile: 'https://firebasestorage.googleapis.com/v0/b/healthbotplus.appspot.com/...',
      feedback: "HealthBot+ has been a life-changer! The AI-driven diagnosis helped me catch my skin condition early, and now I'm on my path to recovery. Couldn't be happier with the service."
    },
    {
      _id: '67096f4e434becc4fe97cc27',
      name: 'Yasiru',
      age: 22,
      country: 'Sri Lanka',
      sex: 'male',
      profile: 'https://firebasestorage.googleapis.com/v0/b/healthbotplus.appspot.com/...',
      feedback: "As a young person, I was a bit hesitant to trust an AI-driven system, but HealthBot+ exceeded my expectations. The accurate predictions and friendly interface made the experience seamless."
    },
    {
      _id: '670ca23cb4d4a141d324e1a4',
      name: 'Danuka',
      age: 23,
      country: 'Sri Lanka',
      sex: 'male',
      profile: 'https://img.freepik.com/premium-vector/happy-girl-avatar-funny-child-pic_29937-5174.jpg',
      feedback: "The doctors at HealthBot+ are amazing! Dr. Athula provided such compassionate care, and the AI system gave me accurate insights about my skin health. Highly recommend it!"
    },
    {
      _id: '670d08e5604bfdef6ada89ed',
      name: 'Hansi Perera',
      age: '60',
      country: 'Sri Lanka',
      sex: 'female',
      profile: 'https://img.freepik.com/premium-vector/happy-girl-avatar-funny-child-pic_29937-5174.jpg',
      feedback: "At my age, having an easy-to-use system that helps me monitor my skin health is a blessing. I highly recommend HealthBot+ for anyone looking for a reliable service."
    },
    {
      _id: '670d0af7604bfdef6ada89f0',
      name: 'Kusal Mendis',
      age: '55',
      country: 'Sri Lanka',
      sex: 'male',
      profile: 'https://firebasestorage.googleapis.com/v0/b/healthbotplus.appspot.com/...',
      feedback: "HealthBot+ and Dr. Athula were there when I needed them most. The AI diagnosis was spot on, and the treatment was quick and effective. Grateful for this innovative tool!"
    },
    {
      _id: '670d13e1604bfdef6ada89f7',
      name: 'Kumara Sangakkara',
      age: '80',
      country: 'Sri Lanka',
      sex: 'male',
      profile: 'https://img.freepik.com/premium-vector/happy-girl-avatar-funny-child-pic_29937-5174.jpg',
      feedback: "At 80, my health is my priority. HealthBot+ made it easier for me to get diagnosed without needing to travel. A wonderful tool for elderly patients like me."
    },
  ];
  
  function PatientStories() {
    return (
      <div>
        <NavbarPatientStories activePage="patient_stories" /> {/* Include the Navbar */}
        <div className="container mx-auto p-8">
          <h1 className="text-4xl font-bold text-center mb-10 text-blue-600 flex justify-center items-center">
            <FaRegCommentDots className="text-blue-600 mr-3" /> {/* Icon next to the heading */}
            Patient Stories
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {patients.map((patient) => (
              <div key={patient._id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                {/* Patient Profile Picture */}
                <div className="flex justify-center mb-4">
                  <img
                    src={patient.profile}
                    alt={patient.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
                  />
                </div>
  
                {/* Patient Name */}
                <div className="text-center mb-4">
                  <h2 className="text-2xl font-semibold text-gray-800">{patient.name}</h2>
                  <p className="text-gray-500">{patient.age} years old, {patient.country}</p>
                </div>
  
                {/* Patient Feedback */}
                <div className="text-center">
                  <FaQuoteLeft className="text-blue-500 text-3xl inline-block mb-2" />
                  <p className="italic text-gray-600">"{patient.feedback}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  export default PatientStories;