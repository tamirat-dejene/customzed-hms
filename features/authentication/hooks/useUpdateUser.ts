import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateUser as updateUserApi } from "@/services/apiAuth";
import { useTranslations } from "next-intl";

export const useUpdateUser = () => {
  const t = useTranslations("features.auth.hooks");

  const { mutate: updateUser, isLoading:isUpdating } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
      toast.success(t('update'));
    },
  });

  return { updateUser, isUpdating };
};
