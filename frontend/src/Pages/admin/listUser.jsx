import { loadAllUser } from "../../Redux/features/adminReducer"; 
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ListUser = () => {
    const dispatch = useDispatch();
    const [allUser, setAllUser] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserList = async () => {
            const userList = await dispatch(loadAllUser());
            setAllUser(userList.payload.payload);
            console.log("All User", userList.payload.payload);
        };
        
        fetchUserList();
    }, [dispatch]);

    const handleDelete = async (userId) => {
        // if (window.confirm("Are you sure you want to delete this user?")) {
        //     await dispatch(deleteUser(userId));
        //     setAllUser((prev) => prev.filter((user) => user._id !== userId));
        // }
    };

    return (
        <div className=" min-h-screen bg-gray-50 p-8">
                            <div 
                    className="mx-auto w-2/5 bg-blue-100 p-6 rounded-lg shadow-lg cursor-pointer transform transition-transform hover:scale-105 active:scale-95 my-8"
                    onClick={() => navigate('/signup')}
                >
                    <h2 className="text-2xl font-semibold mb-4">Add New User</h2>
                    <p className="text-gray-600 font-bold">Create a new user account</p>
                </div>
            <h1 className="mx-auto text-3xl font-bold mb-6 text-blue-700 text-center">All Users</h1>
            <div className=" mx-auto w-5/6 shadow-lg rounded-lg border border-gray-300 bg-white">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-blue-600 text-white uppercase text-sm leading-normal">
                            <th className="font-bold py-3 px-6 text-left">Username</th>
                            <th className="font-bold py-3 px-6 text-left">Email</th>
                            <th className="font-bold py-3 px-6 text-left">Contact Number</th>
                            <th className="font-bold py-3 px-6 text-left">Account Type</th>
                            <th className="font-bold py-3 px-6 text-left">Is Seller?</th>
                            <th className="font-bold py-3 px-6 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {allUser.map((user) => (
                            <tr 
                                key={user._id} 
                                className="border-b border-gray-200 hover:bg-blue-100 transition duration-200 transform hover:scale-105"
                            >
                                <td className="font-bold py-4 px-6">{user.username}</td>
                                <td className="font-bold py-4 px-6">{user.email}</td>
                                <td className="font-bold py-4 px-6">{user.contact_number}</td>
                                <td className="font-bold py-4 px-6">{user.account_type}</td>
                                <td className="font-bold py-4 px-6">{`${user.isSeller}`}</td>
                                <td className="font-bold py-4 px-6">
                                    <button 
                                        onClick={() => handleDelete(user._id)} 
                                        className="font-bold text-red-600 hover:text-red-800 transition duration-150 rounded-lg px-2 py-1 border border-red-600 hover:bg-red-100"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListUser;
