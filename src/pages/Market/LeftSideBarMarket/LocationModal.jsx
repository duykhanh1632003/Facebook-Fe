import React, { useState } from "react";
import Modal from "react-modal";
import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

Modal.setAppElement("#root");

const LocationModal = ({ isOpen, onRequestClose }) => {
  const [address, setAddress] = useState("");
  const [radius, setRadius] = useState(10);
  const [position, setPosition] = useState(
    JSON.parse(localStorage.getItem("location"))
  ); // Default to Ha Noi

  const handleAddressChange = (value) => {
    setAddress(value);
  };

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setPosition([latLng.lat, latLng.lng]);
  };

  const handleRadiusChange = (e) => {
    setRadius(Number(e.target.value));
  };

  const handleMyLocationClick = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setPosition([latitude, longitude]);
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Location Modal"
      className="flex items-center justify-center w-[800px]"
      overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full ">
        <h2 className="text-2xl font-semibold mb-4">Select Location</h2>
        <PlacesAutocomplete
          value={address}
          onChange={handleAddressChange}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div className="mb-4">
              <input
                {...getInputProps({
                  placeholder: "Enter address",
                  className:
                    "w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500",
                })}
              />
              <div className="absolute z-10 bg-white shadow-lg mt-1 w-full">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const style = suggestion.active
                    ? { backgroundColor: "#a8dadc", cursor: "pointer" }
                    : { backgroundColor: "#fff", cursor: "pointer" };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        style,
                        className: "p-2 hover:bg-blue-500 hover:text-white",
                      })}
                    >
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        <select
          value={radius}
          onChange={handleRadiusChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        >
          {[10, 20, 30, 50, 100, 200].map((km) => (
            <option key={km} value={km}>
              {km} km
            </option>
          ))}
        </select>
        <button
          onClick={handleMyLocationClick}
          className="w-full bg-blue-500 text-white p-2 rounded mb-4"
        >
          My Location
        </button>
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
          className="rounded mb-4"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position}></Marker>
          <Circle center={position} radius={radius * 1000}></Circle>
        </MapContainer>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onRequestClose}
            className="bg-gray-500 text-white p-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => alert("Location selected!")}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LocationModal;
