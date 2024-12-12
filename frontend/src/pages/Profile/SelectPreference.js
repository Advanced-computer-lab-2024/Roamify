import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SelectPreference = () => {
  const [preferences, setPreferences] = useState([]);
  const [selectedPreferences, setSelectedPreferences] = useState([]);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/preference-tag/get-all",
          {
            withCredentials: true,
          }
        );
        setPreferences(response.data.tags || []);
      } catch (error) {
        console.error("Error fetching preferences:", error);
        toast.error("Failed to load preferences.");
      }
    };

    fetchPreferences();
  }, []);

  const handlePreferenceToggle = (preferenceId) => {
    setSelectedPreferences((prevSelected) =>
      prevSelected.includes(preferenceId)
        ? prevSelected.filter((id) => id !== preferenceId)
        : [...prevSelected, preferenceId]
    );
  };

  const submitPreferences = async () => {
    if (selectedPreferences.length === 0) {
      toast.warn("Please select at least one preference.");
      return;
    }

    try {
      await axios.put(
        "http://localhost:3000/api/tourist/select-preferences",
        { preferences: selectedPreferences },
        { withCredentials: true }
      );
      toast.success("Preferences saved successfully!");
    } catch (error) {
      console.error("Error submitting preferences:", error);
      const errorMessage =
        error.response?.data?.error ||
        "An error occurred while saving preferences.";
      toast.error(errorMessage);
    }
  };

  // Style objects
  const styles = {
    container: {
      padding: "20px",
      backgroundColor: "var(--secondary-color)",
      borderRadius: "8px",
      width: "300px",
      margin: "auto",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      display: "flex", // Use flexbox for layout
      flexDirection: "column", // Stack children vertically
      alignItems: "center",
    },
    item: {
      marginBottom: "10px",
      padding: "5px",
      borderBottom: "1px solid #eee",
    },
    button: {
      marginTop: "20px",
      padding: "10px 20px",
      backgroundColor: "#8b3eea",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "16px",
      alignSelf: "center",
    },
    buttonHover: {
      // Note: Hover effects can't be directly applied via inline styles in React
      backgroundColor: "#45a049",
    },
    header: {
      textAlign: "center",
      color: "var(--text-color)",
      fontSize: "20px",
      marginBottom: "15px",
    },
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.header}>Select Your Preferences</h3>
      <form>
        {preferences.map((preference) => (
          <div key={preference._id} style={styles.item}>
            <label>
              <input
                type="checkbox"
                value={preference._id}
                checked={selectedPreferences.includes(preference._id)}
                onChange={() => handlePreferenceToggle(preference._id)}
              />
              {preference.name}
            </label>
          </div>
        ))}
      </form>
      <button style={styles.button} onClick={submitPreferences}>
        Save Preferences
      </button>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default SelectPreference;
