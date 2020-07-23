import React, { useState, useEffect, useMemo } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';

// Fazer aparecer os cadastros

import './styles.css';

function Dashboard(){

    const [spots, setSpots] = useState([]);
    const [requests, setRequests] = useState([]);

    const user_id = localStorage.getItem('user');
    const socket = useMemo(() => socketio('http://localhost:3333', {
        query: {user_id},
    }), [user_id]);

    useEffect(() => { // useEffect da Aula 5        
        
        socket.on('booking_request', data => {
            setRequests([...requests, data]);
        });

    }, [requests, socket]);


    // Primeiro parâmetro é uma função (arrow é bonitinha)
    // Segundo parâmetro é um array de dependências
    // ou seja, o useEffect depende da(s) variável(veis) desse array para ser alterado
    // Quando esse array está vazio ele (useEffect) é acionado uma única vez assim q o componente é renderizado
    useEffect(() => {
        async function loadSpots(){
            
            const user_id = localStorage.getItem('user');
            
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });
            setSpots(response.data);
        }

        loadSpots();

    }, []);

    async function handleAccept(id){
        await api.post(`/bookings/${id}/approvals`);

        setRequests(requests.filter(request => request._id !== id));
    }

    async function handleReject(id){
        await api.post(`/bookings/${id}/rejections`);

        setRequests(requests.filter(request => request._id !== id));
    }
    
    return (
        <>

            <ul className="notifications">
                {requests.map(request => (
                    <li key={request._id}>
                        <p><strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para a data:  <strong>{request.date}</strong> </p>
                        <button onClick={() => handleAccept(request._id)} className="accept">ACEITAR</button>
                        <button onClick={() => handleReject(request._id)} className="reject">REJEITAR</button>
                    </li>
                ))}
            </ul>

            <ul className="spot-list">
                {spots.map(spot => (
                        <li key={spot._id} >
                            <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                            <strong>{spot.company}</strong>
                            <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
                        </li>
                    ))}
            </ul>

            <Link to="/new">
                <button className="btn">Cadastrar novo spot</button>
                
            </Link>

        </>
    )
}

export default Dashboard;