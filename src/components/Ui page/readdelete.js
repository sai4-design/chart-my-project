import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './read.css';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {   useNavigate} from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';


function Delete(){
      
    const [users,setUsers]=useState([]);
   
    const navigate = useNavigate();
    




  

  

    useEffect(() => {
      const fetchdata = async () => {
          try {
              const response = await fetch(`http://localhost:3000/users`, {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json'
                  }
              });
              const Data = await response.json();
              if (Array.isArray(Data)) {
                  setUsers(Data); // Always set the latest data
              } else {
                  console.error('Invalid data format:', Data);
              }
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
      fetchdata();
      
  }, []); // Empty dependency array ensures fetch happens every time
  
 
  


if(!users){
   return <div>
            Loading...
          </div>
}
const HandleDelete = async (id) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the user with ID: ${id}?`);
  
    if (!confirmDelete) {
      // If the user clicks "Cancel", simply return and do nothing
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        alert(`You have successfully deleted the user with ID: ${id}`);
        setUsers(users.filter((user) => user.id !== id));
        console.log(`ID: ${id} has been deleted`);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

    const HandleUPDtpage = (id) => { // users must because its parameter getting argument of user.id
        console.log('user num got update',id)
        navigate(`/update/${id}`);  //pass id through the url of specific id trigger the event
        console.log('navigation succesfull')  
             
      }

    return(<>
    <div className="body" style={{backgroundColor:'#f5f5f5', minHeight: '100vh'}}>
     <header>
    <nav class="navbar navbar-light bg-light header" style={{margin:'0px'}}>
        <div class="container-fluid top_hd">
            <div>
            <h2 class="navbar-brand">PIE CHART</h2>
            </div>
            <form class="d-flex">
                <input 
                    class="form-control me-2" 
                    type="search" 
                />
                <button class="btn btn-outline-success" type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
            </form>
        </div>
    </nav>
</header>
<div className="bd-back">
       <div className=" container b_dy bd-back">
        <div className="tabl">
        <TableContainer>
    <Table component={Paper}>
        <TableHead>
            <TableRow  sx={{ borderBottom: '4px solid #f5f5f5', height:50 }}>
                <TableCell align="center" sx={{ minWidth: "20px", width: "40px",paddingBottom: '20px' }}>ID</TableCell>
                <TableCell align="center" sx={{ minWidth: "50px", width: "100px", wordBreak: "break-word", paddingBottom: '20px'}}>FirstName</TableCell>
                <TableCell align="center" sx={{ minWidth: "50px", width: "100px", wordBreak: "break-word" }}>LastName</TableCell>
                <TableCell align="center" sx={{ minWidth: "50px", width: "100px", wordBreak: "break-word"}}>Participation</TableCell>
                <TableCell align="center" sx={{ minWidth: "50px", width: "80px", wordBreak: "break-word"}}>DELETE</TableCell>
                <TableCell align="center" sx={{ minWidth: "50px", width: "80px", wordBreak: "break-word"}}>UPDATE</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
    {/* {users.map((user) => (
        <TableRow
            key={user.id}
            sx={{
                // Creates space between rows
                height:'30px',
                backgroundColor:'#ffffff',
                paddingBottom:'50px',
                color:'#e3e3e3'
            }}
        >
            <TableCell align="center" sx={{ minWidth: "20px", width: "40px"}}>{user.id}</TableCell>
            <TableCell align="center" sx={{ minWidth: "50px", width: "100px", wordBreak: "break-word" }}>{user.firstName}</TableCell>
            <TableCell align="center" sx={{ minWidth: "50px", width: "100px", wordBreak: "break-word"}}>{user.lastName}</TableCell>
            <TableCell align="center" sx={{ minWidth: "50px", width: "100px", wordBreak: "break-word"}}>{user.participation}</TableCell>
            <TableCell align="center" sx={{ minWidth: "30px", width: "40px", wordBreak: "break-word"}}>
                <Button variant="contained" onClick={() => HandleDelete(user.id)} sx={{ marginTop: "10px" }}>DELETE</Button>
            </TableCell>
            <TableCell align="center" sx={{ minWidth: "30px", width: "40px", wordBreak: "break-word" }}>
                <Button variant="contained" onClick={() => HandleUPDtpage(user.id)}>UPDATE</Button>
            </TableCell>
        </TableRow>
    ))} */}
    {users.map((user, index) => (
    <>
        <TableRow
            key={user.id}
            sx={{
                height: '15px',
                borderBottom: '15px solid #f5f5f5' ,
                backgroundColor: '#ffffff',
                color: '#e3e3e3',
                border: '0px solid transparent', // Make sure there is a border initially
                '&:hover': {
                  borderColor: '#8ac248', // Set the hover border color
                  cursor: 'pointer', // Make the cursor pointer on hover
                  border: '5px solid #8ac248',
                  
                } // Set border when hovered
            }}
        >
            <TableCell align="center" sx={{ minWidth: "20px", width: "40px", }}>{user.id}</TableCell>
            <TableCell align="center" sx={{ minWidth: "50px", width: "100px", wordBreak: "break-word" }}>{user.firstName}</TableCell>
            <TableCell align="center" sx={{ minWidth: "50px", width: "100px", wordBreak: "break-word" }}>{user.lastName}</TableCell>
            <TableCell align="center" sx={{ minWidth: "50px", width: "100px", wordBreak: "break-word" }}>{user.participation}</TableCell>
            <TableCell align="center" sx={{ minWidth: "30px", width: "40px", wordBreak: "break-word" }}>
                 <DeleteIcon  onClick={() => HandleDelete(user.id)}/>
            </TableCell>
            <TableCell align="center" sx={{ minWidth: "20px", width: "30px", wordBreak: "break-word" }}>
               <Button variant="contained" onClick={() => HandleUPDtpage(user.id)}>Update</Button>
            </TableCell>
        </TableRow>

        {/* Spacer Row to create space between rows */}
        {index !== users.length - 1 && (
            <TableRow>
                <TableCell colSpan={6} sx={{ height: '10px', backgroundColor: '#f5f5f5', padding: '5px' , }} />
            </TableRow>
        )}
    </>
))}


</TableBody>
    </Table>
</TableContainer>
        </div>
       </div>
       </div>
    </div>
    </>)
}
export default Delete;

// import React, { useEffect, useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Link, useParams } from "react-router-dom";
// import { Button } from "@mui/material";


// function ReadDelete(){
      
//     const [users,setUsers]=useState()
//     const [id] = useParams();

//     useEffect(()=>{
//         const fetchuser = async()=>{
//             const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
//                 method:"GET",
//                 headers:{
//                     'content-type':'application/json'
//                 }
//             });
//             if(!response.ok){
//                  throw new Error("error on getting data");
//             }
//             const Data = await response.json();
//             setUsers(Array.isArray(Data)? Data : [Data]);
//         };
//         fetchuser();
//     },[id])

//     const HandleDelete =async ()=>{
//         const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
//             method:'DELETE'
//         });
//         if(response.ok){
//             setUsers(users.filter((user)=>user.id !== parseInt(id)));
//         }
//     }

//     return(
//     <>
//         <div>
//             <ul>
//           {
//             users.map((user)=>(
//                 <li key={user.id}>
//                      {user.FirstName}
//                      {user.LastName}
//                      {user.Participation}
//                      <Link to={`/chartupdate ${user.id}`}>Edit</Link>
//                      <Button onClick={HandleDelete}>Delete</Button>
//                 </li>
//             ))
//           }
//           </ul>
//         </div>
//     </>
//     )
// }
// export default ReadDelete;