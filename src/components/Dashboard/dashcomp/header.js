import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppBar, Toolbar } from "@mui/material";



const Header =()=>{
    return(
        <>
    <AppBar position="sticky">
        <Toolbar>
            <h1>DASHBOARD</h1>
        </Toolbar>
    </AppBar>
   </> )
}
export default Header;