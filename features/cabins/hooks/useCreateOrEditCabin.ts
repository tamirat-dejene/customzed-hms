import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "@/services/apiCabin";
import { useTranslations } from "next-intl";

export const useCreateOrEditCabin = (isEditSession?: boolean) => {
  const t = useTranslations("features.cabins.hooks");

  const queryClient = useQueryClient();

  const { mutate: createOrEditCabin, isLoading: isWorking } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success(`${isEditSession ? t("edit") : t("create")}`);
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err: any) => {
      toast.error(err.message);
    },
  });

  return { isWorking, createOrEditCabin };
};
