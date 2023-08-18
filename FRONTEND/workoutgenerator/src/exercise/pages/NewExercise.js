import React, { useContext, Component } from "react";
import { useForm, Controller } from "react-hook-form";
import { Multiselect } from "multiselect-react-dropdown";


import "./ExerciseForm.css";
import Button from "../../shared/components/FormElements/Button";

import { AuthContext } from "../../shared/context/authContext";
import { port_string } from "../../config/global";
import { useHttpHook } from "../../shared/hooks/httpHook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Avatar from "../../shared/components/UIElements/Avatar";

import {equipmentOptions} from '../../config/dropdown_equipment';

const NewExercise = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, removeError } = useHttpHook();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /*  const [imgSrc, setImgSrc] = useState("/profile.jpeg");

  const handleImageChange = (e) => {
    setImgSrc(URL.createObjectURL(e.target.files[0]));
  }; */

  const onSubmit = async (data) => {
    try {
      const responseData = await sendRequest(
        port_string + "exercises/",
        "POST",
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
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <h3>Create exercise</h3>
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
        {/* <input
          type="text"
          name="equipment"
          {...register("equipment", {
            required: "Equipment is required.",
          })}
        />
        {errors.equipment && (
          <p className="errorMsg">{errors.equipment.message}</p>
        )} */}
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
        <div className="form-control">
          <label></label>
          <Button type="submit">Create</Button>
        </div>
      </form>
    </div>
  );
};

export default NewExercise;
