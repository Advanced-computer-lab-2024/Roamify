import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SelectPreference = () => {
  const [preferences, setPreferences] = useState([]);
  const [selectedPreferences, setSelectedPreferences] = useState([]);

  // Fetch preferences from the API
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/preference-tag/get-all", {
          withCredentials: true,
        });
        setPreferences(response.data.tags || []);
      } catch (error) {
        console.error("Error fetching preferences:", error);
        toast.error("Failed to load preferences.");
      }
    };

    fetchPreferences();
  }, []);

  // Handle the selection or deselection of a preference
  const handlePreferenceToggle = (preferenceId) => {
    setSelectedPreferences((prevSelected) =>
      prevSelected.includes(preferenceId)
        ? prevSelected.filter((id) => id !== preferenceId) // Deselect if already selected
        : [...prevSelected, preferenceId] // Select if not selected
    );
  };

  // Submit the selected preferences
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
      const errorMessage = error.response?.data?.error || "An error occurred while saving preferences.";
      toast.error(errorMessage);
    }
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f8f8f8", borderRadius: "8px" }}>
      <h3>Select Your Preferences</h3>
      <form>
        {preferences.map((preference) => (
          <div key={preference._id} style={{ marginBottom: "10px" }}>
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
      <button onClick={submitPreferences} style={{ marginTop: "20px", padding: "10px 20px" }}>
        Save Preferences
      </button>

      {/* Toast container to display toast messages */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default SelectPreference;
