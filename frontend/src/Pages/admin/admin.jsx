import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Admin = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);


    useEffect(() => {
        if (!(user.account_type == "admin")) {
            console.log("You are not authorized to view this page");
            navigate("/");
        }
    }, [user]);
    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
            <div className="grid gap-8">
                <div 
                    className="bg-blue-100 p-6 rounded-lg shadow-lg cursor-pointer transform transition-transform hover:scale-105 active:scale-95"
                    onClick={() => handleNavigation('/signup')}
                >
                    <h2 className="text-2xl font-semibold mb-4">Add New User</h2>
                    <p className="text-gray-600 font-bold">Create a new user account</p>
                </div>
                <div 
                    className="bg-red-100 p-6 rounded-lg shadow-lg cursor-pointer transform transition-transform hover:scale-105 active:scale-95"
                    onClick={() => handleNavigation('listuser')}
                >
                    <h2 className="text-2xl font-semibold mb-4">All Users & Sellers</h2>
                    <p className="text-gray-600 font-bold">List of All Users & Sellers Account</p>
                </div>
            </div>
        </div>
    );
};

export default Admin;
