import React from 'react';
import { View } from 'react-native';
import { Text } from 'components/text/text';
import MaterialSymbol, { IconName } from 'lib/icons/material-symbols';
import { cn } from 'lib/utils';
import { t } from 'lib/i18n';

interface NotFoundProps {
  icon?: IconName;
  title?: string;
  description?: string;
  className?: string;
}

export function NotFound({ 
  icon = 'searchOff', 
  title = t('status.notFound.title'),
  description = t('status.notFound.description'),
  className 
}: NotFoundProps) {
  return (
    <View className={cn('items-center justify-center', className)}>
      <MaterialSymbol 
        name={icon} 
        className={cn('text-6xl text-gray-400 mb-4')} 
      />
      <Text className={cn('text-xl font-semibold text-gray-700 mb-2 text-center')}>
        {title}
      </Text>
      <Text className={cn('text-sm text-gray-500 text-center')}>
        {description}
      </Text>
    </View>
  );
}
