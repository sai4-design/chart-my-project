import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';



import Chart from "./components/Ui page/chart";
import {  Routes, Route, BrowserRouter} from "react-router-dom";
import Delete from "./components/Ui page/readdelete";
import Update from "./components/Ui page/chartupdate";

// import Post from "./components/Ui page/chartroutes";



// import { Box, CssBaseline } from "@mui/material";
// import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
// import SideBar from "./components/Dashboard/dashcomp/Sidebar";
// import Header from "./components/Dashboard/dashcomp/header";
// import Home from "./components/Dashboard/pages/home";
// import About from "./components/Dashboard/pages/about";
// import MainComp from "./components/Dashboard/dashcomp/maincomp";
// import Blog from "./components/Dashboard/pages/blog";



// function Dashboard() {
//   return (
//     <Box sx={{ display: 'flex' }}>
//       <SideBar />
//       <Box sx={{ flexDirection: 'column', flexGrow: 1 }}>
//         <Header />
//         <Box>

//         </Box>
//       </Box>
//     </Box>
//   );
// }

function App() {


  return (
    <>

    {/* <Post/> */}
    
  <BrowserRouter>
        <Routes>
            
            <Route path="/" element={<Chart />} />
            <Route path="/chart" element={<Chart />} />
            <Route path="/delete" element={<Delete/>} />
            <Route path="/update/:id" element={<Update />}/> :id will extract the id parameter from url

        </Routes>
  </BrowserRouter>
  
      {/* <BrowserRouter>
        <CssBaseline />
        <Box>
          <Routes>
          
            <Route path="/" element={<Dashboard />}>
              <Route index element={<MainComp />} />
              <Route path="/home" element={<Home />} />
              <Route path="/aboutus" element={<About />} />
               <Route path="/blogus" element={<Blog />} />
            </Route>
          </Routes>
        </Box>
      </BrowserRouter> */}
    </>
  );
}

export default App;
