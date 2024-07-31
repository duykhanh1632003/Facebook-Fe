import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { vi } from "date-fns/locale";
import Select from "react-select";
import { useProductContext } from "../../../../../context/ProductContext";
import "../../../Product/ProductList/TableProduct/TableProduct.css";
import "./CreateDiscount.css"; // Import CSS file for CreateDiscount
import { axiosHaveAuth } from "../../../../../util/axios";
import { useAuthContext } from "../../../../../context/AuthContext";
import { toast } from "react-toastify";
import { LoadingRounded } from "../../../../../Loading/LoadingRounded";

registerLocale("vi", vi);

const CreateDiscount = () => {
  const instance = axiosHaveAuth();
  const { authUser } = useAuthContext();  
  const { productData, loading: productLoading } = useProductContext();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    discount_shopId: authUser.user._id,
    discount_name: "",
    discount_description: "",
    discount_type: "fixed_amount",
    discount_value: "",
    discount_code: "",
    discount_start_date: new Date(),
    discount_end_date: null,
    discount_max_uses_per_user: "",
    discount_max_use: "",
    discount_min_order_value: "",
    discount_applies_to: "all",
    discount_product_ids: [],
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (productData && productData.length > 0) {
      setProducts(productData);
    } else {
      setProducts([]);
    }
  }, [productData]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleDateChange = (date, field) => {
    setFormData({
      ...formData,
      [field]: date,
    });
  };

  const handleDiscountValueChange = (e) => {
    let value = e.target.value.replace(/[^0-9.]/g, "");
    setFormData({
      ...formData,
      discount_value: value,
    });
  };

  const handleProductChange = (selectedOptions) => {
    const selectedProductIds = selectedOptions.map((option) => option.value);
    setFormData({
      ...formData,
      discount_product_ids: selectedProductIds,
    });
  };

  const productOptions = products.map((product) => ({
    value: product._id,
    label: (
      <div className="flex items-center">
        <img
          src={product.product_thumb}
          alt={product.product_name}
          className="w-10 h-10 rounded-full mr-2"
        />
        <span>{product.product_name}</span>
      </div>
    ),
  }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      display: "flex",
      padding: "0.5rem",
      borderColor: "rgba(209, 213, 219)",
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    }),
    option: (provided, state) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      padding: "0.5rem",
      backgroundColor: state.isSelected ? "rgba(59, 130, 246)" : "white",
      color: state.isSelected ? "white" : "black",
      "&:hover": {
        backgroundColor: "rgba(59, 130, 246, 0.1)",
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      padding: "0.3rem",
    }),
  };

  const resetFormData = () => {
    setFormData({
      discount_shopId: authUser.user._id,
      discount_name: "",
      discount_description: "",
      discount_type: "fixed_amount",
      discount_value: "",
      discount_code: "",
      discount_start_date: new Date(),
      discount_end_date: null,
      discount_max_uses_per_user: "",
      discount_max_use: "",
      discount_min_order_value: "",
      discount_applies_to: "all",
      discount_product_ids: [],
    });
  };

  const generateDiscountCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 10; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({
      ...formData,
      discount_code: code,
    });
  };

  const handleOnClickSave = async () => {
    setLoading(true);
    try {
      const response = await instance.post("/api/post/new/discount", formData);
      if (response) {
        setLoading(false);
        resetFormData(); // Reset form data after successful creation
        toast.success("Discount created successfully!");
      } else {
        toast.error("Create discount failed");
      }
    } catch (e) {
      console.log(e);
      toast.error("An error occurred while creating the discount");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white h-full mt-3 p-6 rounded-lg shadow-lg">
      {productLoading || loading ? (
        <div className="loading-overlay">
          <LoadingRounded />
        </div>
      ) : (
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="discount_name"
            >
              Discount Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="discount_name"
              type="text"
              value={formData.discount_name}
              onChange={handleInputChange}
              placeholder="Discount Name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="discount_description"
            >
              Discount Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="discount_description"
              value={formData.discount_description}
              onChange={handleInputChange}
              placeholder="Discount Description"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="discount_type"
            >
              Discount Type
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="discount_type"
              value={formData.discount_type}
              onChange={handleInputChange}
            >
              <option value="fixed_amount">Fixed Amount</option>
              <option value="percentage">Percentage</option>
            </select>
          </div>
          <div className="mb-4 w-2/3 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="discount_value"
            >
              Discount Value
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
              id="discount_value"
              type="text"
              value={formData.discount_value}
              onChange={handleDiscountValueChange}
              placeholder="Discount Value"
            />
            <div className="absolute right-3 text-lg top-8 z-3 text-gray-500">
              {formData.discount_type === "percentage" ? "%" : "vnđ"}
            </div>
          </div>
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="discount_code"
            >
              Discount Code
            </label>
            <div className="flex">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="discount_code"
                type="text"
                value={formData.discount_code}
                onChange={handleInputChange}
                placeholder="Discount Code"
              />
              <button
                type="button"
                className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={generateDiscountCode}
              >
                Generate
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="discount_start_date"
            >
              Discount Start Date
            </label>
            <DatePicker
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="discount_start_date"
              selected={formData.discount_start_date}
              onChange={(date) => handleDateChange(date, "discount_start_date")}
              showTimeSelect
              minDate={new Date()}
              locale="vi"
              dateFormat="Pp"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="discount_end_date"
            >
              Discount End Date
            </label>
            <DatePicker
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="discount_end_date"
              selected={formData.discount_end_date}
              onChange={(date) => handleDateChange(date, "discount_end_date")}
              showTimeSelect
              minDate={formData.discount_start_date}
              locale="vi"
              dateFormat="Pp"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="discount_max_uses_per_user"
            >
              Max Uses Per User
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="discount_max_uses_per_user"
              type="number"
              value={formData.discount_max_uses_per_user}
              onChange={handleInputChange}
              placeholder="Max Uses Per User"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="discount_max_use"
            >
              Max Uses Per User
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="discount_max_use"
              type="number"
              value={formData.discount_max_use}
              onChange={handleInputChange}
              placeholder="Max Uses Per User"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="discount_min_order_value"
            >
              Min Order Value
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="discount_min_order_value"
              type="number"
              value={formData.discount_min_order_value}
              onChange={handleInputChange}
              placeholder="Min Order Value"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="discount_applies_to"
            >
              Applies To
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="discount_applies_to"
              value={formData.discount_applies_to}
              onChange={handleInputChange}
            >
              <option value="all">All Products</option>
              <option value="specific">Specific Products</option>
            </select>
          </div>
          {formData.discount_applies_to === "specific" && (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="discount_product_ids"
              >
                Choose Products
              </label>
              <Select
                isMulti
                options={productOptions}
                value={productOptions.filter((option) =>
                  formData.discount_product_ids.includes(option.value)
                )}
                onChange={handleProductChange}
                styles={customStyles}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
          )}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleOnClickSave}
            >
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateDiscount;
