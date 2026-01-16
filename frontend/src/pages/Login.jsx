import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import api from "../api/axios";
import { useDispatch } from "react-redux";
import { onlogin } from "../store/authSlice";
import { useState } from "react";


const Login = () => {

  const [error, setError] = useState("")


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm()

  const submit = async (data) => {
    try {
      const res = await api.post("/auth/login", data);

      console.log("Login success:", res.data);
      dispatch(onlogin(res.data.user))

      navigate("/");
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response?.data?.message)
      }
      else {
        setError("failed to login")
      }

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 relative">



      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center justify-center 
             w-10 h-10 rounded-full bg-white shadow-md 
             hover:shadow-lg transition"
      >
        <ArrowLeft className="w-5 h-5 text-gray-800" />
      </button>

      <form className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6" onSubmit={handleSubmit(submit)}>

        <h2 className="text-2xl font-semibold text-gray-900 text-center">
          Login to your account
        </h2>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
            required
          />
        </div>
        <p className="text-red-500 text-sm text-center mb-2">
          {error}
        </p>

        <button
          type="submit"
          className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2.5 rounded-lg transition"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600">
          Create new account
          <Link
            to="/signup"
            className="text-rose-500 font-medium hover:underline ml-1"
          >
            Signup
          </Link>
        </p>

      </form>
    </div>
  );
};

export default Login;
