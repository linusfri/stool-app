import * as React from 'react';
import {
  View,
  Modal as ReactModal,
  ModalProps as ReactModalProps,
} from 'react-native';
import { Text } from 'components/text/text';
import { Button } from 'components/button/button';
import { cn } from 'lib/utils';
import MaterialSymbol from 'lib/icons/material-symbols';
import { ReactNode } from 'react';
import { PortalHost } from '@rn-primitives/portal';

type ModalProps = {
  visible: boolean;
  cancelAction?: () => void;
  confirmAction?: () => void;
  closeAction?: () => void;
  loading?: boolean;
  title?: string;
  children: ReactNode;
  contentClassName?: string;
  confirmText?: string;
  cancelText?: string;
};

export default function Modal({
  visible,
  cancelAction,
  confirmAction,
  closeAction,
  loading,
  title,
  children,
  contentClassName,
  confirmText,
  cancelText,
  ...rest
}: ModalProps & ReactModalProps) {
  return (
    <ReactModal
      transparent={rest.transparent}
      visible={visible}
      animationType='fade'
      onRequestClose={closeAction}
      {...rest}
    >
      <View className={cn('flex-1 justify-center items-center bg-black/75')}>
        <View className={cn('bg-white rounded-lg p-6 mx-4', contentClassName)}>
          <PortalHost name="modal-portal" />
          <View className={cn('flex-row justify-between items-center mb-4')}>
            {title && (
              <Text className={cn('text-lg font-bold')}>{title}</Text>
            )}

            {closeAction && (
              <MaterialSymbol
                name='close'
                size={24}
                className={cn('text-gray-700')}
                onPress={closeAction}
              />
            )}
          </View>

          {children}

          <View className={cn('flex-row gap-3 justify-end')}>
            {cancelAction && (
              <Button
                variant={'secondary'}
                disabled={loading}
                size={'sm'}
                onPress={cancelAction}
                className={cn('bg-primary')}
              >
                <Text className={cn('text-white')}>{cancelText}</Text>
              </Button>
            )}

            {confirmAction && (
              <Button
                disabled={loading}
                variant='default'
                size={'sm'}
                onPress={confirmAction}
              >
                <Text>{confirmText}</Text>
              </Button>
            )}
          </View>
        </View>
      </View>
    </ReactModal>
  );
}
