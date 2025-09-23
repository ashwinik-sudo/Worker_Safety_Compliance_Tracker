// import React from "react";
// import { useNavigate } from "react-router-dom";
// // If you were using a library like react-icons, you'd import them here:
// import { FaUserCog, FaHardHat, FaClipboardList } from
//     'react-icons/fa'; // Example
 
// const Landing = () => {
//     const navigate = useNavigate();
 
//     const handleNavigate = (role) => {
//         navigate("/login", { state: { role } });
//     };
 
//     const roles = [
//         {
//             name: "Admin",
//             description: "Full control & management",
//             icon: "⚙️", // Placeholder for Admin icon
//             // In a real app, you'd use <FaUserCog className="text-teal-600 text-4xl mb-3" />
//             // or an SVG component
//         },
//         {
//             name: "Worker",
//             description: "Task execution & reports",
//             icon: "🛠️", // Placeholder for Worker icon
//             // In a real app, you'd use <FaHardHat className="text-orange-500 text-4xl mb-3" />
//         },
//         {
//             name: "Supervisor",
//             description: "Team oversight & planning",
//             icon: "📋", // Placeholder for Supervisor icon
//             // In a real app, you'd use <FaClipboardList className="text-purple-600 text-4xl mb-3" />
//         },
//     ];
 
//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen
//                     bg-gradient-to-br from-teal-50 to-amber-50
// animate-gradient-xy">
//             <h1 className="text-5xl font-extrabold text-gray-800 mb-16
// drop-shadow-md tracking-tight">
//                 Welcome! Choose your role
//             </h1>
//             <div className="flex flex-wrap justify-center gap-10 max-w-5xl">
//                 {roles.map((role) => (
//                     <button
//                         key={role.name}
//                         onClick={() => handleNavigate(role.name)}
//                         className="flex flex-col items-center justify-center p-8 w-64 h-72
//                        bg-white rounded-3xl shadow-xl hover:shadow-2xl
//                        transform hover:scale-105 transition-all
// duration-300 ease-in-out
//                        ring-2 ring-transparent hover:ring-blue-300
// focus:outline-none focus:ring-blue-400
//                        group relative overflow-hidden"
//                     >
//                         {/* Optional subtle background animation on hover */}
//                         <span className="absolute inset-0 bg-gradient-to-br
// from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100
// transition-opacity duration-300 rounded-3xl"></span>
 
//                         <div className="relative z-10 flex flex-col items-center">
//                             {/* Icon Placeholder - Replace with actual icon component */}
//                             <span className="text-5xl mb-4 group-hover:animate-bounce-y">
//                                 {role.icon}
//                             </span>
//                             {/* {
//               {role.name === "Admin" && <FaUserCog
// className="text-teal-600 text-5xl mb-4" />}
//               {role.name === "Worker" && <FaHardHat
// className="text-orange-500 text-5xl mb-4" />}
//               {role.name === "Supervisor" && <FaClipboardList
// className="text-purple-600 text-5xl mb-4" />}
//               } */}
 
//                             <h2 className="text-3xl font-bold text-gray-800 mb-2 mt-2">
//                                 {role.name}
//                             </h2>
//                             <p className="text-lg text-gray-600 text-center px-2">
//                                 {role.description}
//                             </p>
//                         </div>
//                     </button>
//                 ))}
//             </div>
//         </div>
//     );
// };
 
// export default Landing;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCog, FaHardHat, FaClipboardList } from 'react-icons/fa';

