import React from 'react';
import {
  useController,
  useFormContext,
  UseControllerProps,
} from 'react-hook-form';
import { View } from 'react-native';
import { Text } from 'components/text/text';

import {
  Checkbox,
  CheckboxProps,
} from 'components/form/fields/checkbox/checkbox';
import { Label } from '../input/label';
import { t, Trans } from 'lib/i18n';
import { cn } from 'lib/utils';

type CheckBoxTransProps = {
  i18nKey: string;
  components?: Record<string, any>;
};

type ControlledCheckboxProps = Omit<
  CheckboxProps,
  'checked' | 'onCheckedChange'
> &
  UseControllerProps & {
    label: string | CheckBoxTransProps;
    defaultValue?: string;
    containerClassName?: string;
    labelClassName?: string;
  };

function ControlledCheckbox(props: ControlledCheckboxProps) {
  const formContext = useFormContext();

  const { formState } = formContext;

  const { name, label, rules, defaultValue, ...checkboxProps } = props;

  const { field, fieldState } = useController({ name, rules, defaultValue });

  const ariaLabel = typeof label === 'string' ? label : t(label.i18nKey);
  const labelRenderable =
    typeof label === 'string' ? label : <Trans {...label} />;

  function handleToggle() {
    field.onChange(!field.value);
  }

  return (
    <View className={checkboxProps.containerClassName}>
      <View className='flex flex-row items-center gap-2'>
        <Checkbox
          className={checkboxProps.className}
          {...checkboxProps}
          checked={field.value}
          onCheckedChange={field.onChange}
          onBlur={field.onBlur}
          disabled={formState.isSubmitting || formState.isValidating}
          accessibilityLabel={ariaLabel}
          accessibilityHint={ariaLabel}
          aria-labelledby={ariaLabel}
          accessibilityRole='checkbox'
          accessibilityState={{ checked: field.value }}
        />
        <Label onPress={handleToggle}>
          <Text className={cn(checkboxProps.labelClassName)}>
            {/*
              The space is here to prevent a strange issue.
              When rendering first time the label shows. But not on subsequent renders.
              There surely is a better way to fix this... But for now, this works.
            */}
            {labelRenderable}{' '}
          </Text>
        </Label>
      </View>
      {fieldState.error && (
        <Text className={cn('text-xs text-primary')}>
          {fieldState.error.message}
        </Text>
      )}
    </View>
  );
}

export function FormCheckbox(props: ControlledCheckboxProps) {
  const formContext = useFormContext();

  const { name } = props;

  if (!formContext || !name) {
    const msg = !formContext
      ? 'Checkbox must be wrapped by the FormProvider'
      : 'Name must be defined';

    console.error(msg);

    return null;
  }

  return <ControlledCheckbox {...props} />;
}
