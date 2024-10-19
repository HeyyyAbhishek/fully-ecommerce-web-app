import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        contact_number: 1,
        password: '',
        isSeller: false,
        account_type: 'user' // Default to 'user'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("handleChange", name, value);
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        try {
            let response = await fetch("http://localhost:4000/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
                credentials: "include",
            });
            let res = await response.json();
            console.log("res");
            if (response.ok || res.ok) {
                console.log("User created successfully");
                if(account_type == "admin"){
                    navigate('/');
                }
                navigate('/admin');
            } else {
                console.log("User creation failed");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const account_type = useSelector((state) => state.user.user.account_type);
    // useNavigate('/login');

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="contact_number" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            name="contact_number"
                            id="contact_number"
                            value={formData.contact_number}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
                    >
                        Sign Up
                    </button>
                    <div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="isSeller"
                                id="isSeller"
                                checked={formData.isSeller || false}
                                onChange={(e) => setFormData({ ...formData, isSeller: e.target.checked })}
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <label htmlFor="isSeller" className="ml-2 block text-sm text-gray-900 font-bold">
                                I want to be a seller
                            </label>
                        </div>
                    </div>
                    {account_type === "admin" && (
                        <div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="account_type"
                                    id="account_type"
                                    checked={formData.account_type === 'admin'}
                                    onChange={(e) => setFormData({ ...formData, account_type: e.target.checked ? 'admin' : 'user' })}
                                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                                <label htmlFor="account_type" className="ml-2 block text-sm text-gray-900 font-bold">
                                    Hey Admin, check this if you want to make this user Admin
                                </label>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Signup;