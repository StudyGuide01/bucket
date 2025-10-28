import axios from "axios";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { RxAvatar } from "react-icons/rx";

const CreateChannel = () => {
  // refs
  const photoRef = useRef(null);
  const bannerRef = useRef(null);

  // local states
  const [photo, setPhoto] = useState(null);
  const [banner, setBanner] = useState(null);

  // form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // handlers
  const handlePhotoClick = () => {
    if (photoRef.current) {
      photoRef.current.click();
    }
  };

  const handleBannerClick = () => {
    if (bannerRef.current) {
      bannerRef.current.click();
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBanner(file);
    }
  };

  // form submit
  const onSubmit = async(data) => {
    const formData = new FormData();
    if (photo) formData.append("photo", photo);
    if (banner) formData.append("banner", banner);
    formData.append("channelName", data.channelName);
    formData.append("description", data.description);
    formData.append("category", data.category);

    // console.log('data',data);

    // ✅ Convert FormData to object safely (for debugging)
    const entries = {};
    for (let [key, value] of formData.entries()) {
        console.log(key, value)
      entries[key] = value instanceof File ? value.name : value;
    }
    console.log("Form submitted:", entries);
 
   try {

const response = await axios.post(
  "http://localhost:8000/api/v1/channel/create-channel",
  formData,
  {
    withCredentials: true, 
    headers: {
      "Content-Type": "multipart/form-data", 
    },
  }
);
    console.log(response.data)
     // Reset form and previews
    // reset();
    setPhoto(null);
    setBanner(null);

    // ✅ Important: also clear file inputs
    if (photoRef.current) photoRef.current.value = "";
    if (bannerRef.current) bannerRef.current.value = "";
   } catch (error) {
    console.log('frontend error to create channel',error)
   }
  };

  return (
    <div className="bg-globalBlack w-full h-screen flex items-center justify-center">
      <div className="bg-white w-[500px] px-6 py-6 rounded-2xl shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-6 uppercase">
          Create Channel
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-2">
            <div
              onClick={handlePhotoClick}
              className="flex flex-col items-center cursor-pointer"
            >
              {photo ? (
                <img
                  src={URL.createObjectURL(photo)}
                  alt="avatar"
                  className="w-24 h-24 rounded-full object-cover object-top border-2 border-gray-300"
                />
              ) : (
                <RxAvatar className="w-24 h-24 text-gray-500" />
              )}
              <p className="text-sm text-blue-500 font-medium">
                {photo ? "Change Avatar" : "Upload Avatar"}
              </p>
            </div>
            <input
              type="file"
              accept="image/*"
              ref={photoRef}
              onChange={handlePhotoChange}
              className="hidden"
            />
            {errors.photo && (
              <p className="text-red-500 text-sm">{errors.photo.message}</p>
            )}
          </div>

          {/* Channel Name */}
          <div className="flex flex-col gap-2">
            <label className="font-bold uppercase text-sm">Channel Name</label>
            <input
              type="text"
              placeholder="Enter channel name"
              {...register("channelName", {
                required: "Channel name is required",
              })}
              className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            {errors.channelName && (
              <p className="text-red-500 text-sm">
                {errors.channelName.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="font-bold uppercase text-sm">Description</label>
            <input
              type="text"
              placeholder="Enter description"
              {...register("description", {
                required: "Description is required",
              })}
              className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="font-bold uppercase text-sm">Category</label>
            <input
              type="text"
              placeholder="Enter category"
              {...register("category", { required: "Category is required" })}
              className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            {errors.category && (
              <p className="text-red-500 text-sm">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Banner Upload */}
          <div className="flex flex-col gap-2">
            <label className="font-bold uppercase text-sm">Banner</label>
            <div
              className="w-full h-40 border border-gray-400 flex items-center justify-center rounded-lg cursor-pointer overflow-hidden"
              onClick={handleBannerClick}
            >
              {banner ? (
                <img
                  src={URL.createObjectURL(banner)}
                  alt="banner"
                  className="w-full h-full object-cover"
                />
              ) : (
                <p className="text-blue-500 font-medium">
                  Upload Banner
                </p>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              ref={bannerRef}
              onChange={handleBannerChange}
              className="hidden"
            />
            {errors.banner && (
              <p className="text-red-500 text-sm">{errors.banner.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-lg font-semibold transition-all duration-200"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateChannel;