const Landing = () => {
    const navigate = useNavigate();

    const safetyQuotes = [
        "Safety is not just a slogan, it's a way of life.",
        "Protect yourself—your family needs you.",
        "A spill, a slip, a hospital trip.",
        "Safety starts with awareness.",
        "Think safe, work safe, be safe.",
        "Your safety is everyone's responsibility.",
        "Stop accidents before they stop you.",
        "Better to be safe than sorry.",
        "Safety doesn’t happen by accident.",
        "Work safely today for a better tomorrow."
    ];

    const [quoteIndex, setQuoteIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setQuoteIndex((prevIndex) => (prevIndex + 1) % safetyQuotes.length);
        }, 3000); // Change quote every second

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    const handleNavigate = (role) => {
        navigate("/login", { state: { role } });
    };

    const roles = [
        { name: "Admin", description: "Full control & management", icon: "⚙️" },
        { name: "Worker", description: "Task execution & reports", icon: "🛠️" },
        { name: "Supervisor", description: "Team oversight & planning", icon: "📋" },
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-50 to-amber-50 animate-gradient-xy">
            <p className="text-xl text-gray-700 italic mb-4 transition-opacity duration-500 ease-in-out">
                {safetyQuotes[quoteIndex]}
            </p>
            <h1 className="text-5xl font-extrabold text-gray-800 mb-16 drop-shadow-md tracking-tight">
                Welcome! Choose your role
            </h1>
            <div className="flex flex-wrap justify-center gap-10 max-w-5xl">
                {roles.map((role) => (
                    <button
                        key={role.name}
                        onClick={() => handleNavigate(role.name)}
                        className="flex flex-col items-center justify-center p-8 w-64 h-72 bg-white rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out ring-2 ring-transparent hover:ring-blue-300 focus:outline-none focus:ring-blue-400 group relative overflow-hidden"
                    >
                        <span className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></span>
                        <div className="relative z-10 flex flex-col items-center">
                            <span className="text-5xl mb-4 group-hover:animate-bounce-y">
                                {role.icon}
                            </span>
                            <h2 className="text-3xl font-bold text-gray-800 mb-2 mt-2">
                                {role.name}
                            </h2>
                            <p className="text-lg text-gray-600 text-center px-2">
                                {role.description}
                            </p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Landing;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaUserCog, FaHardHat, FaClipboardList } from 'react-icons/fa';

// const Landing = () => {
//     const navigate = useNavigate();

//     const safetyQuotes = [
//         "🛡️ Safety is not just a slogan, it's a way of life.",
//         "👨‍👩‍👧‍👦 Protect yourself—your family needs you.",
//         "⚠️ A spill, a slip, a hospital trip.",
//         "🧠 Safety starts with awareness.",
//         "✅ Think safe, work safe, be safe.",
//         "🤝 Your safety is everyone's responsibility.",
//         "⛔ Stop accidents before they stop you.",
//         "💡 Better to be safe than sorry.",
//         "🚫 Safety doesn’t happen by accident.",
//         "🌟 Work safely today for a better tomorrow."
//     ];

//     const [quoteIndex, setQuoteIndex] = useState(0);
//     const [fade, setFade] = useState(true);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setFade(false);
//             setTimeout(() => {
//                 setQuoteIndex((prevIndex) => (prevIndex + 1) % safetyQuotes.length);
//                 setFade(true);
//             }, 300);
//         }, 3000); // Change quote every 3 seconds

//         return () => clearInterval(interval);
//     }, []);

//     const handleNavigate = (role) => {
//         navigate("/login", { state: { role } });
//     };

//     const roles = [
//         { name: "Admin", description: "Full control & management", icon: <FaUserCog className="text-teal-600 text-5xl mb-4" /> },
//         { name: "Worker", description: "Task execution & reports", icon: <FaHardHat className="text-orange-500 text-5xl mb-4" /> },
//         { name: "Supervisor", description: "Team oversight & planning", icon: <FaClipboardList className="text-purple-600 text-5xl mb-4" /> },
//     ];

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-100 via-yellow-50 to-amber-100 animate-gradient-xy px-4">
//             <p className={`text-xl text-gray-700 italic mb-6 transition-opacity duration-500 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'}`}>
//                 {safetyQuotes[quoteIndex]}
//             </p>
//             <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-purple-500 to-orange-400 mb-16 drop-shadow-lg tracking-tight text-center">
//                 Welcome! Choose your role
//             </h1>
//             <div className="flex flex-wrap justify-center gap-10 max-w-6xl">
//                 {roles.map((role) => (
//                     <button
//                         key={role.name}
//                         onClick={() => handleNavigate(role.name)}
//                         className="flex flex-col items-center justify-center p-8 w-72 h-80 bg-white/60 backdrop-blur-md rounded-3xl shadow-2xl hover:shadow-amber-300 transform hover:scale-105 transition-all duration-300 ease-in-out ring-2 ring-transparent hover:ring-teal-400 focus:outline-none focus:ring-purple-500 group relative overflow-hidden"
//                     >
//                         <span className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl blur-sm"></span>
//                         <div className="relative z-10 flex flex-col items-center">
//                             {role.icon}
//                             <h2 className="text-3xl font-bold text-gray-800 mb-2 mt-2">
//                                 {role.name}
//                             </h2>
//                             <p className="text-lg text-gray-600 text-center px-2">
//                                 {role.description}
//                             </p>
//                         </div>
//                     </button>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Landing;
