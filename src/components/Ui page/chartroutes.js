import React  from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


function Post(){

  const datapost = async()=>{
    const newUser= {
      "id": 9,
      "FirstName": "divya",
      "LastName": "bollu",
      "Participation": 27
    }
    try{
      const response = await fetch('http://localhost:5000/users',{
        method:'POST',
        headers:{
          'content-type': 'application.json '
        },
        body:JSON.stringify(newUser)
      })
      if(response.ok){
           console.log('data stored')
      } else {
        console.log("error is storing")
      }
  }catch(error){
        console.error('Error',error)
    }

  };
  
    return(<>
      <h1 style={{backgroundColor:'blue'}}>Update</h1>
      <button onClick={datapost}>store</button>
    </>)
}
export default Post;