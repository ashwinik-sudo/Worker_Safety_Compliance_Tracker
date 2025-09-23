import React, { useState } from "react";
import { FaBoxes, FaCommentDots, FaQuestionCircle, FaUserShield, FaClipboardList, FaArrowLeft } from 'react-icons/fa';
 
const modernCardStyle = {
  background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
  borderRadius: 15,
  padding: "30px 20px",
  margin: 20,
  width: 250,
  textAlign: "center",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  color: "white",
  height: 180,
};
 
const modernCardHoverStyle = {
  transform: "translateY(-10px)",
  boxShadow: "0 15px 40px rgba(0, 0, 0, 0.3)",
};
 
const iconStyle = {
  fontSize: 48,
  marginBottom: 15,
  color: "rgba(255, 255, 255, 0.9)",
};
 
const headingStyle = {
  fontSize: 28,
  fontWeight: "bold",
  color: "#333",
  marginBottom: 40,
  textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
};
 
const subHeadingStyle = {
  fontSize: 22,
  fontWeight: "600",
  color: "#444",
  marginBottom: 25,
  borderBottom: "2px solid #eee",
  paddingBottom: 10,
};
 
const backButtonStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px 20px",
  margin: "20px auto",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  fontSize: 16,
  fontWeight: "bold",
  boxShadow: "0 4px 15px rgba(0, 123, 255, 0.3)",
  transition: "background-color 0.3s ease, transform 0.2s ease",
  width: 150,
};
 
const backButtonHoverStyle = {
  backgroundColor: "#0056b3",
  transform: "translateY(-2px)",
};
 
const tableContainerStyle = {
  backgroundColor: "#ffffff",
  borderRadius: 12,
  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
  margin: "30px auto",
  maxWidth: 900,
  overflow: "hidden",
};
 
const modernTableStyle = {
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "0",
};
 
const modernThTdStyle = {
  padding: "15px 20px",
  textAlign: "left",
  borderBottom: "1px solid #e0e0e0",
};
 
const modernThStyle = {
  ...modernThTdStyle,
  backgroundColor: "#f0f2f5",
  color: "#555",
  fontWeight: "700",
  textTransform: "uppercase",
  fontSize: 14,
};
 
const modernTdStyle = {
  ...modernThTdStyle,
  color: "#333",
  fontSize: 15,
};
 
const stockItemStyle = {
  background: "#ffffff",
  borderRadius: 12,
  padding: "25px",
  boxShadow: "0 5px 20px rgba(0, 0, 0, 0.08)",
  textAlign: "left",
  fontSize: 17,
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  minWidth: 240,
  maxWidth: 300,
};
 
const stockItemHoverStyle = {
  transform: "translateY(-5px)",
  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.12)",
};
 
