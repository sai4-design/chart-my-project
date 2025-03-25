import React, { useState } from "react";
import './chart.css';
import TextField from '@mui/material/TextField';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import {Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from 'recharts';
import { useNavigate} from "react-router-dom";



function Chart() {

  const [personname,setPersonName]= useState({
    FirstName:'',
    LastName:'',
    Participation:'',
  })
  const [tableData,setTable]=useState([]);
  const [chartData,setChartData]=useState([]);
  const navigate = useNavigate();

  const HandleDletpage = () => {
    navigate('/delete')  ;  
    console.log('navigation succesfull')     // Replace with your desired route
  }



  const HandleChange = (e) =>{
    const name = e.target.name;
    const value= e.target.value;
    setPersonName(values=>({...values,[name]:value}))
  }

//   const updateChart = () =>{
//     const totalparticipation = chartData.reduce((sum,entry)=> sum+parseInt(entry.participation,10),0)
//     return chartData.map((entry)=>({
//         ...chartData,
//         value: (parseInt(entry.participation,10)/totalparticipation)*100
//     }))
// }


  
const HandleSubmit = async (e) => {
  e.preventDefault();

  // Validation
  if (personname.FirstName === "" || personname.LastName === "" || personname.Participation === "") {
      console.log("Please fill the fields");
      return;
  }

  // Update `tableData`
  const updatedtable = [
      ...tableData,
      {
          firstName: personname.FirstName,
          lastName: personname.LastName,
          participation: personname.Participation,
      },
  ];
  setTable(updatedtable);

  // Prepare new chart entry
  const newinput = {
      name: `${personname.FirstName} ${personname.LastName}`,
      participation: parseInt(personname.Participation, 10),
  };

  const updatedChart = [
      ...chartData,
      newinput,
  ];

  // Calculate total participation and update chart data
  const chartsum = updatedChart.reduce((sum, entry) => sum + parseInt(entry.participation,10), 0);
  const chartcalc = updatedChart.map((entry) => ({
      ...entry,
      value: (parseInt(entry.participation) / chartsum) * 100,
  }));

  setChartData(chartcalc);

  // Clear input fields
  setPersonName({
      FirstName: "",
      LastName: "",
      Participation: "",
  });

     try {
      const response = await fetch('http://localhost:3000/users',{
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: personname.FirstName,
            lastName: personname.LastName,
            participation: personname.Participation,      // Send the person data
             // Send only the value of the most recent chart entry
          }),
      });

      if (!response.ok) {
          throw new Error("Error in saving Data");
      }

      const Data = await response.json();
      console.log(Data)

      // Save to localStorage
      if(Data){
      localStorage.setItem("sai", JSON.stringify({ names: personname}));
      console.log("Saved to localStorage");
      }
  } catch (error) {
      console.error("Error in storing data", error);
  }
};



  const COLORS = ['#5097e6', '#49bb98', '#dc4a37', '#9952bf','#bfc3c7'];  


  return(<>
    <div className="chartt">
        <header>
            <div className="Inpt_fild">
              <form onSubmit={HandleSubmit}>
                <div className="row  align-items-center  justify-content-evenly ">
                      <div className="col-2">
                          <TextField
                            name="FirstName"
                            value={personname.FirstName || ""}
                            onChange={HandleChange}
                            className="field"
                            label="FirstName"
                            variant="outlined"
                            size="medium"
                            fullWidth
                          />
                      </div>
                      <div className="col-2">
                          <TextField
                            name="LastName"
                            value={personname.LastName || ""}
                            onChange={HandleChange}
                            className="field"
                            label="LastName"
                            variant="outlined"
                            size="medium"
                            fullWidth
                          />
                      </div>
                      <div className="col-2">
                          <TextField
                             name="Participation"
                             value={personname.Participation || ""}
                             onChange={HandleChange}
                            className="field"
                            label="Participation"
                            variant="outlined"
                            size="medium"
                            fullWidth
                          />
                      </div>
                      <div className="col-1">
                          <Button
                          type="submit"
                            label="LastName"
                            variant="outlined"
                            size="large"
                          >SEND</Button>
                      </div>
                </div>
              </form>
            </div>
        </header>
            <div className="container">
              <section>
                  <div className="Info">
                    <h1>DATA</h1>
                    <p>Display the Participation names and percentage in PieChart</p>
                      <div className="Ta_ch">
                          <div className="table_cvr">
                              <div className="tble" style={{display:'grid', gridTemplateRows:'auto,1fr',marginTop:'0px' }}>
                                <TableContainer component={Paper} layout='fixed' style={{height:'100%'}}>
                                    <Table aria-label="simple table" sx={{tableLayout:'fixed', height:'100%', width:'100%'}}>
                                        <TableHead>
                                            <TableRow sx={{border:'2px solid'}}>
                                                    <TableCell align='center' sx={{minWidth:"20px" ,width:'40px', wordBreak:'break-word', borderRight:'2px solid'}}></TableCell>
                                                    <TableCell align="center" sx={{minWidth:"100px",wordBreak:'break-word', borderRight:'2px solid'}}>FirstName</TableCell>
                                                    <TableCell align='center' sx={{minWidth:"100px",wordBreak:'break-word', borderRight:'2px solid'}}>LastName</TableCell>
                                                    <TableCell align='center' sx={{minWidth:"100px",wordBreak:'break-word', borderRight:'2px solid'}}>Participation</TableCell>
                                                    <TableCell align='center' sx={{minWidth:"100px",wordBreak:'break-word', borderRight:'2px solid'}}>DATA</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          {
                                            tableData.map((person,index)=>( 
                                              <TableRow key={index+1}  sx={{border:'2px solid'}}>
                                                    <TableCell align='center' sx={{minWidth:"20px",width:'40px', borderRight:'2px solid'}}>{index+1}</TableCell>
                                                    <TableCell align='center' sx={{borderRight:'2px solid', minWidth:"100px", wordBreak:'break-word'}}>{person.firstName}</TableCell>
                                                    <TableCell align='center' sx={{borderRight:'2px solid', minWidth:"100px", wordBreak:'break-word'}}>{person.lastName}</TableCell>
                                                    <TableCell align='left'   sx={{borderRight:'2px solid', minWidth:"100px"}}>{person.participation}</TableCell>
                                                    <TableCell align='center' sx={{borderRight:'2px solid', minWidth:"100px", wordBreak:'break-word'}}><Button variant='contained' onClick={()=>{HandleDletpage()}}>READ</Button></TableCell>
                                              </TableRow>
                                            )) 
                                          }
                                        </TableBody>
                                    </Table>
                                </TableContainer> 
                              </div>
                          </div>
                              <div className="pie_chrt">
                                
                                  <div style={{width:'100%', height:500}}>
                                  <ResponsiveContainer >
                                      <PieChart>
                                        <Pie
                                        data={chartData}
                                        cx='50%'
                                        cy='35%'
                                        outerRadius={120}
                                        innerRadius={50}
                                        dataKey='value'
                                        >
                                          {
                                            chartData.map((entry,index)=>(
                                              <Cell key={entry.name} fill={COLORS[index%COLORS.length]}></Cell>
                                            ))
                                          }
                                        </Pie>
                                        <Tooltip/>
                                        <Legend
                                        layout="vertical" 
                                        align="right" 
                                        verticalAlign="first" 
                                        iconType="square" 
                                        iconSize={17} 
                                        />
                                      </PieChart>
                                  </ResponsiveContainer>
                                  </div>

                              </div>
                      </div>
                  </div>
              </section>
            </div>
    </div>
  </>)
}
export default Chart;