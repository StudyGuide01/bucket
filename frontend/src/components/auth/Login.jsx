import { useState } from "react";
import { BiShow } from "react-icons/bi";
import { useForm } from "react-hook-form"; //  import react-hook-form
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //  React Hook Form setup
  const {
    register,           
    handleSubmit,       
    formState: { errors },
    reset 
  } = useForm();

  //  On Submit
  const onSubmit = async(data) => {
    setLoading(true)
   try {
    const response = await axios.post('http://localhost:8000/api/v1/user/login',data,{withCredentials:true});
   if(response.data.success){
    dispatch(setUser(response.data.user));
    navigate('/');
     toast.success(response.data.message || "Login successful!");
     reset();
   }else {
      toast.error(response.data.message || "Something went wrong!");
    }
   } catch (error) {
    toast.error(error?.response?.data?.message || "Server error!");
   
   }finally{
    setLoading(false);
   }
   
  };

  return (
    <div className="bg-globalBlack h-screen flex items-center justify-center px-4">
      <div className="bg-white w-[500px] px-4 py-5 rounded-xl">
        {/*  handleSubmit se wrap karo */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

          {/* EMAIL FIELD */}
          <div className="form-group flex flex-col gap-2">
            <label htmlFor="email" className="font-bold uppercase">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              {...register("email", { required: "Email is required"})} 
              className="border border-gray-300 px-2 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
            {/*  Error message */}
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* PASSWORD FIELD */}
          <div className="form-group flex flex-col gap-2">
            <label htmlFor="password" className="font-bold uppercase">Password</label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required"})}
                className="w-full border border-gray-300 px-2 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
              <BiShow
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-4 cursor-pointer"
              />
            </div>
            {/*  Error message */}
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 py-2 rounded-lg text-xl font-normal hover:bg-blue-600"
            >
              
               {loading ? "Please wait..." : "Login"}
            </button>
          </div>

        </form>

        <div>
            <p className="text-center mt-3">Don't have  an Account<Link to={'/register'} className="text-blue-500 uppercase ml-1 underline underline-offset-2">Register</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
