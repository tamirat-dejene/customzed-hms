import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "@/services/apiBooking";
import { useTranslations } from "next-intl";

export const useCheckout = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("features.checkinout.hooks");

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (id: string) =>
      updateBooking(id, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.cabin.name} ${t('toast3')}`);
      queryClient.invalidateQueries();
    },
    onError: () => {
      toast.error(t('checkouterror'));
    },
  });

  return { checkout, isCheckingOut };
};
