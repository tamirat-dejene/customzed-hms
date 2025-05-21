import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteBooking as deleteBookingApi} from "@/services/apiBooking";
import { useTranslations } from "next-intl";


export const useDeleteBooking = () => {
  const t = useTranslations("features.booking.hooks");

  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      toast.success(t('delete'));
    },
    onError: (err: any) => {
      toast.error(err.message);
    },
  });

  return { isDeleting, deleteBooking };
};
