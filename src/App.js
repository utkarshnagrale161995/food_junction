import React from "react";
import { BrowserRouter, Link, Routes, Route} from "react-router-dom"; 
import BookingComponent from "./component/BookingComponent";
import ViewBooking from "./component/ViewBooking";
import UpdateBooking from "./component/UpdateBooking";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
return ( 
  <div>
<BrowserRouter>
   
      <nav  
      className="navbar navbar-expand-lg p-2 navbar-dark bg-primary">
            <span className="navbar-brand">Food Junction</span>

           <ul className="navbar-nav">
                 <li className="nav-item"> 
                          <Link className="nav-link" data-testid="bookBuffet-link" to="/bookBuffet">
                                     Book Buffet
                           </Link> 
                  </li>

                 <li className="nav-item"> 
                         <Link className="nav-link" data-testid="viewBookings-link" to="/viewBookings">
                                View Bookings 
                          </Link>
                  </li>
            </ul>
      </nav>
           <Routes>
                 <Route path="/" element={<BookingComponent />}/>
                 <Route path="/bookBuffet" element={<BookingComponent />}/>
                 <Route path="/viewBookings" element={<ViewBooking />}/>
                 <Route path="/updateBooking/:id" element={<UpdateBooking />}/>
            </Routes> 
    </BrowserRouter>
</div>
);
};
export default App;
