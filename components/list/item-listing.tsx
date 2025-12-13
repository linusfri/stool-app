import { cn } from 'lib/utils';
import React from 'react';
import { Dimensions, Image, ScrollView, View } from 'react-native';

interface ImageListingProps {
  items: { id: string; uri: string }[];
  className?: string;
  imageClassName?: string;
}

export function ImageListing({ items, className, imageClassName }: ImageListingProps) {
  const screenWidth = Dimensions.get('window').width;

  return (
    <ScrollView className={cn('w-full', className)}>
      <View className="flex-row flex-wrap justify-between">
        {items.map((item) => (
          <View key={item.id} style={{ width: screenWidth / 2 - 24 }} className={cn('mb-4')}>
            <Image
              source={{ uri: item.uri }}
              className={cn('aspect-square w-full rounded-md', imageClassName)}
              resizeMode="cover"
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
