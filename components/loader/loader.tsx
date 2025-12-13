import * as React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { cn } from 'lib/utils';

export type LoaderProps = {
  text: string;
};

function Loader({ text }: LoaderProps) {
  return (
    <View className={cn('flex-1 justify-center items-center')}>
      <Text className={cn('mb-2 text-base font-bold')}>{text}</Text>
      <ActivityIndicator size={64} className={cn('text-primary')} />
    </View>
  );
}

export default Loader;
