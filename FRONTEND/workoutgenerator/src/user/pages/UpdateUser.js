import React, { useContext, useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_MIN, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import "./UserForm.css";
import { AuthContext } from "../../shared/context/authContext";
import { useHttpHook } from "../../shared/hooks/httpHook";
import { port_string } from "../../config/global";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Avatar from "../../shared/components/UIElements/Avatar";

const UpdateUser = () => {
  const location = useLocation();
  console.log("location", location);
  const id = useParams().userId;
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, removeError } = useHttpHook();
  const navigate = useNavigate();
  const [status, setStatus] = useState(location?.state?.isActive);
  console.log("status", location?.state?.isActive);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: location?.state?.email,
      firstName: location?.state?.firstName,
      lastName: location?.state?.lastName,
      picture: location?.state?.picture,
    },
  });

  const [imgSrc, setImgSrc] = useState(false);

  useEffect(() => {
    if (location?.state?.picture) {
      setImgSrc("http://localhost:3001/uploads/" + location?.state?.picture);
    }
    else{
      setImgSrc("/profile.jpeg");
    }
  }, []);

  /*  const [imgSrc, setImgSrc] = useState(
    "http://localhost:3001/uploads/" + location?.state?.picture
  );
 */
  const handleImageChange = (e) => {
    setImgSrc(URL.createObjectURL(e.target.files[0]));
  };

  const picture = location?.state?.picture;
  const updateOnSubmit = async (data) => {
    console.log("data", data);
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      if(data.isActive){
        formData.append("isActive", data.isActive);
      }

      if (data.picture && imgSrc !== "profile.jpeg") {
        formData.append("picture", data.picture[0]);
      }

      const responseData = await sendRequest(
        port_string + "users/" + id,
        "PUT",
        formData,
        {
          Authorization: "Bearer " + auth.token.token,
        }
      );
      navigate("/profile/" + id);
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading....</h2>
      </div>
    );
  }

  return (
    <div className="user-form-main">
      <ErrorModal error={error} onClear={removeError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <form
        className="user-form"
        onSubmit={handleSubmit(updateOnSubmit)}
        encType="multipart/form-data"
      >
        <h3>Update user</h3>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          {...register("firstName", {
            required: "First name is required.",
          })}
        />
        {errors.firstName && (
          <p className="errorMsg">{errors.firstName.message}</p>
        )}
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          {...register("lastName", {
            required: "Last name is required.",
          })}
        />
        {errors.lastName && (
          <p className="errorMsg">{errors.lastName.message}</p>
        )}
        <label>Email</label>
        <input
          type="text"
          name="email"
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Email is not valid.",
            },
          })}
        />
        {errors.email && <p className="errorMsg">{errors.email.message}</p>}
        {auth.role === "admin" && !status && (
          <React.Fragment>
            <div className="checkbox">
              <a>Make user active again</a>
              <input
                name="isActive"
                type="checkbox"
                {...register("isActive")}
                id="isActive"
              />
            </div>
          </React.Fragment>
        )}
        {imgSrc && (
          <React.Fragment>
            <label>Picture</label>
            <input
              type="file"
              name="picture"
              {...register("picture")}
              onChange={handleImageChange}
            />
            {errors.picture && (
              <p className="errorMsg">{errors.picture.message}</p>
            )}

            <Avatar image={imgSrc} alt="picture-update" />
          </React.Fragment>
        )}

        <div className="form-control">
          <label></label>
          <Button type="submit">Edit</Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
