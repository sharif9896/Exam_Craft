import React, { createContext, useContext, useState, useEffect } from 'react';
// import { BACKEND_URL } from '../utils/utils';
import axios from 'axios';
// import Cookies from 'js-cookie';
import Cookies from 'js-cookies'
import { Toaster } from 'react-hot-toast';
import { BACKEND_URL } from '../utils/utils';
import { ToastContainer } from 'react-toastify';
// import { io } from "socket.io-client"; 

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [department, setdepartment] = useState([])
    const [theme, setTheme] = useState('light');
    const [IsAuth, setIsAuth] = useState(false);
    const [loading1, setloading1] = useState(true);
    const [chats, setchats] = useState([]);
    const [users, setUsers] = useState([]);
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]); 
    const [ staffs, setStaffs ] = useState([]);

    async function fetchDepartments() {
        try {
            const token = Cookies.getItem("token");
            if (!token) {
                setloading1(false);
                return;
            }
            const { data } = await axios.get(`${BACKEND_URL}/api/departments/getdepartments`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setdepartment(data.data);
            setIsAuth(true);
        } catch (e) {
            console.error("Fetch user error:", e);
        } finally {
            setloading1(false);
        }
    }

    async function fetchStaffs() {
        try {
            const token = Cookies.getItem("token");
            if (!token) {
                setloading1(false);
                return;
            }
            const { data } = await axios.get(`${BACKEND_URL}/api/staff/getstaffs`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(data.staff);
            setStaffs(data.staff);
            setIsAuth(true);
        } catch (e) {
            console.error("Fetch users error:", e);
        } finally {
            setloading1(false);
        }
    }

    // Renamed to camelCase: fetchChats
    async function fetchChats() {
      try {
            const token = Cookies.get("token");
            if (!token) {
                setloading1(false);
                return;
            }
            const { data } = await axios.get(`${BACKEND_URL}/api/chats/all`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setchats(data.chats);
            setIsAuth(true);
        } catch (e) {
            console.error("Fetch chats error:", e);
        } finally {
            setloading1(false);
        }
    }

    useEffect(() => {
        fetchDepartments();
        fetchStaffs();
    }, []);

   
    const contextValue = {
        department,
        setdepartment,
        staffs,
        setStaffs,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children }
            <ToastContainer />
        </AppContext.Provider>
    );
};

export default AppProvider;

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};