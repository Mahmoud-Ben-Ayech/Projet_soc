import React, { useState, useEffect } from 'react';
import axios from 'axios';

import "../styles/bookings.css";
import CarItem from "../components/UI/CarItem.jsx";

function App() {
  const [bookingCars, setBookingCars] = useState([]);

  useEffect(() => {
    sendSOAPRequest();
  }, []);

  const sendSOAPRequest = () => {
    const soapRequest = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns="http://example.com/events">
        <soapenv:Header/>
        <soapenv:Body>
          <ns:GetAllEvents/>
        </soapenv:Body>
      </soapenv:Envelope>
    `;

    axios.post('http://localhost:5000/soap/events', soapRequest, {
      headers: {
        'Content-Type': 'text/xml',
      }
    })
    .then(response => {
      const data = parseSOAPResponse(response.data);
      setBookingCars(data);
    })
    .catch(error => {
      console.error('SOAP Request Error:', error);
    });
  };

  const parseSOAPResponse = (soapResponse) => {
    const parsedData = [
      { _id: 1, title: 'Event 1', description: 'Description 1', date: '2023-01-01' },
      { _id: 2, title: 'Event 2', description: 'Description 2', date: '2023-02-02' },
    ];
    return parsedData;
  };

  return (
    <div className='bookings'>
      <div className='booking_wrapper'>
        <h2 className='booking_title'>News</h2>
        <div className='booking__car-list'>
          {bookingCars.slice().reverse().map((item) => (
            <CarItem item={item} key={item._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

