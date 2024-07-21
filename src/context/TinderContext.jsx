import React, { createContext, useContext, useState } from "react";
import { axiosHaveAuth } from "../util/axios";
import { v4 as uuidv4 } from "uuid";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const TinderContext = createContext();

export const useTinderContext = () => {
  return useContext(TinderContext);
};

export const TinderContextProvider = ({ children }) => {
  const { authUser } = useAuthContext();
  const instance = axiosHaveAuth();
  const storage = getStorage();
  const [formData, setFormData] = useState({
    name: "",
    email: authUser.user.email,
    day: "",
    month: "",
    year: "",
  });
  const [images, setImages] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedFavorite, setSelectedFavorite] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    name: "",
    date: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    if (id === "day" && value.length === 2) {
      document.getElementById("month").focus();
    }
    if (id === "month" && value.length === 2) {
      document.getElementById("year").focus();
    }

    validateField(id, value);
  };

  const validateField = (field, value) => {
    let nameError = "";
    let dateError = "";

    if (field === "name" && (value.length < 1 || value.length > 22)) {
      nameError = "Ô này phải chứa từ 1 đến 22 ký tự.";
    }

    const day = field === "day" ? value : formData.day;
    const month = field === "month" ? value : formData.month;
    const year = field === "year" ? value : formData.year;

    if (field === "day" || field === "month" || field === "year") {
      if (!isValidDate(day, month, year)) {
        dateError = "Vui lòng nhập ngày hợp lệ";
      }
    }

    setErrors({
      ...errors,
      name: nameError,
      date: dateError,
    });
  };

  const isValidDate = (day, month, year) => {
    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);

    if (
      isNaN(dayNum) ||
      isNaN(monthNum) ||
      isNaN(yearNum) ||
      dayNum < 1 ||
      dayNum > 31 ||
      monthNum < 1 ||
      monthNum > 12 ||
      yearNum < 1900 ||
      yearNum > new Date().getFullYear()
    ) {
      return false;
    }
    return true;
  };

  const uploadData = async () => {
    setLoading(true);
    try {
      // Convert birthdate to MM/DD/YYYY format
      const birthDate = `${formData.month}/${formData.day}/${formData.year}`;

      // Upload images to Firebase
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          const imageId = uuidv4();
          const imageRef = ref(storage, `images/${imageId}`);
          await uploadBytes(imageRef, image);
          const imageUrl = await getDownloadURL(imageRef);
          return imageUrl;
        })
      );

      // Prepare data for backend
      const userData = {
        name: formData.name,
        email: formData.email,
        birthDate,
        images: imageUrls,
        selectedInterests,
        selectedGender,
        selectedFavorite,
        selectedOptions,
        datingPurposes: searching,
      };

      // Send data to backend
      const res = await instance.post("/api/tinder/create/user", userData);
      setLoading(false);
      if (res) {
        toast.success("Create new tinder done");
        navigate("/tinder/recs");
      }
    } catch (error) {
      console.error("Error uploading data: ", error);
      setLoading(false);
    }
  };

  return (
    <TinderContext.Provider
      value={{
        formData,
        setFormData,
        errors,
        setErrors,
        handleInputChange,
        validateField,
        isValidDate,
        images,
        setImages,
        selectedInterests,
        setSelectedInterests,
        selectedGender,
        setSelectedGender,
        selectedFavorite,
        setSelectedFavorite,
        setSelectedOptions,
        selectedOptions,
        uploadData,
        loading,
        setSearching,
        searching,
      }}
    >
      {children}
    </TinderContext.Provider>
  );
};
