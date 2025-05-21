'use client';

import React from 'react';
import Select from 'react-select';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Globe } from 'lucide-react';
import { useDarkMode } from '@/context/DarkModeContext';

interface LanguageOption {
    value: string;
    label: string;
}

const languageOptions: LanguageOption[] = [
    { value: 'en', label: 'English' },
    { value: 'am', label: 'አማርኛ' },
    { value: 'or', label: 'Oromo' },
];

const LanguageSelector = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { isDarkMode } = useDarkMode();

    const segments = pathname.split('/').filter(Boolean);
    const currentLocaleCode = segments[0] && languageOptions.some(opt => opt.value === segments[0]) ? segments[0] : 'en';
    const currentOption = languageOptions.find(option => option.value === currentLocaleCode);

    const restSegments = segments.slice(1);
    const restPath = '/' + restSegments.join('/') || '/';
    const queryString = searchParams.toString();

    const handleChange = (selectedOption: LanguageOption | null) => {
        if (selectedOption) {
            const newLocale = selectedOption.value;
            const targetPath = `/${newLocale}${restPath}${queryString ? `?${queryString}` : ''}`;
            router.push(targetPath);
        }
    };

    return (
        <div className="flex items-center gap-1">
            <Globe className="w-5 h-5 text-indigo-500 dark:text-indigo-400 transition-colors duration-200" />
            <Select
                options={languageOptions}
                onChange={handleChange}
                value={currentOption}
                isSearchable={false}
                className=""
                instanceId="language-select"
                classNames={{
                    control: () => "dark:bg-black bg-white !border-none shadow-sm",
                    container: () => "min-w-[100px] bg-white dark:bg-black font-medium text-[13px] z-[50]  rounded-md ",
                    menu: () => "dark:bg-black bg-white dark:text-gray-300 text-gray-600",
                }}

                theme={(theme) => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        primary: "#4f46e5",
                        primary25: isDarkMode ? "#4f46e5" : "#eef2ff",
                    },
                })}
            />
        </div>
    );
}

export default LanguageSelector;