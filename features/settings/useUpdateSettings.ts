import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettings as updateSettingsApi } from "@/services/apiSettings";
import { toast } from "react-hot-toast";
import { useTranslations } from "next-intl";

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("features.settings");

  const { isLoading: isUpdating, mutate: updateSettings } = useMutation({
    mutationFn: updateSettingsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
      toast.success(t("update"));
    },
    onError: (err: any) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, updateSettings };
};
