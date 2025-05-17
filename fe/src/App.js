import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define the API URL - this will be replaced in the Docker environment
    const apiUrl = "http://localhost:8080/api/attendees";

    // Fetch attendees from the API with proper headers
    axios
      .get(apiUrl, {
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8",
        },
      })
      .then((response) => {
        // Ensure proper encoding when receiving data
        const data = response.data;
        setAttendees(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Lỗi khi tải dữ liệu. Vui lòng thử lại sau.");
        setLoading(false);
      });
  }, []);

  // Format date from ISO format to DD/MM/YYYY
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (loading) return <div className="loading">Đang tải...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Danh sách học viên</h1>
      </header>
      <main>
        <div className="attendee-list">
          <table>
            <thead>
              <tr>
                <th>Họ và tên</th>
                <th>Ngày, tháng, năm sinh</th>
                <th>Phân loại trường</th>
              </tr>
            </thead>
            <tbody>
              {attendees.map((attendee) => (
                <tr key={attendee.id}>
                  <td>{attendee.fullName}</td>
                  <td>{formatDate(attendee.dateOfBirth)}</td>
                  <td>{attendee.university}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default App;
