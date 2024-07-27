import React from "react";

const Combinations = ({ combinations, selectedAttributes, register }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Attribute Combinations
      </label>
      <table className="table-auto w-full">
        <thead>
          <tr>
            {selectedAttributes.map((attr, index) => (
              <th key={index} className="px-4 py-2">
                {attr.category}
              </th>
            ))}
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {combinations.map((combination, index) => (
            <tr key={index}>
              {combination.map((value, i) => (
                <td key={i} className="border px-4 py-2">
                  {value}
                </td>
              ))}
              <td className="border px-4 py-2">
                <input
                  type="number"
                  {...register(`combinations.${index}.quantity`, {
                    required: true,
                  })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Quantity"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  {...register(`combinations.${index}.price`, {
                    required: true,
                  })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Price"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Combinations;
