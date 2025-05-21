import React, { FC } from "react";
import Button from "@/components/Button";
import { useCheckout } from "./hooks/useCheckout";
import { useTranslations } from "next-intl";

interface CheckoutButtonProps {
  bookingId: string;
}

const CheckoutButton: FC<CheckoutButtonProps> = ({ bookingId }) => {
  const { checkout, isCheckingOut } = useCheckout();
  const t = useTranslations("features.checkinout");
  
  return (
    <Button
      variant="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
    >
      {t('checkout')}
    </Button>
  );
};

export default CheckoutButton;
