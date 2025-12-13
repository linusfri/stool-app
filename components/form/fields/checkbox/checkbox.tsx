import * as CheckboxPrimitive from '@rn-primitives/checkbox';
import * as React from 'react';
import { Platform } from 'react-native';
import { Check } from 'lib/icons/check';
import { cn } from 'lib/utils';

export type CheckboxProps = CheckboxPrimitive.RootProps & {
  ref?: React.RefObject<CheckboxPrimitive.RootRef>;
};

function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        'web:peer native:h-[20] native:w-[20] h-4 w-4 shrink-0 rounded-[2px] border-2 border-black disabled:cursor-not-allowed disabled:opacity-50 web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className={cn('h-full w-full items-center justify-center')}>
        <Check size={14} strokeWidth={Platform.OS === 'web' ? 2.5 : 3.5} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
