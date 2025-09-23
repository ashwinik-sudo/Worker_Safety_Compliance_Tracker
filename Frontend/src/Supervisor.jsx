import React, { useState, useEffect } from 'react';
 
const Supervisor = () => {
  // State for the "Request Items" form
  const [requestData, setRequestData] = useState({
    itemId: '',
    quantityReq: '',
  });
  const [requestStatus, setRequestStatus] = useState(null);
 
  // State for the "Complaints" list
  const [complaints, setComplaints] = useState([]);
  const [complaintStatus, setComplaintStatus] = useState({}); // To show status per complaint
 
  // Fetch complaints from API on mount
  useEffect(() => {
    fetch('http://localhost:5000/api/Home/super/2')
      .then(res => res.json())
      .then(data => {
        // Assuming API returns an array of complaints with complaintID and complaints fields
        setComplaints(data);
      })
      .catch(() => setComplaints([]));
  }, []);
 
  const handleRequestChange = (e) => {
    const { name, value } = e.target;
    setRequestData({ ...requestData, [name]: value });
  };
 
  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    setRequestStatus(null); // Clear previous status
 
    try {
      const response = await fetch('http://localhost:5000/api/Home/supervisororder', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          {
            itemID: parseInt(requestData.itemId, 10),
            QuantityReq: parseInt(requestData.quantityReq, 10),
          }
        ]),
      });
 
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
 
      const data = await response.json();
      setRequestStatus({ message: 'Request submitted successfully! ✅', type: 'success' });
      console.log('Success:', data);
    } catch (error) {
      setRequestStatus({ message: 'Error submitting request. ❌', type: 'error' });
      console.error('Error:', error);
    }
  };
 
  // Handle status update for complaints
  const updateComplaintStatus = async (complaintID, newStatus) => {
    let apiUrl = '';
    if (newStatus === 'IN PROGRESS') {
      apiUrl = `http://localhost:5000/api/Home/progress/${complaintID}`;
    } else if (newStatus === 'COMPLETED') {
      apiUrl = `http://localhost:5000/api/Home/resolved/${complaintID}`;
    } else {
      return;
    }
 
    setComplaintStatus(prev => ({ ...prev, [complaintID]: 'Updating...' }));
 
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
        // No body needed if your API just needs the ID in the URL
      });
 
      if (!response.ok) throw new Error('Failed to update status');
 
      // Update local state to reflect new status
      setComplaints(prev =>
        prev.map(c =>
          c.complaintID === complaintID ? { ...c, status: newStatus } : c
        )
      );
      setComplaintStatus(prev => ({ ...prev, [complaintID]: 'Updated!' }));
    } catch (error) {
      setComplaintStatus(prev => ({ ...prev, [complaintID]: 'Error!' }));
    }
  };
 
  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <div className="max-w-2xl mx-auto grid grid-cols-1 gap-8">
        {/* Request Items Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">REQUEST ITEMS</h2>
          <form onSubmit={handleRequestSubmit} className="space-y-4">
            <div>
              <label htmlFor="itemId" className="block text-gray-700 font-medium mb-1">
                Item ID
              </label>
              <input
                type="text"
                id="itemId"
                name="itemId"
                value={requestData.itemId}
                onChange={handleRequestChange}
                placeholder="Enter Item ID"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="quantityReq" className="block text-gray-700 font-medium mb-1">
                Quantity Required
              </label>
              <input
                type="number"
                id="quantityReq"
                name="quantityReq"
                value={requestData.quantityReq}
                onChange={handleRequestChange}
                placeholder="Enter Quantity"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit Request
            </button>
          </form>
          {requestStatus && (
            <div
              className={`mt-4 text-center font-bold ${
                requestStatus.type === 'success' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {requestStatus.message}
            </div>
          )}
        </div>
        {/* Complaints Card (below Request Card) */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Complaints</h2>
          <div className="space-y-4">
            {complaints.length === 0 && (
              <div className="text-gray-500 text-center">No complaints found.</div>
            )}
            {complaints.map((complaint) => (
              <div key={complaint.complaintID} className="p-4 border border-gray-200 rounded-md flex justify-between items-center">
                <div>
                  <div className="font-semibold text-gray-800">ID: {complaint.complaintID}</div>
                  <div className="text-gray-900 font-medium">Title: {complaint.title}</div>
                  {complaint.status && (
                    <span className="text-xs text-gray-500">Status: {complaint.status}</span>
                  )}
                </div>
                <div className="space-x-2 flex flex-col items-end">
                  <button
                    onClick={() => updateComplaintStatus(complaint.complaintID, 'IN PROGRESS')}
                    className={`bg-yellow-500 text-white font-bold py-1 px-3 rounded-md hover:bg-yellow-600 mb-1 ${
                      complaint.status === 'COMPLETED' ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={complaint.status === 'IN PROGRESS' || complaint.status === 'COMPLETED'}
                  >
                    IN PROGRESS
                  </button>
                  <button
                    onClick={() => updateComplaintStatus(complaint.complaintID, 'COMPLETED')}
                    className={`bg-green-500 text-white font-bold py-1 px-3 rounded-md hover:bg-green-600 ${
                      complaint.status === 'COMPLETED' ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={complaint.status === 'COMPLETED'}
                  >
                    COMPLETED
                  </button>
                  {complaintStatus[complaint.complaintID] && (
                    <span className="text-xs text-blue-500">{complaintStatus[complaint.complaintID]}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default Supervisor;