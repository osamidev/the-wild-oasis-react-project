import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";
import { useQueryClient } from "@tanstack/react-query";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isCreating, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("New cabin was created!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isCreating, createCabin };
}
