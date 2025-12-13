import * as React from 'react';
import {
  Platform,
  TextInput,
  type TextInputProps as ReactNativeTextInputProps,
} from 'react-native';
import { cn } from 'lib/utils';

export type TextInputProps = ReactNativeTextInputProps & {
  ref?: React.RefObject<TextInput>;
};

function Input({ className, placeholderClassName, ...props }: TextInputProps) {
  return (
    <TextInput
      className={cn(
        'border-0 bg-transparent px-3 pb-2 min-h-[32px]',
        Platform.OS === 'ios' ? 'pt-0' : 'pt-1',
        'text-base font-regular leading-normal',
        'file:border-0 file:bg-transparent file:font-medium',
        props.editable === false && 'opacity-50',
        className
      )}
      placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
      {...props}
    />
  );
}

export { Input };
