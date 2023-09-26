import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

//let url="http://localhost:4050/bookings/";
const UpdateBooking = () => { 
let params = useParams();

let [booking, setBooking]= useState({});

let [buffetName, setBuffetName] = useState(""); 
let [emailId, setEmailId]= useState("");
let [plateCount, setPlateCount] = useState("");
let [bookedOn, setBookedOn] = useState("");
 
let [success, setSuccess] = useState("");

let [errMsg, setErrMsg]= useState("");

 const [messages]= useState({
ERROR: "Something went wrong", 
MANDATORY: "ALL the fields are mandatory",
});


  useEffect(()=>{
       axios.get("https://foodjunction-data.onrender.com/bookings/"+params.id)
       .then((response)=>{
        console.log("in")
          setBooking(response.data)
          setBuffetName(response.data.buffetName)
          setEmailId(response.data.emailId)
          setBookedOn(response.data.bookedOn)
          setPlateCount(response.data.plateCount)        
       })
       .catch((error)=>{ 
        console.log(error)
          setErrMsg(messages.ERROR)       
       })
    },[])

const update= (event) => { 
   event.preventDefault();
   let newBooking = {
   buffetName: buffetName,
   emailId: emailId,
   plateCount: plateCount,
   bookedOn: bookedOn,
   id: booking.id,
    };


if(buffetName!=="" &&  emailId!=="" && plateCount!==""){
    axios.put("https://foodjunction-data.onrender.com/bookings/"+booking.id,newBooking)
    .then((response)=>{
        console.log("in");
        setSuccess("Booking has been updated: "+response.data.id);
    })
    .catch((error)=>{
        console.log(error);
        setErrMsg(messages.ERROR)
    })
}
else{
    setErrMsg(messages.MANDATORY)
}
};
return(
<React.Fragment> 
          <div className="row">
            <div className="col-md-10 offset-md-1"> 
               <div className="card">
                   <div className="card-header bg-custom">
                         <h4>Update Booking Id: {params.id} </h4>
                   </div>
               <div className="card-body">
                <form 
                    onSubmit={(event)=> {update(event)}} 
                >

            <label>Buffet Name</label>
                <select
                   name="buffetName"
                   className="form-control" 
                   value={buffetName}
                   placeholder={buffetName}
                   onChange={(event)=>setBuffetName(event.target.value)}
                >
                       <option value="" disabled>
                          Select a buffet 
                        </option>
                       <option value="SouthIndianFestivalSpecial"> 
                           South Indian Festival Special
                       </option>
                       <option value="NorthIndianFestivalSpecial"> 
                             North Indian Festival Special
                       </option>
                       <option value="ChineseSpecial">
                             Chinese Special
                        </option>
                </select>
               <label>Email Id</label>
               <input 
                  type="email"
                  name="emailId"
                  className="form-control"
                  placeholder={emailId}
                  onChange={(event)=>setEmailId(event.target.value)}
              />
             <label>Plate Count</label>
             <input
                 type="number"
                 name="plateCount"
                 className="form-control" 
                 Placeholder={plateCount}
                 onChange={(event)=>setPlateCount(event.target.value)}
             />
            <button
              type="submit"
               name="active"
                  className="btn btn-primary at-2"
            >
                  Update Buffet 
            </button>

           {(success!=="") ? <p className="text-success">{success}</p> : <p className="text-danger">{errMsg}</p>}

</form>
</div> 
</div>
</div>
</div>
 </React.Fragment>
);
};
export default UpdateBooking;
