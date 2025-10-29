import { supabase } from "./supabase";

export async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.erroe(error);
    throw new Error("Cabins could not be loaded");
  } else return { cabins, error };
}
