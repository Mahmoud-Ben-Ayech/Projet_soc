import React, { useState, useEffect } from 'react';
import soapRequest from 'soap-request';
import "../styles/settings.css";

function Formulaire() {
    const [titre, setTitre] = useState('');
    const [evenement, setEvenement] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        async function fetchEvents() {
            const url = 'http://localhost:5000'; 
            const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="EventService">
                            <soapenv:Header/>
                            <soapenv:Body>
                                <web:get_all_events/>
                            </soapenv:Body>
                        </soapenv:Envelope>`;

            try {
                const { response } = await soapRequest({ url, xml, timeout: 1000 });
                const eventsResponse = response.body.events;
                setEvents(eventsResponse);
            } catch (error) {
                console.error('Error while fetching events', error);
            }
        }

        fetchEvents();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = 'http://localhost:5000'; 
        const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="EventService">
                        <soapenv:Header/>
                        <soapenv:Body>
                            <web:add_event>
                                <titre>${titre}</titre>
                                <evenement>${evenement}</evenement>
                                <date>${date}</date>
                            </web:add_event>
                        </soapenv:Body>
                    </soapenv:Envelope>`;

        try {
            const { response } = await soapRequest({ url, xml, timeout: 1000 });
            console.log(response.body);
            // Reset form fields after successful submission
            setTitre('');
            setEvenement('');
            setDate('');
        } catch (error) {
            console.error('Error while sending SOAP request', error);
        }
    };
    
    return (
      <div className="settings">
        <div className="settings__wrapper">
          <h2 className="settings__title">Add Event</h2>
          <div className="details__form">
            <p className="profile__desc">Enter the following fields</p>
            
            <form onSubmit={handleSubmit}>
            <div className="form__group">
              <div>
                <label>Title</label>
                <input
                  type="text"
                  placeholder="Title of Event"
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                />
              </div>
              <div>
                <label>Content</label>
                <input
                  type="text"
                  placeholder="Content of the event"
                  value={evenement}
                  onChange={(e) => setEvenement(e.target.value)}
                />
              </div>
            </div>
            <div className="form__group">
              <div>
                <label>Date of Event</label>
                <input
                  type="text"
                  placeholder="dd/mm/yyyy"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="profile__img-btns">
                <button type="submit" className="update__btn">
                  Add
                </button>
              </div>
            </div>
          </form>
          </div>
        </div>
      </div>
    );
}

export default Formulaire;

