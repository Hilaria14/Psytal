import React, { useState, useEffect } from 'react';
import axiosClient from '../../../axios.js';
import ClassPopUp from '../views_components/ClassPopUp.jsx';
import ReactModal from 'react-modal';
import page1 from "@assets/Help/Student/Classes/1.png";


export default function ClassesForStudent() {
    const [isClassPopUpOpen, setClassPopUpOpen]= useState(false);
    const [selectedClass, setSelectedClass] = useState([]);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

    // Function to toggle help modal
    const toggleHelpModal = () => {
      setIsHelpModalOpen(!isHelpModalOpen);
    };

    const handleOpenPopUp = (subject) => {
        setClassPopUpOpen(true);
        setSelectedClass(subject);
      }

    const [classes, setClasses] = useState([]);   
      useEffect(() => {
          fetchClasses();
        }, []);
      
      const fetchClasses = async () => {
          try {
            const response = await axiosClient.get('/classes');
            const classesArray = Object.values(response.data);
            setClasses(classesArray);
            console.log('Response Data:', classesArray);
          } catch (error) {
            console.error(error);
          }
        };

    return (
      <>
      <div className="w-full h-[auto] px-4 mx-auto rounded-3xl bg-white shadow-2xl pt-5 pb-12">
        <div className="mt-5 mx-5 pb-5 border-b-2 border-black flex flex-row justify-between items-baseline">
          <div className="font-bold text-4xl lg:text-6xl text-[#525252]">Classes</div>
        </div>
      
        {/* <div className="table-container overflow-x-auto"> Edited*/}
        <div className="table-container overflow-x-auto max-h-[400px] overflow-y-auto">
          <table className="table w-full table-striped text-gray-700">
            <thead>
              <tr>
                <th className="text-left bg-gray-200 p-2" style={{ width: "10%" }}>Class Code</th>
                <th className="text-left bg-gray-200 p-2" style={{ width: "10%" }}>Course Code</th>
                <th className="bg-gray-200 text-left p-2" style={{ width: "20%" }}>Course Title</th>
                <th className="bg-gray-200 text-left p-2" style={{ width: "5%" }}>Semester</th>
                <th className="bg-gray-200 text-left p-2" style={{ width: "5%" }}>Year</th> 
                <th className="bg-gray-200 text-left p-2" style={{ width: "5%" }}>Section</th>
                <th className="bg-gray-200 text-left p-2" style={{ width: "5%" }}>Units</th>
              </tr>
            </thead>
            <tbody> {classes.map((classItem, index) => (
                  <tr 
                    key={index} 
                    className={`${index % 2 === 0 ? 'odd:bg-green-100' : ''}`}
                  >
                  <td className="text-left p-2" style={{ width: "10%" }}>{classItem.class_code}</td>
                  <td className="text-left p-2" style={{ width: "10%" }}>{classItem.course_code}</td>
                  <td className="text-left p-2" style={{ width: "20%" }}>{classItem.course_title}</td>
                  <td className="text-left p-2" style={{ width: "5%" }}>{classItem.semester}</td>
                  <td className="text-left p-2" style={{ width: "5%" }}>{classItem.class_year}</td>
                  <td className="text-left p-2" style={{ width: "5%" }}>{classItem.class_section}</td>
                  <td className="text-left p-2" style={{ width: "5%" }}>{classItem.units}</td>
                </tr>
              ))}
            </tbody>
          </table>
                 {/* Help Modal */}
                  <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '9999' }}>
                        <button onClick={toggleHelpModal} style={{ backgroundColor: '#b3d7b2', color: '#000', border: 'none', borderRadius: '50%', width: '60px', height: '60px', fontSize: '30px', cursor: 'pointer' }}>?</button>
                  </div>
        </div>
      </div>   
       {/* HELP*/}
      <ReactModal
      isOpen={isHelpModalOpen}
      onRequestClose={toggleHelpModal}
      style={{ content: {
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: '9998',
          backgroundColor: '#fff',
          border: '1px solid #000',
          padding: '20px',
          textAlign: 'center', // Align the content center
        }
      }}
    >
      <div>
        <img
            src={page1}
            alt="Page 1"
        />

        <button
          onClick={toggleHelpModal}
          style={{
            backgroundColor: 'red',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 20px',
            cursor: 'pointer',
          }}
        >
          Close
        </button>
      </div>
    </ReactModal>
      </>
    );
  }