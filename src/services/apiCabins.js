import { supabase } from "./supabase";

export async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  } else return cabins;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}

export async function createEditCabin(cabin, id) {
  const hasImagePath = cabin.image?.startsWith?.(
    import.meta.env.VITE_SUPABASE_URL
  );
  const imageName = `${Math.random().toString(36).substring(2, 15)}-${
    cabin.image.name
  }`.replaceAll("/", "");
  const imagePath = hasImagePath
    ? cabin.image
    : `${
        import.meta.env.VITE_SUPABASE_URL
      }/storage/v1/object/public/cabins-images/${imageName}`;

  // 1. Create/Edit cabin

  let query = supabase.from("cabins");

  // Create new cabin
  if (!id) query = query.insert([{ ...cabin, image: imagePath }]);
  // Edit existing cabin
  else query = query.update({ ...cabin, image: cabin.image }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }
  // 2. Upload image

  if (hasImagePath) return;
  const { error: storageError } = await supabase.storage
    .from("cabins-images")
    .upload(imageName, cabin.image);

  // 3. Delete cabin if image upload fails
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Image upload failed, cabin was not created");
  }
}
