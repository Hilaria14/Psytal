import React, { useState, useEffect } from 'react';
import axiosClient from '../../../axios.js';
import { useStateContext } from '../../../context/ContextProvider';
import AddLinks from '../views_components/AddLinks.jsx';
import ReactModal from 'react-modal';
import edit from "@assets/icons8createpost.png";
import archive from "@assets/delete.png";
import page1 from "@assets/Help/Admin/Links/1.png";
import page2 from "@assets/Help/Admin/Links/2.png";
import page3 from "@assets/Help/Admin/Links/3.png";
import page4 from "@assets/Help/Admin/Links/4.png";
import page5 from "@assets/Help/Admin/Links/5.png";
import page1E from "@assets/Help/Staff/Links/1.png";
import page2E from "@assets/Help/Staff/Links/2.png";
import page3E from "@assets/Help/Staff/Links/3.png";
import EditLinks from '../views_components/EditLinks.jsx';
import ArchiveLinks from '../views_components/ArchiveLinks.jsx';

export default function Links() {
  //Calling the Archivelinks
  const [showEditlink, setshowEditlink] = useState(false);
  const [selectedLink, setSelectedLink] = useState('');
  const [isAchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [filterText, setFilterText] = useState(''); //for search
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const {userRole} = useStateContext(''); //just refresh server

  const handleCloseArchiveModal = () => {
    setSelectedLink(null);
    setIsArchiveModalOpen(false);
  }

   // Function to toggle help modal
   const toggleHelpModal = () => {
    setIsHelpModalOpen(!isHelpModalOpen);
  };

    const addLinks = async (linkData) => {
      try {
        const response = await axios.post('/addlink', linkData);
      } catch (error) {
        console.error(error);
      }
    };
    
    const onSubmitarchivelink = async (archiveModalValue, index) => {
      setSelectedLink(links[index]); // Make sure the correct link is selected 
      setIsArchiveModalOpen(archiveModalValue);
    };

  // Calling the Addlink
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [links, setLinks] = useState([]);  
  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const response = await axiosClient.get('/getlinks');
      setLinks(response.data.links);
    } catch (error) {
      console.error(error);
    }
  };
        
  //Update Axios
  const updateLink = async (updatedLink) => {
    try {
      const response = await axiosClient.put(`/updatelink/${updatedLink.id}`, updatedLink);
      console.log('Link updated successfully:', response.data);
      fetchLinks();
      handleCloseEditLinks(); // Close the edit modal
    } catch (error) {
      console.error('Error updating link:', error);
    }
  };

  const handleEditClick = (link) => {
    setshowEditlink(true);
    setSelectedLink(link);
  };

  const handleCloseEditLinks = () => {
    setSelectedLink(null);
    setIsEditLinksOpen(false);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  // //for search
  const filteredData = links.filter(
    (link) =>
      link.class_code.toString().includes(filterText) ||
      link.class_description.toLowerCase().includes(filterText.toLowerCase()) ||
      link.instructor_name.toLowerCase().includes(filterText.toLowerCase()) ||
      link.url.toLowerCase().includes(filterText.toLowerCase())
  );
 
  return (
    <>
    <div className="w-full h-[auto] px-4 mx-auto rounded-3xl bg-white shadow-2xl pt-5 pb-12">
      <div className="mt-5 mx-5 pb-5 border-b-2 border-black flex flex-row justify-between items-baseline">
        <div className="font-bold text-4xl lg:text-6xl text-[#525252]">Links</div>
        <div className="mt-5 mx-5 flex flex-row justify-between items-baseline">
          
          {/* //Search input */}
          <div className="flex items-baseline">
          <div className="my-4 mx-4" id="magnifying_glass">
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
          </div>
          <input
            id="search_bar"
            type="text"
            placeholder="Search by Title, Description, Email / Contact, Link ..."
            value={filterText}
            onChange={(event) => setFilterText(event.target.value)}
            className="h-10 px-7 py-4 border border-gray-300 focus:ring-viridianHue focus:border-viridianHue rounded-lg"
          />
        </div>
          {/* Add Links button */}
          <button onClick={() =>  setIsModalOpen(true)}
            className="bg-[#397439] hover:bg-[#0FE810] rounded-2xl  px-7 py-2 text-white font-size ml-10"
          >
            Add Links
          </button>
                    
        </div>
      </div>
    
      {/* <div className="table-container overflow-x-auto"> Edited*/}
      <div className="table-container overflow-x-auto max-h-[400px] overflow-y-auto">
          <table className="table w-full table-striped text-gray-700 mt-5" >
		          <thead>
		              <tr>
                    <th className="text-center bg-gray-200" style={{ width: "10%" }}>Title</th>
                    <th className="text-center bg-gray-200" style={{ width: "15%" }}>Description</th>
                    <th className="text-center bg-gray-200 p-2" style={{ width: "15%" }}>Contact</th>
                    <th className="text-center bg-gray-200 p-2" style={{ width: "40%" }}>Link </th>
                    <th className="text-left bg-gray-200" style={{ width: "auto" }}>Action</th>
		              </tr>
              </thead>
          </table>
      </div>

      <div className="max-h-[400px] overflow-y-auto">
          <table className="table w-full table-striped text-gray-700 ">
              <tbody>
                {filteredData.map((link, index) => (//edited
                  <tr key={index} 
                  className={`${index % 2 === 0 ? 'odd:bg-green-100' : ''}`} 
                  onSubmit={addLinks}
                  >
                    <td className="text-center p-2 overflow-hidden overflow-wrap break-word" style={{ width: "10%" }}>{link.class_code.slice(0, 60)}</td>
                    <td className="text-center p-2 overflow-hidden overflow-wrap break-word" style={{ width: "15%" }}>{link.class_description.slice(0, 60)}</td>
                    <td className="text-center p-2 overflow-hidden overflow-wrap break-word" style={{ width: "15%" }}>{link.instructor_name.slice(0, 60)}</td>
                    <td className="text-left p-2 overflow-hidden overflow-wrap break-word" style={{ width: "40%" }}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" 
                      className="hover:underline p-2 hover:text-blue-500 overflow-hidden overflow-wrap break-word">
                      {link.url.slice(0, 40)}... {/* Displaying the first 50 characters */}
                      </a>
                    </td>
                    <td className= "flex items-left p-2" style={{ width: "auto"}}>
                      <button onClick={() => handleEditClick(link)}>
                        <img src={edit} alt='edit' className='h-5 w-5 cursor-pointer transform transition-transform hover:scale-125'/>
                      </button>
                      <button onClick={() => onSubmitarchivelink(true, index)}>
                        <img src={archive} alt='archive' className='h-7 w-7 cursor-pointer transform transition-transform hover:scale-125'/>
                      </button>   
                    </td>

                  </tr>
                ))}
                </tbody>
          </table>
          {/* Help Modal */}
          <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '9999' }}>
            <button onClick={toggleHelpModal} style={{ backgroundColor: '#fff', color: '#000', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '20px', cursor: 'pointer' }}>?</button>
          </div>
      </div>
    </div>


      {/* Addlinks Modal*/}
      <ReactModal
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      className="lg:w-1/2 md:w-[40%] sm:w-[20%] h-fit bg-[#FFFFFF] rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5"
      >
        <div>
          <AddLinks closeModal={() => setIsModalOpen(false)}/>
        </div>
      </ReactModal>

      
      <ReactModal
      isOpen={isAchiveModalOpen}
      onRequestClose={() => setIsArchiveModalOpen(false)}
      className=" h-0 w-0"
      >
      {/* Archive Modal*/}  
      <ArchiveLinks
        onClose={handleCloseArchiveModal}
        selected={selectedLink}
              />

      {/* Edit/Update Modal         */}
      </ReactModal>

      <ReactModal
      isOpen={showEditlink}
      onRequestClose={() => setshowEditlink(false)}
      className=" h-0 w-0"
      >
        < EditLinks
              showEditlink={showEditlink}
              onClose={() => setshowEditlink(false)}
              selected={selectedLink}
            />
      </ReactModal>

{/* HELP -ADMIN*/}
{userRole == 1 && (
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
        <img
            src={page2}
            alt="Page 2"
        />
        <img
            src={page3}
            alt="Page 3"
        />
        <img
            src={page4}
            alt="Page 4"
        />
        <img
            src={page5}
            alt="Page 5"
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
)}
 {/* HELP- STAFF*/}
 {userRole == 2 && (
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
            src={page1E}
            alt="Page 1"
        />
        <img
            src={page2E}
            alt="Page 2"
        />
        <img
            src={page3E}
            alt="Page 3"
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
    )}

      </>

    
  );
  }