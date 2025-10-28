import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import * as React from 'react';
import { View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useBoundStore } from '@/lib/store/store';

export default function Home() {
  const { addItem } = useBoundStore();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      base64: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      addItem(result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1 items-center justify-center gap-8 p-4">
      <Button size={'lg'} onPress={pickImage}>
        <Text>Välj en bild från din telefon</Text>
      </Button>
    </View>
  );
}
