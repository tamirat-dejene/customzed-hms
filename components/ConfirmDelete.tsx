import React from "react";
import Button from "./Button";
import SpinnerMini from "./Loader";
import { useTranslations } from "next-intl";

interface ConfirmDeleteProps {
  resourceName: string;
  onConfirm: (fn?: () => void) => void;
  disabled: boolean;
  onCloseModal?: () => void;
  isLoading?: boolean;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
  isLoading,
}) => {
  const onDelete = () => {
    onConfirm(onCloseModal);
  };

  const t = useTranslations("components.confirmDelete");

  return (
    <div className="w-[400px] flex flex-col gap-3">
      <h1 className="text-[20px] font-medium dark:text-gray-300">
        {t('delete')} {resourceName}
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-[13.75px] leading-[1.6] mb-4">
        {t('warning1')} {resourceName} {t('warning2')}
      </p>

      <div className="flex justify-end gap-3">
        <Button
          variant="secondary"
          disabled={disabled}
          onClick={() => onCloseModal?.()}
        >
          {t('cancel')}
        </Button>
        <Button
          variant="danger"
          className="flex items-center gap-2"
          disabled={disabled}
          onClick={onDelete}
        >
          {isLoading && <SpinnerMini />}
          <span> {t('delete')}</span>
        </Button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
