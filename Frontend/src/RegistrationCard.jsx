import React, { useState } from 'react';

import axios from 'axios';

const RegistrationCard = () => {

    const [firstName, setFirstName] = useState('');

    const [lastName, setLastName] = useState('');

    const [username, setUsername] = useState('');

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [phoneNumber, setPhoneNumber] = useState('');

    const [dateOfBirth, setDateOfBirth] = useState('');

    const [errorMsg, setErrorMsg] = useState('');

    const handleRegistrationSubmit = async (e) => {

        e.preventDefault();

        setErrorMsg('');

        const newUser = {

            firstName,

            lastName,

            username,

            email,

            password,

            phoneNumber,

            dateOfBirth,

        };

        try {

            const response = await axios.post('http://localhost:5000/api/Home/register', newUser);

            if (response.status === 200) {

                alert('Registration successful!');

                window.location.href = '/login';

            } else {

                setErrorMsg('Registration failed. Please try again.');

            }

        } catch (error) {

            // Show backend error message if available

            if (error.response && error.response.data) {

                setErrorMsg(

                    typeof error.response.data === 'string'

                        ? error.response.data

                        : error.response.data.Message || 'Registration failed. Please try again.'

                );

            } else {

                setErrorMsg('An error occurred during registration. Please try again.');

            }

            console.error('Error during registration:', error);

        }

    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Register</h3>
            <form onSubmit={handleRegistrationSubmit}>
                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input

                        type="text"

                        id="firstName"

                        value={firstName}

                        onChange={(e) => setFirstName(e.target.value)}

                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"

                        required

                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input

                        type="text"

                        id="lastName"

                        value={lastName}

                        onChange={(e) => setLastName(e.target.value)}

                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"

                        required

                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Username *</label>
                    <input

                        type="text"

                        id="username"

                        value={username}

                        onChange={(e) => setUsername(e.target.value)}

                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"

                        required

                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input

                        type="email"

                        id="email"

                        value={email}

                        onChange={(e) => setEmail(e.target.value)}

                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"

                        required

                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                    <input

                        type="password"

                        id="password"

                        value={password}

                        onChange={(e) => setPassword(e.target.value)}

                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"

                        required

                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input

                        type="tel"

                        id="phoneNumber"

                        value={phoneNumber}

                        onChange={(e) => setPhoneNumber(e.target.value)}

                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"

                        required

                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                    <input

                        type="date"

                        id="dateOfBirth"

                        value={dateOfBirth}

                        onChange={(e) => setDateOfBirth(e.target.value)}

                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"

                        required

                    />
                </div>
                <button

                    type="submit"

                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >

                    Register
                </button>

                {errorMsg && (
                    <div className="mt-3 text-red-600 text-sm font-semibold text-center">

                        {errorMsg}
                    </div>

                )}
            </form>
        </div>

    );

};

export default RegistrationCard;
