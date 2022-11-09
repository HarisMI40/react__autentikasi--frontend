import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Users = () => {
    const [users, setUsers] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setUsers(response.data.users);
            } catch (err) {
                console.log("users.js error ");
                console.error(err);
                // navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort(); // untuk membatalkan fetching data
        }
    }, [])
    return (
        <article>
            <h2>Users List</h2>
            {users?.length
                ? (
                    <ul>
                        {users.map((user, i) => <li key={i}>{user?.username}</li>)}
                    </ul>
                ) : <p>No users to display</p>
            }
        </article>
    );
};

export default Users;