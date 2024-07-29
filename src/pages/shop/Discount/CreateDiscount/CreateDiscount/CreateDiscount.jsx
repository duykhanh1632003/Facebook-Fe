import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { vi } from "date-fns/locale";
registerLocale("vi", vi);

const CreateDiscount = ({ products }) => {
  const [formData, setFormData] = useState({
    discount_name: "",
    discount_description: "",
    discount_type: "fixed_amount",
    discount_value: "",
    discount_code: "",
    discount_start_date: new Date(),
    discount_end_date: null,
    discount_max_uses_per_user: "",
    discount_min_order_value: "",
    discount_applies_to: "all",
    discount_product_ids: [],
  });

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

  const handleProductSelection = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({
      ...formData,
      discount_product_ids: value,
    });
  };

  return (
    <div className="w-full bg-white h-full mt-3 p-6 rounded-lg shadow-lg">
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
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="discount_code"
          >
            Discount Code
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="discount_code"
            type="text"
            value={formData.discount_code}
            onChange={handleInputChange}
            placeholder="Discount Code"
          />
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
            <option value="all">All</option>
            <option value="specific">Specific Products</option>
          </select>
        </div>
        {formData.discount_applies_to === "specific" && (
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="discount_product_ids"
            >
              Select Products
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="discount_product_ids"
              multiple
              value={formData.discount_product_ids}
              onChange={handleProductSelection}
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Create Discount
        </button>
      </form>
    </div>
  );
};

export default CreateDiscount;
