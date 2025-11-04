import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useEditCabin } from "./useEditCabin";
import { useCreateCabin } from "./useCreateCabin";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;

  const { register, handleSubmit, getValues, reset, formState } = useForm({
    defaultValues: editValues,
  });

  const isEditMode = Boolean(editId);

  const { errors } = formState;

  const { isEditing, editCabin } = useEditCabin();

  const { isCreating, createCabin } = useCreateCabin();

  const isWorking = isCreating || isEditing;

  const onSubmit = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditMode) {
      editCabin({ newCabinData: { ...data, image }, id: data.id });
    } else {
      createCabin(
        { ...data, image },
        {
          onSuccess: (data) => {
            reset();
            console.log("Created cabin:", data);
          },
        }
      );
    }
  };

  const OnError = (errors) => {
    console.error(errors);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, OnError)}>
      <FormRow label={"Cabin name"} error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label={"Maximum capacity"} error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity must be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label={"Regular price"} error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label={"Discount"} error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= Number(getValues().regularPrice) ||
              "Discount must be less than or equal to regular price",
          })}
        />
      </FormRow>

      <FormRow label={"Description"} error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description")}
        />
      </FormRow>

      <FormRow label={"Image"} error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditMode ? false : "Please upload an image file",
            validate: (fileList) => {
              if (isEditMode && typeof fileList === "string") return true;
              return fileList.length > 0 || "Please upload an image file";
            },
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking} onClick={isEditMode && setshowForm(false)}>
          {isEditMode ? "Edit cabin" : "Create new Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
