import React, { createContext, use, useContext, useState } from 'react';
import axios from 'axios';
export const MyContext = createContext();
function ContexProvider([children]) { 
const [movies, setMovies] = useState([]);
const [users, setUsers] = useState([]);
const [bookings, setBookings] = useState([]);

useEffect(() => {
    const fetchData = async () => {
        const getDataMovies = await axios.get('http://localhost:9999/movies')
        const getDataUsers = await axios.get('http://localhost:9999/users')
        const getDataBookings = await axios.get('http://localhost:9999/bookings')
        setMovies(getDataMovies.data);
        setUsers(getDataUsers.data);
        setBookings(getDataBookings.data);

    }
    fetchData();
}, []);

const data = {
    movies,
    setMovies,
    users,
    setUsers,
    bookings,
    setBookings
}
return(
    <MyContext.Provider value={data}>
        {children}
    </MyContext.Provider>
)
}
export default ContexProvider;