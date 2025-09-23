import React, { useState, useEffect } from 'react';
import axios from 'axios';
 
import {
    MessageSquarePlus,
    HelpCircle,
    Play,
    X,
    Send,
    ChevronDown,
    ChevronUp,
    Calendar,
    Clock,
    User
} from 'lucide-react';
 
const Dashboard = () => {
    const [showComplaintModal, setShowComplaintModal] = useState(false);
    const [complaintTitle, setComplaintTitle] = useState('');
    const [complaintDescription, setComplaintDescription] = useState('');
    const [expandedFAQ, setExpandedFAQ] = useState(0);
    // const [faqs, setFaqs] = useState([]);
    const [faqData, setFaqData] = useState([]);
    const[mycomplaints,setMycomplaints]=useState([]);
    const[showmycomplaints,setShowmycomplaints]=useState(false);
 
    // useEffect(() => {
    //   fetch("http://localhost:5000/api/Home/faqs")
    //     .then((res) => res.json())
    //     .then((data) => setFaqData(data))
    // }, []);
 
    axios.get("http://localhost:5000/api/Home/faqs")
        .then((response) => {
            if (response.status === 200) {
                setFaqData(response.data);
            }
            else {
                setFaqData([]);
            }
 
        })
        .catch((error) => {
            console.error("Error fetching FAQ data:", error);
        });
 
    console.log(faqData);
 
    // Use a state to store submitted complaints for the 'My Complaints' section
    const [submittedComplaints, setSubmittedComplaints] = useState([]);
 
    // This is a placeholder for your FAQ data. In a real app, this would be fetched from an API.
    // const faqData = [
    //   {
    //     question: "How do I submit a complaint?",
    //     answer: "Click on the 'Raise a Complaint' card on your dashboard, fill in the required details including title and
    //description, then click submit. You'll receive a confirmation and
    // tracking number."
    //   },
    //   {
    //     question: "How long does it take to resolve a complaint?",
    //     answer: "Most complaints are resolved within 3-5 business
    // days. Complex issues may take up to 10 business days. You'll receive
    // regular updates on the progress."
    //   },
    //   {
    //     question: "Can I track the status of my complaint?",
    //     answer: "Yes, once you submit a complaint, you'll receive a
    // unique tracking number. You can use this number to check the status
    // anytime in your dashboard."
    //   },
    //   {
    //     question: "What information should I include in my complaint?",
    //     answer: "Please provide a clear title, detailed description
    // of the issue, any relevant dates, and supporting documents if
    // available. The more specific you are, the faster we can help."
    //   },
    //   {
    //     question: "How can I update my profile information?",
    //     answer: "Go to your profile section in the dashboard, click
    // 'Edit Profile', make your changes, and save. Some changes may require
    // verification."
    //   }
    // ];
 
    const awarenessVideos = [
        {
            id: 1,
            title: "Workplace Safety Compliance Training",
            description: "Learn the essentials of workplace safety compliance, including PPE, hazard identification, and best practices.",
            thumbnail: "https://i.ytimg.com/vi/3ibhNlrZ_bk/maxresdefault.jpg", // Actual video thumbnail
            duration: "10:12",
            youtubeUrl: "https://www.youtube.com/watch?v=3ibhNlrZ_bk&list=PL0k4Uvrgzs7kZZeB8C0-7AANFTobUC8tp"
        },
        {
            id: 2,
            title: "Personal Protective Equipment (PPE) Safety Tips",
            description: "A practical guide to using PPE correctly to stay safe at work.",
            thumbnail: "https://i.ytimg.com/vi/rGRt4UBhuwY/maxresdefault.jpg", // Actual video thumbnail
            duration: "7:45",
            youtubeUrl: "https://www.youtube.com/watch?v=rGRt4UBhuwY"
        },
        {
            id: 3,
            title: "Workplace Hazard Identification & Risk Assessment",
            description: "How to identify hazards and assess risks in your workplace for better safety.",
            thumbnail: "https://i.ytimg.com/vi/On0Pv-Ky23c/maxresdefault.jpg", // Actual video thumbnail
            duration: "9:20",
            youtubeUrl: "https://www.youtube.com/watch?v=On0Pv-Ky23c"
        },
 
        {
            id: 4,
            title: "Fire Safety & Evacuation Plans",
            description: "Fire Safety & Evacuation Plans ensure that all workers are trained to respond swiftly and safely during fire emergencies, with clear knowledge of alarm systems, escape routes, assembly points, and communication protocols to minimize risk and protect lives.",
            thumbnail: "https://i.ytimg.com/vi/wc_YwajwWPg/maxresdefault.jpg", // Updated video thumbnail
            duration: "9:20",
            youtubeUrl: "https://www.youtube.com/watch?v=wc_YwajwWPg"
        }
    ];
 
    // Logic to handle complaint submission
    const handleComplaintSubmit = (e) => {
        e.preventDefault();
        if (complaintTitle.trim() && complaintDescription.trim()) {
            const newComplaint = {
                id: Date.now(),
                title: complaintTitle,
                description: complaintDescription,
                date: new Date().toLocaleDateString(),
                status: 'Pending'
            };
            // In a real app, this would send data to a backend API
            console.log('Complaint submitted:', newComplaint);
            setSubmittedComplaints([...submittedComplaints, newComplaint]);
            alert('Complaint submitted successfully! You will receive a tracking number shortly.');
            console.log({ submittedComplaints })
            setComplaintTitle('');
            setComplaintDescription('');
            setShowComplaintModal(false);
        }
    };
 
    const toggleFAQ = (index) => {
        setExpandedFAQ(expandedFAQ === index ? null : index);
    };

    const handleMyComplaintsClick = async () => {
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      alert('User ID not found. Please log in again.');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/api/Home/mycomp/${storedUserId}`);
      setMycomplaints(response.data);
      setShowmycomplaints(true);
    } catch (error) {
      alert('Failed to fetch your complaints.');
      setMycomplaints([]);
      setShowmycomplaints(true);
    }
  };
 
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <User className="h-8 w-8 text-blue-600 mr-3" />
                            <h1 className="text-2xl font-bold text-gray-900">User
                                Dashboard</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-500">Welcome back!</span>
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex
items-center justify-center">
                                <span className="text-white text-sm font-medium">JD</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
 
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Quick Actions */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900
mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6
justify-between">
                        {/* Raise Complaint Card */}
                        <div
                            onClick={() => setShowComplaintModal(true)}
                            className="bg-white rounded-xl shadow-md hover:shadow-lg
transition-all duration-300 cursor-pointer transform
hover:-translate-y-1 border border-gray-100"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-center w-12
h-12 bg-red-100 rounded-lg mb-4">
                                    <MessageSquarePlus className="h-6 w-6 text-red-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900
mb-2">Raise a Complaint</h3>
                                <p className="text-gray-600 text-sm">Submit your
                                    concerns and get them resolved quickly</p>
                            </div>
                        </div>
 
                        {/* My Complaints */}
<div
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100"
              onClick={handleMyComplaintsClick}
            >
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">My Complaints</h3>
                <p className="text-gray-600 text-sm">Track the status of your submitted complaints</p>
              </div>
            </div>
          </div>
        </section>
 
        {/* My Complaints Modal or Section */}
        {showmycomplaints && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">My Complaints</h3>
            {mycomplaints.length === 0 ? (
              <p className="text-gray-600">No complaints found.</p>
            ) : (
              <ul>
                {mycomplaints.map((comp) => (
                  <li key={comp.complaintID} className="mb-2 border-b pb-2">
                    <div className="font-semibold">{comp.title}</div>
                    <div className="text-sm text-gray-600">{comp.description}</div>
                    <div className="text-xs text-gray-500">Status: {comp.status}</div>
                  </li>
                ))}
              </ul>
            )}
            <button
              className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => setShowmycomplaints(false)}
            >
              Close
            </button>
          </div>
        )}
 
                {/* FAQ Section */}
                <section className="mb-8">
                    <div className="flex items-center mb-6">
                        <HelpCircle className="h-6 w-6 text-blue-600 mr-2" />
                        <h2 className="text-xl font-semibold
text-gray-900">Frequently Asked Questions</h2>
                    </div>
                    <div className="bg-white rounded-xl shadow-md border border-gray-100">
                        <div className="divide-y divide-gray-100">
                            {faqData.map((faq, index) => (
                                <div key={index} className="p-6">
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="flex justify-between items-center
w-full text-left"
                                    >
                                        <h3 className="text-lg font-medium text-gray-900
pr-4">{faq.question}</h3>
                                        {expandedFAQ === index ? (
                                            <ChevronUp className="h-5 w-5 text-gray-500
flex-shrink-0" />
                                        ) : (
                                            <ChevronDown className="h-5 w-5 text-gray-500
flex-shrink-0" />
                                        )}
                                    </button>
                                    {expandedFAQ === index && (
                                        <div className="mt-4 pr-4">
                                            <p className="text-gray-600
leading-relaxed">{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
 
                {/* Awareness Videos */}
                <section>
                    <div className="flex items-center mb-6">
                        <Play className="h-6 w-6 text-blue-600 mr-2" />
                        <h2 className="text-xl font-semibold text-gray-900">Awareness Videos</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {awarenessVideos.map((video) => (
                            <a key={video.id} href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden block">
                                <div className="relative">
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                        <div className="bg-white bg-opacity-90 rounded-full p-3 cursor-pointer transform hover:scale-110 transition-transform">
                                            <Play className="h-8 w-8 text-blue-600 ml-1" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                                        {video.duration}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{video.title}</h3>
                                    <p className="text-gray-600 text-sm">{video.description}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>
            </main>
 
            {/* Complaint Modal */}
            {showComplaintModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex
items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl max-w-md w-full
max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6
border-b border-gray-200">
                            <h3 className="text-lg font-semibold
text-gray-900">Raise a Complaint</h3>
                            <button
                                onClick={() => setShowComplaintModal(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <form onSubmit={handleComplaintSubmit} className="p-6">
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-sm
font-medium text-gray-700 mb-2">
                                    Complaint Title *
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={complaintTitle}
                                    onChange={(e) => setComplaintTitle(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300
rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
transition-colors"
                                    placeholder="Brief title of your complaint"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="description" className="block text-sm
font-medium text-gray-700 mb-2">
                                    Description *
                                </label>
                                <textarea
                                    id="description"
                                    value={complaintDescription}
                                    onChange={(e) => setComplaintDescription(e.target.value)}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300
rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
transition-colors resize-none"
                                    placeholder="Provide detailed information about your
complaint..."
                                    required
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowComplaintModal(false)}
                                    className="flex-1 px-4 py-2 text-gray-700
bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white
rounded-lg hover:bg-blue-700 transition-colors flex items-center
justify-center gap-2"
                                >
                                    <Send className="h-4 w-4" />
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
 
export default Dashboard;