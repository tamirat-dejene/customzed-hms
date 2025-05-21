import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "@/services/apiBooking";
import { useTranslations } from "next-intl";

export const useCheckin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const t = useTranslations("features.checkinout.hooks");

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ id, breakfast }: { id: string; breakfast?: {} }) =>
      updateBooking(id, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`${t('toast1')}${data.cabin.name} ${t('toast2')}`);
      queryClient.invalidateQueries();
      router.push("/dashboard");
    },
    onError: () => {
      toast.error(t('checkinerror'));
    },
  });

  return { checkin, isCheckingIn };
};
