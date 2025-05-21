import React from 'react'
import RegisterForm from '@/features/authentication/RegisterForm'
import { useTranslations } from 'next-intl'

const Users = () => {
  const t = useTranslations('home.users')

  return (
    <>
      <h1 className="text-[24px] dark:text-gray-100 font-semibold">
        {t('title')}
      </h1>
      <RegisterForm />
    </>
  )
}

export default Users