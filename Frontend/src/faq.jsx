import React, { useState, useEffect } from "react";
import "./faq.css"; // Assuming you will create this CSS file

const FAQ = () => {
  const [faqs, setFAQs] = useState([]);
  const [newFAQ, setNewFAQ] = useState({ question: "", answer: "" });
  const [editingFAQ, setEditingFAQ] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const apiBaseUrl = "http://localhost:5000/api/Home";

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiBaseUrl}/faqs`);
      if (!response.ok) {
        throw new Error("Failed to fetch FAQs.");
      }
      const data = await response.json();
      setFAQs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFAQ = async (e) => {
    e.preventDefault();
    if (!newFAQ.question || !newFAQ.answer) {
      alert("Please fill in both the question and answer.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiBaseUrl}/add-faq`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFAQ),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.Message || "Failed to add FAQ.");
      }
      setNewFAQ({ question: "", answer: "" });
      setShowForm(false);
      fetchFAQs();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateFAQ = async (e) => {
    e.preventDefault();
    if (!editingFAQ.question || !editingFAQ.answer) {
      alert("Please fill in both the question and answer.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiBaseUrl}/update-faq/${editingFAQ.faqId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...editingFAQ, createdAt: new Date().toISOString() }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.Message || "Failed to update FAQ.");
      }
      setEditingFAQ(null);
      setShowForm(false);
      fetchFAQs();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFAQ = async (id) => {
    if (!window.confirm("Are you sure you want to delete this FAQ?")) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiBaseUrl}/delete-faq/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.Message || "Failed to delete FAQ.");
      }
      fetchFAQs();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (faq) => {
    setEditingFAQ(faq);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">FAQ Management</h2>

      <button className="add-faq-btn" onClick={() => {
        setShowForm(!showForm);
        setEditingFAQ(null);
        setNewFAQ({ question: "", answer: "" });
      }}>
        {showForm ? "Hide Form" : "Add New FAQ"}
      </button>

      {showForm && (
        <form onSubmit={editingFAQ ? handleUpdateFAQ : handleAddFAQ} className="faq-form">
          <div className="form-group">
            <label>Question:</label>
            <textarea
              value={editingFAQ ? editingFAQ.question : newFAQ.question}
              onChange={(e) => editingFAQ ? setEditingFAQ({ ...editingFAQ, question: e.target.value }) : setNewFAQ({ ...newFAQ, question: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Answer:</label>
            <textarea
              value={editingFAQ ? editingFAQ.answer : newFAQ.answer}
              onChange={(e) => editingFAQ ? setEditingFAQ({ ...editingFAQ, answer: e.target.value }) : setNewFAQ({ ...newFAQ, answer: e.target.value })}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : (editingFAQ ? "Update FAQ" : "Add FAQ")}
          </button>
          {editingFAQ && (
            <button type="button" onClick={() => { setEditingFAQ(null); setShowForm(false); }} className="cancel-btn">
              Cancel
            </button>
          )}
        </form>
      )}

      {loading && <p className="loading">Loading FAQs...</p>}
      {error && <p className="error">Error: {error}</p>}

      <div className="faq-list">
        {faqs.length === 0 && !loading && !error ? (
          <p className="no-faqs">No FAQs found.</p>
        ) : (
          faqs.map((faq) => (
            <div key={faq.faqId} className="faq-item">
              <div className="faq-header">
                <h4 className="faq-question">Q: {faq.question}</h4>
                <div className="faq-actions">
                  <button onClick={() => handleEditClick(faq)} className="edit-btn">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteFAQ(faq.faqId)} className="delete-btn">
                    Delete
                  </button>
                </div>
              </div>
              <p className="faq-answer">A: {faq.answer}</p>
              <span className="faq-date">
                Created: {new Date(faq.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FAQ;