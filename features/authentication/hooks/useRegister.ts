import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createUser } from "@/services/apiAuth";
import { useTranslations } from "next-intl";

export const useRegister = () => {
  const t = useTranslations("features.auth.hooks");

  const { mutate: registerUser, isLoading } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success(
        t('register')
      );
    },
  });

  return { registerUser, isLoading };
};
