import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from 'components/text/text';
import { useBoundStore } from 'lib/store/store';
import { ImageListing } from 'components/list/item-listing';
import MaterialSymbol from 'lib/icons/material-symbols';
import { cn } from 'lib/utils';
import useRefreshToken from 'lib/hooks/auth/use-refresh-token';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'components/modal/modal';
import { t } from 'lib/i18n';
import { FormProvider, useForm } from 'react-hook-form';
import { FormInput } from 'components/form/fields/input/controlled-input';
import { FormSelect } from 'components/form/fields/select/controlled-select';
import { Button } from 'components/ui/button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useProducts } from 'lib/hooks/products/use-products';

export default function ItemsScreen() {
  const { items, addItem } = useBoundStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [chosenImage, setChosenImage] = useState<string | null>(null);
  const { createProduct } = useProducts();

  useRefreshToken();

  type ProductFormData = {
    name: string;
    description: string;
    status: string;
    price: string;
  };

  const { ...formMethods } = useForm<ProductFormData>({
    defaultValues: {
      name: '',
      description: '',
      status: 'available',
      price: '',
    },
  });

  const { handleSubmit, formState, reset } = formMethods;

  const statusOptions = [
    { label: t('createItem.status.available'), value: 'available' },
    { label: t('createItem.status.sold'), value: 'sold' },
  ];

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      base64: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setChosenImage(result.assets[0].uri);
      setModalVisible(true);
    }
  }

  async function onSubmit(data: ProductFormData) {
    createProduct(
      {
        name: data.name,
        description: data.description,
        status: data.status as 'available' | 'sold',
        price: parseFloat(data.price),
      },
      {
        onSuccess: () => {
          setModalVisible(false);
          addItem(chosenImage!);
        },
        onError: (error) => {
          console.error('Error creating product:', error);
        }
      }
    );

    reset();
    setModalVisible(false);
  }

  return (
    <View className="flex-1 justify-center p-4">
      <View className={cn('mb-10 flex items-end')}>
        <Pressable
          className={cn('h-16 w-16 items-center justify-center rounded-sm bg-primary')}
          onPress={pickImage}
        >
          <MaterialSymbol name="add_2" className={cn('text-5xl text-white')} />
        </Pressable>
      </View>
      <ImageListing items={items} className="w-full" />

      <Modal
        visible={modalVisible}
        statusBarTranslucent={true} // Android only, cover the status bar fullscreen
        presentationStyle="fullScreen" // iOS only
        contentClassName={cn('flex-1 rounded-none m-0 w-full')}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          className={cn('flex-1')}
          keyboardShouldPersistTaps="handled"
          bottomOffset={40}
        >
          <Text className={cn('mb-2 font-bold text-lg')}>{t('createItem.title')}</Text>
          <FormProvider {...formMethods}>
            <Text className={cn('mb-8')}>{t('createItem.description')}</Text>

            <FormInput
              editable={!formState.isSubmitting}
              containerClassName="mb-4"
              name="name"
              label={t('createItem.fields.name')}
              placeholder={t('createItem.fields.name')}
              rules={{
                required: {
                  value: true,
                  message: t('createItem.validation.nameRequired'),
                },
                maxLength: {
                  value: 255,
                  message: t('createItem.validation.nameMaxLength'),
                },
              }}
            />

            <FormInput
              editable={!formState.isSubmitting}
              containerClassName="mb-4"
              name="description"
              label={t('createItem.fields.description')}
              placeholder={t('createItem.fields.description')}
              multiline
              numberOfLines={4}
            />

            <FormSelect
              containerClassName="mb-4"
              name="status"
              label={t('createItem.fields.status')}
              placeholder={t('createItem.fields.statusPlaceholder')}
              options={statusOptions}
              rules={{
                required: {
                  value: true,
                  message: t('createItem.validation.statusRequired'),
                },
              }}
              variant="secondary"
              portalHost="modal-portal"
            />

            <FormInput
              editable={!formState.isSubmitting}
              containerClassName="mb-6"
              name="price"
              label={t('createItem.fields.price')}
              placeholder={t('createItem.fields.price')}
              keyboardType="decimal-pad"
              rules={{
                required: {
                  value: true,
                  message: t('createItem.validation.priceRequired'),
                },
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/,
                  message: t('createItem.validation.priceInvalid'),
                },
              }}
            />

            <Button onPress={handleSubmit(onSubmit)} disabled={formState.isSubmitting}>
              <Text className={cn('font-semibold text-primary-foreground')}>
                {t('createItem.submit')}
              </Text>
            </Button>
          </FormProvider>
        </KeyboardAwareScrollView>
      </Modal>
    </View>
  );
}
