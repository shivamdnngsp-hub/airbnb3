import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import AddListingDetails from "./addListingDetails";
import AddListingCategory from "./addListingCategory";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

const AddListing = () => {
  const { id } = useParams()
const [loading, setLoading] = useState(false);

  const isEdit = Boolean(id)
  const [error, setError] = useState("");
  useEffect(() => {


    if (!isEdit) {
      return
    }

    const fetchListing = async () => {
      try {
        const res = await api.get(`/listing/details/${id}`);
        methods.reset({
          title: res.data.title,
          location: res.data.location,
          description: res.data.description,
          price: res.data.price,
          category: res.data.category,
          lat: res.data.lat,
          lng: res.data.lng,
        });

      } catch (error) {
        console.log("profile update failed")
      }
    }
    fetchListing()
  }, [id])


  const navigate = useNavigate()
  const [step, setStep] = useState(1);




  const methods = useForm({
    defaultValues: {
      title: "",
      location: "",
      description: "",
      price: "",
      category: "",
      lat: null,
      lng: null,
    },
  });


  const submit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("location", data.location);
      formData.append("category", data.category);
      if (data.lat !== null) formData.append("lat", data.lat);
      if (data.lng !== null) formData.append("lng", data.lng);


      if (data.photos && data.photos.length > 0) {
        for (let i = 0; i < data.photos.length; i++) {
          formData.append("photos", data.photos[i]);
        }
      }



      if (isEdit) {
        const res = await api.put(`/listing/edit/${id}`, formData)
      }
      else {
        const res = await api.post(
          "/listing/addListing", formData);
      }

      navigate("/");
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response?.data?.message)
      }
      else {
        setError("failed to add listing")
      }

    }finally {
    setLoading(false); 
  }
  };



  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submit)}>
        {step === 1 && (
          <AddListingCategory next={() => setStep(2)} />
        )}

        {step === 2 && (
          <AddListingDetails back={() => setStep(1)} isEdit={isEdit} error={error}  loading={loading} />
        )}

      </form>
    </FormProvider>
  );
};

export default AddListing;
