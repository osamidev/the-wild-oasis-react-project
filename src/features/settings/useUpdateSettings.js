import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useEditSetting() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
      toast.success("Settings were successfully updated!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, updateSetting };
}
