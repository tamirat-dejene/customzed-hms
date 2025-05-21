"use client";
import React from "react";
import Button from "@/components/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "@/components/Modal";
import { useTranslations } from "next-intl";

const AddCabin = () => {
  const t = useTranslations('home.cabins.addCabin');
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button className="max-w-fit ml-auto">{t('title')}</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
};

export default AddCabin;
