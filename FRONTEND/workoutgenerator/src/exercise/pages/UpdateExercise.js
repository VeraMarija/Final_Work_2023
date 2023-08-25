import React, { useContext, useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Multiselect } from "multiselect-react-dropdown";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_MIN, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import "./ExerciseForm.css";
import { AuthContext } from "../../shared/context/authContext";
import { useHttpHook } from "../../shared/hooks/httpHook";
import { port_string } from "../../config/global";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Avatar from "../../shared/components/UIElements/Avatar";
import {equipmentOptions} from '../../config/dropdown_equipment';
import ExerciseProfile from "./ExerciseProfile";


const UpdateExercise = () => {
  const location = useLocation();
  const id = useParams().exerciseId;
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, removeError } = useHttpHook();
  const navigate= useNavigate();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: location?.state?.name,
      instructions: location?.state?.instructions,
      equipment: location?.state?.equipment,
    },
  });

  /*const [imgSrc, setImgSrc] = useState(
    "http://localhost:3001/uploads/" + location?.state?.picture
  );

  const handleImageChange = (e) => {
    setImgSrc(URL.createObjectURL(e.target.files[0]));
  };

  const picture = location?.state?.picture;*/
  const updateOnSubmit = async (data) => {
    try {
      //stavi neke default vrijednosti za equipment niz njih i to korisnti da korisnik dropdown uzme
    
      const responseData = await sendRequest(
        port_string + "exercises/" + id,
        "PUT",
        JSON.stringify({
            name: data.name,
            instructions: data.instructions,
            equipment: data.equipment,
          }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token.token,
          }
      );
      navigate('/exerciseProfile/' + id);
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
    <div className="exercise-form-main">
      <ErrorModal error={error} onClear={removeError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <form
        className="exercise-form"
        onSubmit={handleSubmit(updateOnSubmit)}
        encType="multipart/form-data"
      >
        <h3>Update exercise</h3>
        <label>Name</label>
        <input
          type="text"
          name="name"
          {...register("name", {
            required: "Name is required.",
          })}
        />
        {errors.name && <p className="errorMsg">{errors.name.message}</p>}
        <label>Instructions</label>
        <textarea
          id="textarea"
          name="instructions"
          {...register("instructions", {
            required: "Instructions are required.",
          })}
        />
        {errors.instructions && (
          <p className="errorMsg">{errors.instructions.message}</p>
        )}
        <label>Equipment</label>
        <Controller
          control={control}
          name="equipment"
          render={({ field: { value, onChange } }) => (
            <Multiselect
              options={equipmentOptions}
              isObject={false}
              showCheckbox={true}
              hidePlaceholder={true}
              closeOnSelect={false}
              onSelect={onChange}
              onRemove={onChange}
              selectedValues={value}
            />
          )}
        />
        {errors.equipment && (
          <p className="errorMsg">{errors.equipment.message}</p>
        )}
        <div className="form-control">
          <label></label>
          <Button type="submit">Edit</Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateExercise;
