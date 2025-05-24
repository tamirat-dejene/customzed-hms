"use client"
import React from 'react'
import Filter from '@/components/Filter'
import { useTranslations } from 'next-intl'
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FileDown } from 'lucide-react';
import Button from '@/components/Button';

const exportDashboardToPDF = async () => {
  const dashboard = document.getElementById("dashboard-analytics");
  if (!dashboard) return;

  const canvas = await html2canvas(dashboard, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");

  const imgWidth = 210;
  const pageHeight = 297;
  const pdf = new jsPDF("p", "mm", "a4");

  const pxPerMm = 1 / 0.264583;
  const imgHeight = canvas.height / pxPerMm;
  const heightLeft = imgHeight;
  let position = 0;

  let remainingHeight = imgHeight;

  while (remainingHeight > 0) {
    pdf.addImage(
      imgData,
      "PNG",
      0,
      position,
      imgWidth,
      (canvas.height * imgWidth) / canvas.width
    );
    remainingHeight -= pageHeight;
    position -= pageHeight;

    if (remainingHeight > 0) {
      pdf.addPage();
    }
  }

  pdf.save("dashboard-analytics.pdf");
};

const DashboardFilter = () => {
  const t = useTranslations('home.dashboard.filter')
  return (
    <div>
      <Button className='flex gap-2 mb-2' onClick={exportDashboardToPDF}>
        <FileDown size={18} />
        {t('convert')}
      </Button>
      <Filter
        filterField="last"
        options={[
          { value: "7", label: t('label1') },
          { value: "30", label: t('label2') },
          { value: "90", label: t('label3') },
        ]}
      />
    </div>
  )
}

export default DashboardFilter