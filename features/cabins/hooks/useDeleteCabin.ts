import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteCabin as removeCabin } from "@/services/apiCabin";
import { useTranslations } from "next-intl";

export const useDeleteCabin = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("features.cabins.hooks");

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: removeCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success(t('delete'));
    },
    onError: (err: any) => {
      toast.error(err.message);
    },
  });

  return { isDeleting, deleteCabin };
};
