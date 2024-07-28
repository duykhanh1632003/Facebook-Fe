import { useState } from "react";
import { axiosHaveAuth } from "../../../../../../util/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createAttributes } from "../../../../../../api/productAPI";

const NewAttributes = () => {
  const [attributeName, setAttributeName] = useState("");
  const [attributeValue, setAttributeValue] = useState("");
  const instance = axiosHaveAuth();
  const navigate = useNavigate();
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const attributes = { attributeName, attributeValue };
      const response = await instance.post("/api/new/attributes", attributes);
      // const response = await createAttributes(attributes);
      if (response) {
        toast.success("Create attribute success");
        navigate("/shop/attributes-list");
        setAttributeName("");
        setAttributeValue("");
      }
    } catch (error) {
      console.error("Error saving attributes:", error);
    }
  };

  return (
    <div className="mt-3 w-full bg-white p-6 rounded-md shadow-md text-white">
      <form className="space-y-4" onSubmit={handleSave}>
        <div className="flex items-center">
          <label
            className="block text-gray-700 font-medium mb-1 mr-8"
            htmlFor="attributeName"
          >
            Attribute name
          </label>
          <input
            type="text"
            id="attributeName"
            placeholder="Attribute name"
            value={attributeName}
            onChange={(e) => setAttributeName(e.target.value)}
            className="w-[821px] px-4 py-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center">
          <label
            className="block text-gray-700 font-medium mb-1 mr-8"
            htmlFor="attributeValue"
          >
            Attribute value
          </label>
          <input
            type="text"
            id="attributeValue"
            placeholder="Attribute value"
            value={attributeValue}
            onChange={(e) => setAttributeValue(e.target.value)}
            className="w-[821px] px-4 text-gray-700 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="w-[208px] h-[50px] bg-blue-500 hover:border-[1px] hover:text-blue-500 hover:border-blue-500 hover:bg-white font-bold py-2 rounded-lg"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewAttributes;
