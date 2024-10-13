import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <div className="bg-white shadow-md rounded-lg p-6 mt-10 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Profile</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Name:</label>
                    <p className="text-gray-900">{user.username}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <p className="text-gray-900">{user.email}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Type:</label>
                    <p className="text-gray-900">{user.is_Admin ? 'Admin' : 'User'}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;