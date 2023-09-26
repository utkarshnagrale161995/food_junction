import React, {useState} from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import image2 from './assets/image2.jpg'

const ViewBooking = (props) => { 
const navigate=useNavigate()

const myStyle={
      backgroundImage: `url(${image2})` ,
      height:'100vh',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
  };

const [state, setState] = useState({
        bookingId: "",  
        bookingData: null,  
        infoMessage:"",
  }); 

const [messages] = useState({  
         INFO: "The booking has been deleted! Please refresh the page.",
  });

const onChange =(event) => {
    event.preventDefault();
      setState({...state,bookingId:event.target.value})
  };


const handleAction = (action) => {

      if (action === "onDelete") {
            axios.delete("https://foodjunction-data.onrender.com/bookings/"+state.bookingId)
            .then(()=>{
                     setState({...state,infoMessage:messages.INFO,bookingData:null})
                })
            .catch(()=>{
                     setState({...state,infoMessage:"Reservation for booking id: " +
                                    state.bookingId + " is not found!"})
                })
         } 
      else if  (action === "isUpdate") {
        console.log("in update loop")
        navigate("/updatebooking/"+state.bookingId)
       }
};

const onSubmit= (event)=>{
    event.preventDefault();
    setState({...state,infoMessage:""})
    axios.get("https://foodjunction-data.onrender.com/bookings/"+state.bookingId)
    .then((response)=>{
      console.log(response.data);
       setState({...state,bookingData:response.data,infoMessage:""})
      })
    .catch(()=>{
       setState({...state,infoMessage:"Reservation for booking id: "+state.bookingId+"  is not found!"})
      })
};

return (
           <div className="row" style={myStyle}>
              <div className="col-md-10 offset-md-1 mt-5">
               <br />
              <div className="card"> 
                 <div className="card-header bg-custom">
                     <h4>View Booking</h4>
                  </div>
              <div className="card-body view">
                    <form
                        className="form"
                        onSubmit={(event)=>{onSubmit(event)}} 
                     >

                          <div className="form-group"> 
                             <label>Booking Id</label>
                             <input type="text"
                                    name="bookingId"
                                    className="form-control" 
                                    placeholder="Enter a booking id"
                                    value={state.bookingId}
                                    onChange={(event)=>{onChange(event)}}
                             />
                             <button name="button" type="submit" className="btn btn-primary mt-2">
                                     Get Booking
                             </button>

                       {
                       (state.bookingData!=null) ?
                       <div>
                              <table className="table bordered"> 
                                   <thead className="thead">
                                         <tr>
                                            <th>Booking Id</th> 
                                            <th>Buffet Name</th>
                                            <th>Email Id</th>
                                            <th>Plate Count</th>
                                            <th>Booking Date</th>
                                            <th>Action Items</th>
                                          </tr>
                                    </thead>

                                    <tbody>
                                          <tr>
                                             <td>{state.bookingData.id}</td> 
                                             <td>{state.bookingData.buffetName}</td>
                                             <td>{state.bookingData.emailId}</td> 
                                             <td>{state.bookingData.plateCount}</td>
                                             <td>{state.bookingData.bookedOn}</td>
                                            <td>
                                                  <button 
                                                       className="btn btn-danger mt-2 ms-2"
                                                       onClick={() => {handleAction("onDelete")}}
                                                  >
                                                  Delete 
                                                  </button >
                                                  <button
                                                      className="btn btn-success mt-2 ms-2" 
                                                      data-testid= "update-button"
                                                      onClick={() => {handleAction("isUpdate")}}
                                                  >
                                                  update 
                                                  </button>
                                            </td> 
                                        </tr>
                                  </tbody>
                           </table> 
                </div> : null}
                { (state.infoMessage!=="") ?<p className="text-info mt-2">{state.infoMessage}</p>:null }
                                                  
                </div> 
          </form>
        </div> 
     </div>
  </div> 
</div>
);
};
export default ViewBooking;
