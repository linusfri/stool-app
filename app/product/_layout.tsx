import { Stack } from 'components/navigation/stack';
import * as React from 'react';
import { t } from 'lib/i18n';
import {
  commonSubPageHeaderTheme,
} from 'lib/constants/header/theme';

export default function ProductLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='[id]'
        options={{
          headerShown: true,
          title: t('productDetail.editTitle'),
          ...commonSubPageHeaderTheme,
        }}
      />
    </Stack>
  );
}