import React from 'react'
import Filter from '@/components/Filter'
import { useTranslations } from 'next-intl'

const DashboardFilter = () => {
  const t = useTranslations('home.dashboard.filter')
  return (
    <Filter
      filterField="last"
      options={[
        { value: "7", label: t('label1') },
        { value: "30", label: t('label2') },
        { value: "90", label: t('label3') },
      ]}
    />
  )
}

export default DashboardFilter