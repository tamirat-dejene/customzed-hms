import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking } from "@/services/apiBooking";
import { useTranslations } from "next-intl";

export const useCreateBooking = () => {
  const t = useTranslations("features.bookings.hooks");
  const queryClient = useQueryClient();

  const { mutate: createBookingMutation, isLoading: isWorking } = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      toast.success(t("create"));
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err: any) => {
      toast.error(err.message);
    },
  });

  return { isWorking, createBookingMutation };
};
