import React from "react";

const videos = [
  {
    title: "Workplace Safety Basics",
    url: "https://www.youtube.com/embed/3uvvM8JbK1E",
  },
  {
    title: "Personal Protective Equipment (PPE)",
    url: "https://www.youtube.com/embed/1Vn6b9bJkOE",
  },
  {
    title: "Fire Safety Training",
    url: "https://www.youtube.com/embed/1fQYwQJQKxg",
  },
  // Add more videos as needed
];

const Awareness = () => (
  <div style={{ textAlign: "center", marginTop: 40, minHeight: "100vh", background: "#f5f7fa" }}>
    <h1 style={{ color: "#2a4d8f", marginBottom: 30 }}>Awareness Videos</h1>
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 40 }}>
      {videos.map((video, idx) => (
        <div key={idx} style={{
          width: 400,
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 2px 12px #eee",
          padding: 20,
          marginBottom: 30
        }}>
          <h3 style={{ marginBottom: 16 }}>{video.title}</h3>
          <div style={{
            position: "relative",
            paddingBottom: "56.25%",
            height: 0,
            overflow: "hidden",
            borderRadius: 8,
            boxShadow: "0 2px 8px #eee"
          }}>
            <iframe
              src={video.url}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            ></iframe>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Awareness;