import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../api/axios";
import { useState } from "react";

const Signup = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);  

  const submit = async (data) => {
    try {
      setLoading(true);      
      setError("");

      const res = await api.post("/auth/signup", data);

      console.log("Signup success:", res.data.user);

      navigate("/login");
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response?.data?.message);
      } else {
        setError("failed to create Account");
      }
    } finally {
      setLoading(false);    
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center justify-center 
                   w-10 h-10 rounded-full bg-white shadow-md 
                   hover:shadow-lg transition"
      >
        <ArrowLeft className="w-5 h-5 text-gray-800" />
      </button>

      <form
        onSubmit={handleSubmit(submit)}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-900 text-center">
          Create your account
        </h2>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Name</label>
          <input
            {...register("userName")}
            type="text"
            placeholder="Enter your name"
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
            disabled={loading}  
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            {...register("email")}
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
            disabled={loading}   
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            {...register("password")}
            type="password"
            placeholder="Enter your password"
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
            disabled={loading}   
          />
        </div>

        <p className="text-red-500 text-sm text-center mb-2">
          {error}
        </p>

        <button
          type="submit"
          disabled={loading}   
          className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Creating account..." : "Sign up"}  
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?
          <Link to="/login" className="text-rose-500 ml-1 font-medium">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
