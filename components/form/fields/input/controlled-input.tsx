import React from 'react';
import { useController, useFormContext, UseControllerProps } from 'react-hook-form';
import { View } from 'react-native';
import { Text } from 'components/text/text';

import { Input, TextInputProps } from 'components/form/fields/input/input';
import { cn } from 'lib/utils';

type ControlledInputProps = TextInputProps &
  UseControllerProps & {
    label: string;
    defaultValue?: string;
    containerClassName?: string;
    icon?: React.ReactElement;
  };

function ControlledInput(props: ControlledInputProps) {
  const { name, rules, defaultValue, ...inputProps } = props;
  const { field, fieldState } = useController({ name, rules, defaultValue });

  return (
    <View className={cn(inputProps.containerClassName)}>
      <View
        className={cn(
          'mb-1 flex flex-row items-center justify-between rounded-sm border border-input bg-transparent',
          fieldState.error && 'border-primary'
        )}
      >
        <View className={cn('flex-1')}>
          <Text
            className={cn(
              'px-3 pt-2 text-xs font-semibold text-muted-foreground',
              fieldState.error && 'text-primary'
            )}
          >
            {inputProps.placeholder}
          </Text>
          <Input
            className={cn('text-foreground')}
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            {...inputProps}
            autoCapitalize="none"
            placeholder=""
          ></Input>
        </View>
        {props.icon ? props.icon : null}
      </View>
      {fieldState.error && (
        <Text className={cn('text-xs text-primary')}>{fieldState.error.message}</Text>
      )}
    </View>
  );
}

export function FormInput(props: ControlledInputProps) {
  const formContext = useFormContext();

  const { name } = props;

  if (!formContext || !name) {
    const msg = !formContext
      ? 'TextInput must be wrapped by the FormProvider'
      : 'Name must be defined';
    console.error(msg);
    return null;
  }

  return <ControlledInput {...props} />;
}
