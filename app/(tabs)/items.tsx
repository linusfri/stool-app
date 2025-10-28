import React from 'react';
import { View } from 'react-native';
import { useBoundStore } from 'lib/store/store';
import { ImageListing } from '@/components/ui/list/item-listing';

export default function ItemsScreen() {
  const { items } = useBoundStore();
  return (
    <View className="flex-1 items-center justify-center">
      <ImageListing items={items} className="w-full p-4" />
    </View>
  );
}
