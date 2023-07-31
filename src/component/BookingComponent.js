import React,{ useState } from 'react';
import { validation } from './validation';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import image1 from './assets/image1.jpg'

       const BookingComponent = (props) => {

        const myStyle={
            backgroundImage: `url(${image1})` ,
            height:'100vh',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        };

        const [state, setState] = useState({
         buffetName:"",
         bookedOn:"",
         emailId:"",
         plateCount:0,
         })
         
         const [formErrors, setFormErrors] = useState({
           emailIdError: " ", 
           plateCountError:" ",
           buffetNameError: " ",
           bookedOnError:" ",
          });
          

         const [mandatory, setMandatory] = useState(false);
          
         const [successMessage, setSuccessMessage] = useState("");
    
        const [errorMessage, setErrorMessage] = useState("");
        
        const [valid,setValid]=useState(false)
         
        const [messages] = useState({
           EMAILID_ERROR: "Please enter valid email",
           PLATE_COUNT_ERROR: "Plate count(s) should be 1 or more", 
           BUFFET_NAME_ERROR: "Please select buffet type",
           BOOKED_ON_ERROR: "Booking date should be after today's date", 
           ERROR: "Something went wrong",
           MANDATORY: "Enter all the form fields"
           })

        const handleSubmit =(event)=> {
        event.preventDefault();
        if (state.bookedOn==="" && state.buffetName==="" && state.emailId==="" && state.plateCount<1){ 
             setMandatory(true)
              }
        else{
              setMandatory(false)
              axios.post("http://localhost:4050/bookings",state)
              .then((response)=>{
              setSuccessMessage(`Booking is successfully created with bookingId: ${response.data.id}`)
              })
             .catch(()=>{setErrorMessage(messages.ERROR)})
            }
        }

        const handleChange = (event) => {
         event.preventDefault();
        setState({...state,[event.target.name]:event.target.value})
        validateField(event.target.name, event.target.value)
        }


         const validateField =(name, value) =>{
         
                  let errors = formErrors;
                  switch (name){
        
                    case "buffetName":
                            if(validation.validateBuffet(value)){
                               errors.buffetNameError="";
                              }
                            else{
                                errors.buffetNameError=messages.BUFFET_NAME_ERROR;
                              }
                            break;

                     case "emailId":
                            if(validation.validateEmail(value)){
                                errors.emailIdError="";
                              }
                            else{
                                errors.emailIdError=messages.EMAILID_ERROR;
                                }
                             break;
            
                       case "plateCount":
                            if(validation.validPlatecount(value)){
                             errors.plateCountError="";
                            }
                            else{
                              errors.plateCountError=messages.PLATE_COUNT_ERROR;
                             }
                            break;
            
                        case "bookedOn":
                             if(validation.validDate(value)){
                             errors.bookedOnError="";
                            }
                           else{
                             errors.bookedOnError=messages.BOOKED_ON_ERROR;
                            }
                           break;
            
                        default: 
                        break;
                     }
       setFormErrors(errors)
  
       let value1 = Object.values(errors).every((value)=> {return value===""})
       //console.lg(Object.values(formErrors))
       //console.log(value1)
       if(value1)
            {
               setValid(true);
            }
            else{
                setValid(false);
            }
      }
         return (
      <React.Fragment>
          <div className="CreateBooking " style={myStyle}>
                  <div className="row"> 
                     <div className="col-md-6 offset-md-3 mt-5">
                      <br />
                        <div className="card opacity-75" >
                            <div className="card-header bg-custom">
                             <h4>Book Your Buffet</h4>
                             </div> 
                            <div className="card-body">
                              <form className="form"  noValidate 
                                    onSubmit={(event)=>{handleSubmit(event)}}>

                                 <div className="form-group">
                                     <label style={{fontWeight:"bold"}}>Buffet Name</label>
                                     <select name="buffetName" 
                                             className="form-control" value={state.buffetName} 
                                             onChange={(event)=>handleChange(event)}
                                                style={{fontWeight:"bold"}}>
                                           <option value=" "disabled>Select a buffet</option>
                                           <option value="SouthIndianFestivalSpecial">South Indian Festival Special</option>
                                           <option value='NorthIndianFestivalSpecial'>North Indian Festival Special</option>
                                           <option value='ChineseSpecial'>Chinese Special</option> 
                                    </select>

                                         { (formErrors.buffetNameError!=="")?
                                         <span className="text-danger">{formErrors.buffetNameError}</span>:null} 
                                         
                                </div> 
                                <div className="form-group">
                                     <label style={{fontWeight:"bold"}}>Email Id</label>
                                     <input type="email" 
                                            name="emailId"
                                            className="form-control" 
                                            placeholder="Enter your email"
                                            value={state.emailId} required 
                                            onChange={(event)=>handleChange(event)}
                                            style={{fontWeight:"bold"}}
                                    /> 
                                      {(formErrors.emailIdError!=="")?<span className="text-danger">{formErrors.emailIdError}</span>:null}
                                </div>
                           <div className="form-group">
                                  <label style={{fontWeight:"bold"}}>Plate Count</label> 
                                  <input type="number" 
                                         name="plateCount"
                                         className="form-control" 
                                         placeholder="Number of plates" 
                                         value={state.plateCount} 
                                         required
                                         onChange={(event)=>handleChange(event)}
                                         style={{fontWeight:"bold"}}
                                         /> 
                                        {(formErrors.plateCountError!=="")?<span className="text-danger">{formErrors.plateCountError}</span>:null}
                           </div>
                           <div className="form-group">
                               <label style={{fontWeight:"bold"}}>Booking Date</label>
                               <input type="date" 
                                      name="bookedOn" 
                                      className="form-control"
                                      value={state.bookedOn}
                                      required
                                      onChange={(event)=>handleChange(event)}
                                      style={{fontWeight:"bold"}} 
                                      /> 
                              {(formErrors.bookedOnError!=="")?<span className="text-danger">{formErrors.bookedOnError}</span>:null}
                          </div>
                          <br />

                         <button type="submit" name="active" className="btn btn-primary" style={{fontWeight:"bold"}}
                         disabled={!valid}
                          >Book Buffet</button>
                        
                          { (mandatory===true) ? <div className="text-danger">{messages.MANDATORY}</div> : null}
                          { (errorMessage!=="") ? <div className="text-danger">{errorMessage}</div> : null}
                          {(successMessage!=="")?<div className="text-success">{successMessage}</div> : null }
               </form>
             </div>
           </div>
        </div>
     </div>
</div> 
</React.Fragment>
);
}
export default BookingComponent;