const Admin = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [stock, setStock] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [users, setUsers] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [hoveredStockItem, setHoveredStockItem] = useState(null);
 
  // FAQ management states
  const [faqOption, setFaqOption] = useState(null);
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');
  const [faqStatus, setFaqStatus] = useState('');
  const [faqs, setFaqs] = useState([]);
  const [editFaqId, setEditFaqId] = useState(null);
  const [editFaqQuestion, setEditFaqQuestion] = useState('');
  const [editFaqAnswer, setEditFaqAnswer] = useState('');
  const [editFaqStatus, setEditFaqStatus] = useState('');
 
  // Complaints view states
  const [complaints, setComplaints] = useState([]);
  const [expandedComplaint, setExpandedComplaint] = useState(null);
 
  const handleStockClick = async () => {
    setSelectedCard("stock");
    try {
      const res = await fetch("http://localhost:5000/api/Home/stock");
      const data = await res.json();
      setStock(data);
    } catch (error) {
      console.error("Error fetching stock:", error);
      setStock([]);
    }
  };
 
  const handleFeedbackClick = async () => {
    setSelectedCard("feedback");
    try {
      const [feedbackRes, usersRes] = await Promise.all([
        fetch("http://localhost:5000/api/Home/getfeedback"),
        fetch("http://localhost:5000/api/Home/users"),
      ]);
      const feedbackData = await feedbackRes.json();
      const usersData = await usersRes.json();
      setFeedback(feedbackData);
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching feedback or users:", error);
      setFeedback([]);
      setUsers([]);
    }
  };
 
  const handleComplaintsClick = async () => {
    setSelectedCard("complaints");
    try {
      const res = await fetch("http://localhost:5000/api/Home/complaintall");
      const data = await res.json();
      setComplaints(data);
    } catch (error) {
      setComplaints([]);
    }
  };
 
  const getUserName = (userId) => {
    const user = users.find((u) => u.userId === userId);
    return user ? `${user.firstName} ${user.lastName}` : `User ID: ${userId}`;
  };
 
  return (
    <div style={{ textAlign: "center", padding: 40, background: "#f8faff", minHeight: "100vh" }}>
      <h1 style={headingStyle}>Admin Dashboard</h1>
 
      {selectedCard && (
        <button
          style={hoveredButton === "back" ? { ...backButtonStyle, ...backButtonHoverStyle } : backButtonStyle}
          onClick={() => { setSelectedCard(null); setFaqOption(null); setFaqStatus(''); setFaqQuestion(''); setFaqAnswer(''); }}
          onMouseEnter={() => setHoveredButton("back")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <FaArrowLeft style={{ marginRight: 8 }} /> Back to Dashboard
        </button>
      )}
 
      {selectedCard === "complaints" ? (
        <div>
          <h2 style={subHeadingStyle}>All Complaints</h2>
          <div style={tableContainerStyle}>
            {complaints.length === 0 ? (
              <div style={{ color: "#888", fontSize: 18, padding: 30, textAlign: "center" }}>
                No complaints found.
              </div>
            ) : (
              <table style={modernTableStyle}>
                <thead>
                  <tr>
                    <th style={modernThStyle}>Title</th>
                    <th style={modernThStyle}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((complaint) => (
                    <React.Fragment key={complaint.complaintID}>
                      <tr>
                        <td
                          style={{ ...modernTdStyle, cursor: "pointer", color: "#2563eb", fontWeight: 600 }}
                          onClick={() =>
                            setExpandedComplaint(
                              expandedComplaint === complaint.complaintID ? null : complaint.complaintID
                            )
                          }
                        >
                          {complaint.title}
                        </td>
                        <td style={modernTdStyle}>{complaint.status}</td>
                      </tr>
                      {expandedComplaint === complaint.complaintID && (
                        <tr>
                          <td colSpan={2} style={{ ...modernTdStyle, background: "#f3f4f6", color: "#222" }}>
                            <div style={{ textAlign: "left", padding: "10px 0" }}>
                              <strong>Description:</strong>
                              <div style={{ marginTop: 5 }}>{complaint.description}</div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      ) : selectedCard === "stock" ? (
                <div>
                    <h2 style={subHeadingStyle}>Stock Management</h2>
                    <div style={{
                        display: "flex", flexWrap: "wrap",
                        justifyContent: "center", gap: 30, marginTop: 30
                    }}>
                        {stock.length === 0 ? (
                            <div style={{
                                color: "#888", fontSize: 18, padding: 30,
                                background: "#fff", borderRadius: 10, boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)" }}>
                        No stock items found.
                    </div>
                    ) : (
              stock.map((item) => {
                const isLowStock = item.currentQuantity < 20;
                return (
                  <div
                    key={item.itemId}
                    style={{
                      ...(hoveredStockItem === item.itemId ? { ...stockItemStyle, ...stockItemHoverStyle } : stockItemStyle),
                      border: isLowStock ? '4px solid red' : 'none',
                      animation: isLowStock ? 'blink-red-border 1s infinite' : 'none',
                    }}
                    onMouseEnter={() => setHoveredStockItem(item.itemId)}
                    onMouseLeave={() => setHoveredStockItem(null)}
                  >
                    <div style={{ fontWeight: "bold", marginBottom: 10, color: "#4a7dff", fontSize: 20 }}>
                      {item.itemName}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                      <span style={{ color: "#777", fontSize: 16 }}>Current Quantity:</span>
                      <span style={{ fontWeight: "bold", color: "#333", fontSize: 18 }}>{item.currentQuantity}</span>
                    </div>
                  </div>
                );
              })
            )}
                </div>
        </div>
    ): selectedCard === "feedback" ? (
        <div>
          <h2 style={subHeadingStyle}>Customer Feedback</h2>
          <div style={tableContainerStyle}>
            {feedback.length === 0 ? (
              <div style={{ color: "#888", fontSize: 18, padding: 30, textAlign: "center" }}>
                No feedback found.
              </div>
            ) : (
              <table style={modernTableStyle}>
                <thead>
                  <tr>
                    <th style={modernThStyle}>User Name</th>
                    <th style={modernThStyle}>Comment</th>
                    <th style={modernThStyle}>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {feedback.map((fb, index) => (
                    <tr key={fb.feedbackId || index}>
                      <td style={modernTdStyle}>{getUserName(fb.userId)}</td>
                      <td style={modernTdStyle}>{fb.comment}</td>
                      <td style={modernTdStyle}>{fb.rating} / 5</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      ) : selectedCard === "faq" ? (
        <div>
          <h2 style={subHeadingStyle}>FAQ Management</h2>
          {!faqOption && (
            <div style={{ display: "flex", gap: 20, justifyContent: "center", margin: 30 }}>
              <button
                style={backButtonStyle}
                onClick={() => setFaqOption("add")}
              >
                Add FAQ
              </button>
              <button
                style={backButtonStyle}
                onClick={() => setFaqOption("edit")}
              >
                Edit FAQ
              </button>
              <button
                style={backButtonStyle}
                onClick={() => setFaqOption("delete")}
              >
                Delete FAQ
              </button>
            </div>
          )}
 
          {/* Add FAQ Modal */}
          {faqOption === "add" && (
            <div style={{
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
              maxWidth: 400,
              margin: "30px auto",
              padding: 30,
              textAlign: "left"
            }}>
              <h3 style={{ ...subHeadingStyle, marginBottom: 20 }}>Add New FAQ</h3>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setFaqStatus('');
                  if (!faqQuestion.trim() || !faqAnswer.trim()) {
                    setFaqStatus('Please enter both question and answer.');
                    return;
                  }
                  try {
                    const response = await fetch("http://localhost:5000/api/Home/add-faq", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        question: faqQuestion,
                        answer: faqAnswer
                      })
                    });
                    if (response.ok) {
                      setFaqStatus('FAQ added successfully!');
                      setFaqQuestion('');
                      setFaqAnswer('');
                    } else {
                      setFaqStatus('Failed to add FAQ.');
                    }
                  } catch (error) {
                    setFaqStatus('Error adding FAQ.');
                  }
                }}
              >
                <div style={{ marginBottom: 15 }}>
                  <label style={{ fontWeight: 600 }}>Question</label>
                  <input
                    type="text"
                    value={faqQuestion}
                    onChange={e => setFaqQuestion(e.target.value)}
                    style={{ width: "100%", padding: 8, marginTop: 5, borderRadius: 6, border: "1px solid #ccc" }}
                    placeholder="Enter FAQ question"
                    required
                  />
                </div>
                <div style={{ marginBottom: 15 }}>
                  <label style={{ fontWeight: 600 }}>Answer</label>
                  <textarea
                    value={faqAnswer}
                    onChange={e => setFaqAnswer(e.target.value)}
                    style={{ width: "100%", padding: 8, marginTop: 5, borderRadius: 6, border: "1px solid #ccc" }}
                    placeholder="Enter FAQ answer"
                    required
                  />
                </div>
                {faqStatus && <div style={{ color: faqStatus.includes('success') ? 'green' : 'red', marginBottom: 10 }}>{faqStatus}</div>}
                <div style={{ display: "flex", gap: 10 }}>
                  <button type="submit" style={{ ...backButtonStyle, width: "100%" }}>Submit</button>
                  <button
                    type="button"
                    style={{ ...backButtonStyle, backgroundColor: "#ccc", color: "#333" }}
                    onClick={() => { setFaqOption(null); setFaqStatus(''); setFaqQuestion(''); setFaqAnswer(''); }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
 
          {/* Edit FAQ */}
          {faqOption === "edit" && (
            <div>
              <h3 style={{ ...subHeadingStyle, marginBottom: 20 }}>Edit FAQ</h3>
              {/* Fetch FAQs when entering edit mode */}
              {faqs.length === 0 && (
                <button
                  style={{ ...backButtonStyle, marginBottom: 20 }}
                  onClick={async () => {
                    setEditFaqStatus('');
                    try {
                      const res = await fetch("http://localhost:5000/api/Home/faqs");
                      const data = await res.json();
                      setFaqs(data);
                    } catch (error) {
                      setEditFaqStatus('Error fetching FAQs.');
                    }
                  }}
                >
                  Load FAQs
                </button>
              )}
              {faqs.length > 0 && (
                <div style={{ maxHeight: 300, overflowY: "auto", marginBottom: 20 }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        <th style={{ ...modernThStyle, width: 60 }}>ID</th>
                        <th style={modernThStyle}>Question</th>
                        <th style={modernThStyle}>Answer</th>
                        <th style={modernThStyle}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {faqs.map(faq => (
                        <tr key={faq.faqId}>
                          <td style={modernTdStyle}>{faq.faqId}</td>
                          <td style={modernTdStyle}>{faq.question}</td>
                          <td style={modernTdStyle}>{faq.answer}</td>
                          <td style={modernTdStyle}>
                            <button
                              style={{ ...backButtonStyle, width: 70, padding: "5px 10px", fontSize: 14 }}
                              onClick={() => {
                                setEditFaqId(faq.faqId);
                                setEditFaqQuestion(faq.question);
                                setEditFaqAnswer(faq.answer);
                                setEditFaqStatus('');
                              }}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
 
              {/* Edit Modal/Card */}
              {editFaqId && (
                <div style={{
                  background: "#fff",
                  borderRadius: 12,
                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  maxWidth: 400,
                  margin: "30px auto",
                  padding: 30,
                  textAlign: "left"
                }}>
                  <h4 style={{ ...subHeadingStyle, marginBottom: 20 }}>Edit FAQ #{editFaqId}</h4>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setEditFaqStatus('');
                      if (!editFaqQuestion.trim() || !editFaqAnswer.trim()) {
                        setEditFaqStatus('Please enter both question and answer.');
                        return;
                      }
                      try {
                        const response = await fetch(`http://localhost:5000/api/Home/update-faq/${editFaqId}`, {
                          method: "PUT",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            faqId: editFaqId,
                            question: editFaqQuestion,
                            answer: editFaqAnswer
                          })
                        });
                        if (response.ok) {
                          setEditFaqStatus('FAQ updated successfully!');
                          // Update the local list
                          setFaqs(faqs.map(f => f.faqId === editFaqId ? { ...f, question: editFaqQuestion, answer: editFaqAnswer } : f));
                          setEditFaqId(null);
                          setEditFaqQuestion('');
                          setEditFaqAnswer('');
                        } else {
                          setEditFaqStatus('Failed to update FAQ.');
                        }
                      } catch (error) {
                        setEditFaqStatus('Error updating FAQ.');
                      }
                    }}
                  >
                    <div style={{ marginBottom: 15 }}>
                      <label style={{ fontWeight: 600 }}>Question</label>
                      <input
                        type="text"
                        value={editFaqQuestion}
                        onChange={e => setEditFaqQuestion(e.target.value)}
                        style={{ width: "100%", padding: 8, marginTop: 5, borderRadius: 6, border: "1px solid #ccc" }}
                        required
                      />
                    </div>
                    <div style={{ marginBottom: 15 }}>
                      <label style={{ fontWeight: 600 }}>Answer</label>
                      <textarea
                        value={editFaqAnswer}
                        onChange={e => setEditFaqAnswer(e.target.value)}
                        style={{ width: "100%", padding: 8, marginTop: 5, borderRadius: 6, border: "1px solid #ccc" }}
                        required
                      />
                    </div>
                    {editFaqStatus && <div style={{ color: editFaqStatus.includes('success') ? 'green' : 'red', marginBottom: 10 }}>{editFaqStatus}</div>}
                    <div style={{ display: "flex", gap: 10 }}>
                      <button type="submit" style={{ ...backButtonStyle, width: "100%" }}>Submit</button>
                      <button
                        type="button"
                        style={{ ...backButtonStyle, backgroundColor: "#ccc", color: "#333" }}
                        onClick={() => { setEditFaqId(null); setEditFaqStatus(''); }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
 
              <button
                style={{ ...backButtonStyle, marginTop: 30 }}
                onClick={() => { setFaqOption(null); setFaqs([]); setEditFaqId(null); setEditFaqStatus(''); }}
              >
                <FaArrowLeft style={{ marginRight: 8 }} /> Back
              </button>
              {editFaqStatus && !editFaqId && <div style={{ color: editFaqStatus.includes('success') ? 'green' : 'red', marginTop: 10 }}>{editFaqStatus}</div>}
            </div>
          )}
 
          <button
            style={{ ...backButtonStyle, marginTop: 30 }}
            onClick={() => { setSelectedCard(null); setFaqOption(null); setFaqStatus(''); setFaqQuestion(''); setFaqAnswer(''); }}
          >
            <FaArrowLeft style={{ marginRight: 8 }} /> Back to Dashboard
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: 30 }}>
          <div
            style={hoveredCard === "complaints" ? { ...modernCardStyle, ...modernCardHoverStyle } : modernCardStyle}
            onClick={handleComplaintsClick}
            onMouseEnter={() => setHoveredCard("complaints")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <FaClipboardList style={iconStyle} />
            <h3>View Complaints</h3>
          </div>
          <div
            style={hoveredCard === "stock" ? { ...modernCardStyle, ...modernCardHoverStyle } : modernCardStyle}
            onClick={handleStockClick}
            onMouseEnter={() => setHoveredCard("stock")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <FaBoxes style={iconStyle} />
            <h3>Stock Management</h3>
          </div>
          <div
            style={hoveredCard === "feedback" ? { ...modernCardStyle, ...modernCardHoverStyle } : modernCardStyle}
            onClick={handleFeedbackClick}
            onMouseEnter={() => setHoveredCard("feedback")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <FaCommentDots style={iconStyle} />
            <h3>View Feedback</h3>
          </div>
          <div
            style={hoveredCard === "faq" ? { ...modernCardStyle, ...modernCardHoverStyle } : modernCardStyle}
            onClick={() => setSelectedCard("faq")}
            onMouseEnter={() => setHoveredCard("faq")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <FaQuestionCircle style={iconStyle} />
            <h3>Add/Edit FAQ</h3>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default Admin;
 