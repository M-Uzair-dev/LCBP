import React, { useEffect, useState } from "react";
import "./gigdetails.css";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toast } from "sonner";

const Addgig = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [selectedImage, setSelectedImage] = useState(null);
  const [data, setData] = useState({
    title: "",
    description: "",
    name: "",
    about: "",
    from: "",
    time: "",
    gender: "",
    age: "",
    experience: "",
    field: "",
    email: "",
    number: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);

  function isValidNumber(inputString) {
    return /^\d+$/.test(inputString);
  }
  useEffect(() => {
    const aboutUser = localStorage.getItem("ABOUTUSER");
    const fromUser = localStorage.getItem("FROMUSER");
    const timeUser = localStorage.getItem("TIMEUSER");
    const genderUser = localStorage.getItem("GENDERUSER");
    const ageUser = localStorage.getItem("AGEUSER");
    const experienceUser = localStorage.getItem("EXPERIENCEUSER");
    const fieldUser = localStorage.getItem("FIELDUSER");
    const lcbpName = localStorage.getItem("LCBPNAME");
    const lcbpPhone = localStorage.getItem("LCBPPHONE");
    const lcbpEmail = localStorage.getItem("LCBPEMAIL");

    if (aboutUser) {
      setData((prevData) => ({
        ...prevData,
        about: aboutUser,
      }));
    }

    if (fromUser) {
      setData((prevData) => ({
        ...prevData,
        from: fromUser,
      }));
    }

    if (timeUser) {
      setData((prevData) => ({
        ...prevData,
        time: timeUser,
      }));
    }

    if (genderUser) {
      setData((prevData) => ({
        ...prevData,
        gender: genderUser,
      }));
    }

    if (ageUser) {
      setData((prevData) => ({
        ...prevData,
        age: ageUser,
      }));
    }

    if (experienceUser) {
      setData((prevData) => ({
        ...prevData,
        experience: experienceUser,
      }));
    }

    if (fieldUser) {
      setData((prevData) => ({
        ...prevData,
        field: fieldUser,
      }));
    }

    if (lcbpName) {
      setData((prevData) => ({
        ...prevData,
        name: lcbpName,
      }));
    }

    if (lcbpPhone) {
      setData((prevData) => ({
        ...prevData,
        number: lcbpPhone,
      }));
    }

    if (lcbpEmail) {
      setData((prevData) => ({
        ...prevData,
        email: lcbpEmail,
      }));
    }
  }, []);

  const add = async () => {
    try {
      if (!selectedImage) {
        toast.error("No image selected.");
        return;
      } else if (
        selectedImage.type !== "image/jpeg" &&
        selectedImage.type !== "image/png" &&
        selectedImage.type !== "image/jpg"
      ) {
        toast.error(
          "Invalid image format. Only JPEG, PNG, and JPG formats are allowed."
        );
        return;
      }

      if (!isValidNumber(data.number)) {
        toast.error("Phone number can only contain numbers");
        setLoading(false);
        return;
      } else if (!isValidNumber(data.price)) {
        toast.error("Price can only contain numbers");
        setLoading(false);
        return;
      } else if (data.number.length < 10) {
        toast.error("Phone number must be 11 digits");
        setLoading(false);
        return;
      }
      setLoading(true);
      let image = new FormData();
      image.append("file", selectedImage);
      image.append("cloud_name", "dbntul88v");
      image.append("upload_preset", "pvkxzd6k");
      const url = "https://api.cloudinary.com/v1_1/dbntul88v/image/upload";
      const resp = await fetch(url, {
        method: "POST",
        body: image,
      });
      const data1 = await resp.json();
      if (!data1) {
        toast("Error with image");
        return;
      }
      let res = await fetch(`${apiUrl}/api/gig/addgig`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          imageurl: data1.url,
          byname: localStorage.getItem("LCBPNAME"),
          byimage: localStorage.getItem("LCBPIMAGEURL"),
          byid: localStorage.getItem("AUTHUSERUNIQUEID"),
        }),
      });

      let result = await res.json();

      console.log(result);

      if (result.banned) {
        localStorage.clear();
        navigate("/login");
        return;
      }

      if (!result.success) {
        console.log("here");
        toast.error(result.message);
        setLoading(false);
        return;
      }

      toast.success("gig Added successfully");

      localStorage.setItem("ABOUTUSER", result.data.about);
      localStorage.setItem("FROMUSER", result.data.from);
      localStorage.setItem("TIMEUSER", result.data.time);
      localStorage.setItem("GENDERUSER", result.data.gender);
      localStorage.setItem("AGEUSER", result.data.age);
      localStorage.setItem("EXPERIENCEUSER", result.data.experience);
      localStorage.setItem("FIELDUSER", result.data.field);

      navigate("/profile");
      setLoading(false);
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
  };
  return (
    <div className="addgigpage">
      <div className="Back" onClick={() => navigate("/")}>
        <ArrowBackIcon />
      </div>
      <h1>Add Gig</h1>
      <div className={selectedImage ? "imageInputDiv green" : "imageInputDiv"}>
        <input
          type="file"
          onChange={(e) => setSelectedImage(e.target.files[0])}
          accept="image/png image/jpeg image/jpg"
        />
        <h1>+</h1>
      </div>
      <div className="inputsWrapper">
        <input
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          type="text"
          placeholder="Title"
        />
        <textarea
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          type="text"
          placeholder="Description"
        />
        <input
          value={data.price}
          onChange={(e) => setData({ ...data, price: e.target.value })}
          type="text"
          placeholder="Price"
        />
        <input
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          type="text"
          placeholder="Name"
        />
        <textarea
          value={data.about}
          onChange={(e) => setData({ ...data, about: e.target.value })}
          type="text"
          placeholder="About"
        />
        <input
          value={data.from}
          onChange={(e) => setData({ ...data, from: e.target.value })}
          type="text"
          placeholder="From"
        />
        <input
          value={data.time}
          onChange={(e) => setData({ ...data, time: e.target.value })}
          type="text"
          placeholder="Time Availablity"
        />
        <input
          value={data.gender}
          onChange={(e) => setData({ ...data, gender: e.target.value })}
          type="text"
          placeholder="Gender"
        />
        <input
          value={data.age}
          onChange={(e) => setData({ ...data, age: e.target.value })}
          type="text"
          placeholder="Age"
        />
        <input
          value={data.experience}
          onChange={(e) => setData({ ...data, experience: e.target.value })}
          type="text"
          placeholder="Experience"
        />
        <input
          value={data.field}
          onChange={(e) => setData({ ...data, field: e.target.value })}
          type="text"
          placeholder="Field of experience"
        />
        <input
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          type="text"
          placeholder="email"
        />
        <input
          value={data.number}
          onChange={(e) => setData({ ...data, number: e.target.value })}
          type="text"
          placeholder="phone number"
        />
        {loading ? (
          <button>Adding...</button>
        ) : (
          <button onClick={add}> Add</button>
        )}
      </div>
    </div>
  );
};

export default Addgig;
