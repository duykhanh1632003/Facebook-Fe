import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import slugify from "slugify";
import axios from "axios";
import uploadToFirebase from "../../../../../config/uploadToFirebase";
import { generateAttributes } from "../../../../../util/util";

import ProductName from "./FormFields/ProductName";
import ProductDescription from "./FormFields/ProductDescription";
import ProductType from "./FormFields/ProductType";
import Thumbnail from "./Images/Thumbnail";
import LoadingDisplay from "./ErrorAndLoading/LoadingDisplay";
import Attributes from "./Attributes/Attributes";
import Combinations from "./Combinations/Combinations";
import ErrorDisplay from "./ErrorAndLoading/ErrorDisplay";
import Images from "./Images/Images";
import { axiosHaveAuth } from "../../../../../util/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const { register, handleSubmit, control, setValue, getValues, watch, reset } =
    useForm({
      defaultValues: {
        attributes: [],
        images: [],
        product_description: "",
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "attributes",
  });
  const instance = axiosHaveAuth();
  const [combinations, setCombinations] = useState([]);
  const [images, setImages] = useState([]);
  const [thumb, setThumb] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const selectedAttributes = watch("attributes");
  const navigate = useNavigate();

  useEffect(() => {
    generateCombinations();
  }, [selectedAttributes]);

  const generateCombinations = () => {
    if (selectedAttributes.length === 0) return;
    const values = selectedAttributes.map((attr) => attr.value.split(","));
    const result = values.reduce((acc, value) => {
      if (acc.length === 0) return value.map((v) => [v]);
      return acc.flatMap((x) => value.map((v) => x.concat(v)));
    }, []);
    setCombinations(result);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      data.product_slug = slugify(data.product_name, { lower: true });

      // Upload images to Firebase
      const imageUrls = await Promise.all(
        images.map((image) => uploadToFirebase(image))
      );
      data.images = imageUrls;

      // Upload thumbnail to Firebase
      if (thumb) {
        data.product_thumb = await uploadToFirebase(thumb);
      }

      const response = await instance.post("/api/products/create", data);
      if (response) {
        toast.success("Create product success");
        navigate("/shop/product-list");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-5 rounded shadow-lg"
      >
        <ProductName register={register} />
        <ProductDescription
          register={register}
          watch={watch}
          setValue={setValue}
        />
        <ProductType register={register} />

        <Attributes
          fields={fields}
          append={append}
          remove={remove}
          register={register}
          setValue={setValue}
          getValues={getValues}
          watch={watch}
          attributes={generateAttributes()}
        />

        {combinations.length > 0 && (
          <Combinations
            combinations={combinations}
            selectedAttributes={selectedAttributes}
            register={register}
          />
        )}

        <Images images={images} setImages={setImages} />
        <Thumbnail thumb={thumb} setThumb={setThumb} />

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            Create Product
          </button>
          <LoadingDisplay loading={loading} />
          <ErrorDisplay error={error} />
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
