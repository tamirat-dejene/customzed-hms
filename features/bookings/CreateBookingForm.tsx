import React, { useEffect } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useTranslations } from "next-intl";

import FormRow from "@/components/FormRow";
import Input from "@/components/Input";
import Button from "@/components/Button";
import SpinnerMini from "@/components/Loader";
import toast from 'react-hot-toast';

import { useAvailableCabins } from "./hooks/useAvailableCabins";
import { createBooking } from "@/services/apiBooking";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface CreateBookingFormProps {
    onCloseModal?: () => void;
}

const CreateBookingForm: React.FC<CreateBookingFormProps> = ({ onCloseModal }) => {
    const t = useTranslations("home.bookings.createBookingForm");
    const searchParams = useSearchParams();
    const { locale } = useParams();
    const router = useRouter();

    const callbackUrl = searchParams.get("callbackUrl") || `/${locale}/bookings`; 

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            fullName: "Ta De",
            email: "ta.de@gmail.com",
            checkInDate: "",
            numberOfGuests: 1,
            minPrice: 50,
            maxPrice: 500,
            numberOfDays: 1,
            hasBreakfast: false,
            observations: "gluten free",
            cabinId: "",
            amount: 0,
        },
    });

    const checkInDate = watch("checkInDate");
    const numberOfGuests = watch("numberOfGuests");
    const minPrice = watch("minPrice");
    const maxPrice = watch("maxPrice");
    const numberOfDays = watch("numberOfDays");
    const selectedCabinId = watch("cabinId");
    const includeBreakfast = watch("hasBreakfast");

    const { data: availableCabins = [], isLoading: isLoadingCabins } = useAvailableCabins({
        checkInDate,
        numberOfGuests,
        priceRange: [minPrice, maxPrice],
    });


    useEffect(() => {
        if (!selectedCabinId || !numberOfDays) return;
        const selectedCabin = availableCabins.find((c) => c.id === selectedCabinId);
        if (selectedCabin) {
            const tot_price = selectedCabin.regularPrice * numberOfDays + (includeBreakfast ? 15 * numberOfDays : 0);
            setValue("amount", tot_price);
        }
    }, [selectedCabinId, numberOfDays, availableCabins, setValue, includeBreakfast]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        createBooking(data).then(cb => {
            if (cb?.error) {
                toast.error(cb.error);
                return;
            }

            if (cb?.ok) {
                toast.success("Booking created Succesfully");
                router.push(callbackUrl);
              }
        });
        reset();
        onCloseModal?.();
    };

    const onError = (err: any) => {
        console.log(err);
    };

    return (
        <form className="w-[800px] text-[14px]" onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow label={t("formRow.fullName")} error={errors?.fullName?.message} id="fullName">
                <Input
                    id="fullName"
                    type="text"
                    disabled={isSubmitting}
                    {...register("fullName", { required: t("input.required") })}
                />
            </FormRow>

            <FormRow label={t("formRow.email")} error={errors?.email?.message} id="email">
                <Input
                    id="email"
                    type="email"
                    disabled={isSubmitting}
                    {...register("email", { required: t("input.required") })}
                />
            </FormRow>

            <FormRow label={t("formRow.checkIn")} error={errors?.checkInDate?.message} id="checkInDate">
                <Input
                    id="checkInDate"
                    type="date"
                    disabled={isSubmitting}
                    {...register("checkInDate", { required: t("input.required") })}
                />
            </FormRow>

            <FormRow label={t("formRow.guests")} error={errors?.numberOfGuests?.message} id="numberOfGuests">
                <Input
                    id="numberOfGuests"
                    type="number"
                    disabled={isSubmitting}
                    {...register("numberOfGuests", {
                        required: t("input.required"),
                        min: { value: 1, message: t("input.minGuests") },
                    })}
                />
            </FormRow>

            <FormRow label={t("formRow.minPrice")} error={errors?.minPrice?.message} id="minPrice">
                <Input
                    id="minPrice"
                    type="number"
                    disabled={isSubmitting}
                    {...register("minPrice", {
                        required: t("input.required"),
                        min: { value: 0, message: t("input.minPrice") },
                    })}
                />
            </FormRow>

            <FormRow label={t("formRow.maxPrice")} error={errors?.maxPrice?.message} id="maxPrice">
                <Input
                    id="maxPrice"
                    type="number"
                    disabled={isSubmitting}
                    {...register("maxPrice", {
                        required: t("input.required"),
                        min: { value: 0, message: t("input.maxPrice") },
                    })}
                />
            </FormRow>

            <FormRow label={t("formRow.days")} error={errors?.numberOfDays?.message} id="numberOfDays">
                <Input
                    id="numberOfDays"
                    type="number"
                    disabled={isSubmitting}
                    {...register("numberOfDays", {
                        required: t("input.required"),
                        min: { value: 1, message: t("input.minDays") },
                    })}
                />
            </FormRow>

            <FormRow label={t("formRow.cabin")} error={errors?.cabinId?.message} id="cabinId">
                <select
                    id="cabinId"
                    disabled={isSubmitting || isLoadingCabins}
                    {...register("cabinId", { required: t("input.required") })}
                    className="input"
                >
                    <option value="">{t("selectCabin")}</option>
                    {availableCabins.map((cabin) => (
                        <option key={cabin.id} value={cabin.id}>
                            {cabin.name}
                        </option>
                    ))}
                </select>
            </FormRow>

            <FormRow label={t("formRow.includeBreakfast")} id="includeBreakfast">
                <input
                    id="includeBreakfast"
                    type="checkbox"
                    disabled={isSubmitting}
                    {...register("hasBreakfast")}
                    className="scale-125 accent-green-600"
                />
            </FormRow>

            {includeBreakfast && (
                <FormRow label={t("formRow.breakfastNote")} error={errors?.observations?.message} id="breakfastNote">
                    <textarea
                        id="breakfastNote"
                        rows={3}
                        disabled={isSubmitting}
                        placeholder={t('formRow.bnotePlaceholder')}
                        {...register("observations")}
                        className="input"
                    />
                </FormRow>
            )}

            <FormRow label={t("formRow.total")} error={errors?.amount?.message} id="amount">
                <Input id="amount" type="number" disabled {...register("amount")} />
            </FormRow>

            <FormRow hasButton>
                <Button type="reset" variant="secondary" onClick={() => onCloseModal?.()}>
                    {t("cancel")}
                </Button>
                <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
                    {isSubmitting && <SpinnerMini />}
                    <span>{t("bookNow")}</span>
                </Button>
            </FormRow>
        </form>
    );
};

export default CreateBookingForm;
