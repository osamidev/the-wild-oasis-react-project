import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";
import { useQueryClient } from "@tanstack/react-query";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabin was edited successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isEditing, editCabin };
}
