import { useState } from "react";
import { BiShow } from "react-icons/bi";
import { useForm } from "react-hook-form"; //  import react-hook-form
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";

const Register = () => {
  const [loading,setLoading] = useState(false);
 const { register, handleSubmit, formState:{errors},reset} = useForm()
 const navigate = useNavigate();

  const onSubmit = async (data) => {
  setLoading(true);
  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/user/register",
      data,
      { withCredentials: true }
    );

    if (response.data.success) {
      navigate('/login')
      toast.success(response.data.message || "Registration successful!");
      reset(); 
    } else {
      toast.error(response.data.message || "Something went wrong!");
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || "Server error!");
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="bg-globalBlack h-screen flex items-center justify-center px-4">
      <div className="bg-white w-[500px] px-4 py-5 rounded-xl">
      
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">


             {/* Name FIELD */}
          <div className="form-group flex flex-col gap-2">
            <label htmlFor="name" className="font-bold uppercase">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Name"
             {...register("name",{required:'name is requried',
                minLength:{value:2,message:'name shoudl be more then 2 character'},
                maxLength:{value:15,message:"name should be less then 15 character"}
             })}
              className="border border-gray-300 px-2 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          
          {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* EMAIL FIELD */}
          <div className="form-group flex flex-col gap-2">
            <label htmlFor="email" className="font-bold uppercase">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
             {...register('email',{required:'email is required',
                pattern:{
                     value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,16}$/,
                     message:'invalid email'
                }
             })}
              className="border border-gray-300 px-2 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

          </div>

          {/* PASSWORD FIELD */}
          <div className="form-group flex flex-col gap-2">
            <label htmlFor="password" className="font-bold uppercase">Password</label>
            <div className="relative w-full">
              <input
                type='text'
                id="password"
                placeholder="Password"
              {...register("password", {
  required: "Password is required",
  pattern: {
    value: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    message: "Password must contain at least 8 characters, one uppercase, one lowercase, and one number or special character",
  },
})}

                className="w-full border border-gray-300 px-2 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
              />


               {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            </div>
           
          </div>

          {/* SUBMIT BUTTON */}
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 py-2 rounded-lg text-xl font-normal hover:bg-blue-600"
            >
             {loading ? "Please wait..." : "Register"}
            </button>
          </div>

        </form>

        <div>
            <p className="text-center mt-3">Already have  an  Account<Link to={'/login'} className="text-blue-500 uppercase ml-1 underline underline-offset-2">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
