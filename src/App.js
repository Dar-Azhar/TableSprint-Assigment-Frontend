import { Outlet } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { useAuth } from './context/AuthContext';
import PopUp from './components/PopUp';
import { useState } from 'react';
import LogoutIcon from './assets/icons/DeleteIcon.svg';

function App() {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const { logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleClosePopUp = () => {
    setIsPopUpOpen(false);
  };

  const handleLogout = () => {
    logout();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        className={`transform transition-all min-w-60 sm:min-w-72 duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`} toggleSidebar={toggleSidebar}
      />

      <main className={`flex-grow bg-white  md:ml-72 sm-plus:ml-0`}>
        <Header
          setIsPopUpOpen={setIsPopUpOpen}
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
        <div className="flex-grow overflow-x-auto  max-w-[100vw]">
          <Outlet />
        </div>
        <PopUp open={isPopUpOpen} onClose={handleClosePopUp} onConfirm={handleLogout}>
          <div className="bg-white rounded-2xl p-8 shadow-xl w-72 md:w-96 text-center">
            <div className="flex items-center justify-center mb-4">
              <img src={LogoutIcon} className="text-3xl mr-2" alt="delete-icon" />
              <h2 className="text-xl font-bold">Logout</h2>
            </div>
            <p className="text-gray-600">Are you sure you want to ?</p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                className="border border-gray-300 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-100"
                onClick={handleClosePopUp}
              >
                Cancel
              </button>
              <button
                className="bg-purple-700 text-white px-6 py-2 rounded-full hover:bg-purple-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </PopUp>
      </main>
    </div>
  );
}

export default App;
