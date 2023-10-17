'use client';

import { useEffect, useState } from 'react';

import { SettingsTheme } from '@/components/settings-theme';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SettingsTheme />
    </>
  );
};
