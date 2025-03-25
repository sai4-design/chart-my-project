import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './update.css';
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";




function Update(){
    const [user,setUser]  =  useState({
      FirstName: '',       // Ensure empty string if undefined
      LastName: '',        // Ensure empty string if undefined
      Participation:  ''
    })
 
    const {id} = useParams()
    const navigate = useNavigate();

    const HandleChange = (e)=>{
        const name= e.target.name
        const value=e.target.value
        setUser((prevValues)=>
            ({
                ...prevValues,
                         [name]:value
            }))
    }

    
    
    useEffect(()=>{

      const fetchuser = async()=>{
        try{
            const response = await fetch(`http://localhost:3000/users/${id}`,{
              method:'GET',
              headers:{
                'Content-Type': 'application/json'
              }
            })
            const Data = await response.json();
            console.log("Data_____37", Data)
            setUser({
              FirstName: Data.firstName || '',          // Ensure empty string if undefined
              LastName: Data.lastName || '',            // Ensure empty string if undefined
              Participation: Data.participation || ''
            })
            
            console.log(Data, 'data saved and needs to be updated')
          }catch (error) {
            console.error('Error fetching or updating user data:', error);
        }
        
      }
      fetchuser()
        ;
  },[id])

  const HandleSubmit = async (e) => {
    e.preventDefault();
     try{
      const response = await fetch(`http://localhost:3000/users/${id}`,{
            method:'PUT',
            headers:{
              'Content-Type': 'application/json'
            },
            body:JSON.stringify(user)
        });
          if(response.ok){
            console.log('Data has Changed');
            const Data = await response.json();
            setUser({
              FirstName       :    Data.firstName,
              LastName        :    Data.lastName,
              Participation   :    Data.participation,
            });
            
            console.log(user,'users Data upated')
            
            
            alert('ID updated')
            // navigate(`/delete?updatedId=${id}`);
            navigate(`/delete`);


            if(navigate){
              console.log(user,'navigating value succesful')
            }

            } else{
              console.log('data not changed')
            }
      }catch (error) {
        console.error('Error fetching or updating user data:', error);
    }
    
      
  };
   // Pass the updated ID back to the parent


 

 

    return(
    <>
    

<div className="B_U">
     <div className="container">
      <div className="frm">
        <h1>UPDATE USER</h1>
        <form onSubmit={HandleSubmit}> 
          <h5>FirstName</h5>
            <TextField
            sx={{marginBottom:'20px',
              width:'70%',
              // backgroundColor:" !important"
            }}
              variant="outlined"
              name="FirstName"
              value={user.FirstName || ''}
              onChange={HandleChange}
            />
            <h5>LastName</h5>
             <TextField
             sx={{marginBottom:'20px',
              width:'70%',
              // backgroundColor:" !important"
            }}
              name="LastName"
              variant="outlined"
              value={user.LastName || ''}
              onChange={HandleChange}
            />
            <h5>Participation</h5>
             <TextField
             sx={{marginBottom:'20px',
              width:'70%',
              display:'flex',
              alignItems:'center',
              justifyContent:'center'
              // backgroundColor:" !important"
            }}
              name="Participation"
              variant="outlined"
              value={user.Participation || ''}
              onChange={HandleChange}
            />
            
            <Button
            variant="outlined"
            size="large"
            type="submit"
            >update</Button>
        </form>
      </div>
     </div>
    </div>
    </>
    )
}
export default Update;