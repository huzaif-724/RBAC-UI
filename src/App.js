import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserManagement from "./pages/UserManagement";
import RoleManagement from "./pages/RoleManagement";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>

        <Navbar></Navbar>
        <Router>
          <div className="flex flex-col min-h-screen mt-16 ">
          

            <div className="flex flex-grow">

              <main className="flex-grow p-4">
                <Routes>
                  <Route exact path="/" element={<UserManagement />} />
                  <Route path="/roles" element={<RoleManagement />} />
                </Routes>
              </main>

              <nav className=" bg-blue-700 text-white w-[300px] pl-7 pt-6">
                <h1 className=" text-lg font-bold mt-2">Admin Dashboard</h1>
                <ul>
                  <li><a href="/" className="block py-2 mr-2 font-sans font-medium text-lg border text-center bg-richblack-800 rounded-lg mt-4 hover:bg-yellow-25 hover:text-black">User Management</a></li>
                  <li><a href="/roles" className="block py-2 mr-2 font-sans font-medium text-lg border text-center bg-richblack-800 rounded-lg mt-4 hover:bg-yellow-25 hover:text-black">Role Management</a></li>
                </ul>
                <div className=" mt-[400px]">
                 <p className=" text-white mr-2 mt-7">Developed by: Mohd Huzaif</p>
                 <p className=" text-white">huzaifmohammad724@gmail.com</p>
                 </div>
              </nav>
              
            </div>
          </div>
        </Router> 

    </div>
    
  );
};

export default App;
