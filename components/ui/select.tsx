import * as SelectPrimitive from '@rn-primitives/select';
import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Check } from 'lib/icons/check';
import MaterialSymbol from 'lib/icons/material-symbols';
import { cn } from 'lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

type Option = SelectPrimitive.Option;

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValueClassContext = React.createContext<string | undefined>(
  undefined
);

const selectTriggerVariants = cva(
  'flex flex-row items-center text-sm justify-between rounded-md border-none px-4 py-2 text-muted-foreground [&>span]:line-clamp-1',
  {
    variants: {
      variant: {
        default: 'bg-primary active:bg-primary/90',
        secondary: 'bg-secondary active:bg-secondary/90',
      },
      open: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        open: true,
        className: 'bg-primary/90',
      },
      {
        variant: 'secondary',
        open: true,
        className: 'bg-secondary/90',
      },
    ],
    defaultVariants: {
      variant: 'default',
      open: false,
    },
  }
);

const selectValueVariants = cva('text-sm', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      secondary: 'text-secondary-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

function SelectValue({ className, ...props }: SelectPrimitive.ValueProps) {
  const contextClassName = React.useContext(SelectValueClassContext);
  return (
    <SelectPrimitive.Value
      className={cn(contextClassName, className)}
      {...props}
    />
  );
}

function SelectTrigger({
  ref,
  className,
  children,
  variant,
  ...props
}: SelectPrimitive.TriggerProps & {
  ref?: React.RefObject<SelectPrimitive.TriggerRef>;
  children?: React.ReactNode;
  iconClassname?: string;
} & VariantProps<typeof selectTriggerVariants>) {
  const { open } = SelectPrimitive.useRootContext();

  return (
    <SelectValueClassContext.Provider value={selectValueVariants({ variant })}>
      <SelectPrimitive.Trigger
        ref={ref}
        className={cn(
          props.disabled && 'web:cursor-not-allowed opacity-50',
          selectTriggerVariants({ variant, open }),
          className
        )}
        {...props}
      >
        {children}
        <View
          className={cn(
            'rounded-full aspect-square flex items-center justify-center',
            variant === 'secondary' ? 'bg-secondary-foreground w-3.5' : 'bg-primary-foreground w-3.5'
          )}
        >
          <MaterialSymbol
            name={open ? 'keyboardArrowUp' : 'keyboardArrowDown'}
            size={12}
            className={cn(
              'icon-sm',
              variant === 'secondary' ? 'text-secondary' : 'text-primary'
            )}
          />
        </View>
      </SelectPrimitive.Trigger>
    </SelectValueClassContext.Provider>
  );
}

/**
 * Platform: WEB ONLY
 */
function SelectScrollUpButton({
  className,
  ...props
}: SelectPrimitive.ScrollUpButtonProps) {
  if (Platform.OS !== 'web') {
    return null;
  }
  return (
    <SelectPrimitive.ScrollUpButton
      className={cn(
        'flex web:cursor-default items-center justify-center py-1',
        className
      )}
      {...props}
    >
      <MaterialSymbol
        name='keyboardArrowUp'
        size={16}
        className='text-foreground opacity-50'
      />
    </SelectPrimitive.ScrollUpButton>
  );
}

/**
 * Platform: WEB ONLY
 */
function SelectScrollDownButton({
  className,
  ...props
}: SelectPrimitive.ScrollDownButtonProps) {
  if (Platform.OS !== 'web') {
    return null;
  }
  return (
    <SelectPrimitive.ScrollDownButton
      className={cn(
        'flex web:cursor-default items-center justify-center py-1',
        className
      )}
      {...props}
    >
      <View className={cn('w-4 bg-background')}>
        <MaterialSymbol
          name='keyboardArrowDown'
          size={16}
          className='text-foreground opacity-50'
        />
      </View>
    </SelectPrimitive.ScrollDownButton>
  );
}

function SelectContent({
  className,
  children,
  position = 'popper',
  portalHost,
  ...props
}: SelectPrimitive.ContentProps & {
  ref?: React.RefObject<SelectPrimitive.ContentRef>;
  className?: string;
  portalHost?: string;
}) {
  const { open } = SelectPrimitive.useRootContext();

  return (
    <SelectPrimitive.Portal hostName={portalHost}>
      <SelectPrimitive.Overlay
        style={Platform.OS !== 'web' ? StyleSheet.absoluteFill : undefined}
        className="z-[9999]"
      >
        <Animated.View 
          className='z-[9999]' 
          entering={FadeIn} 
          exiting={FadeOut}
          style={{ elevation: 5 }}
        >
          <SelectPrimitive.Content
            className={cn(
              'relative z-[9999] max-h-96 min-w-[8rem] rounded-md border border-border bg-popover shadow-md overflow-hidden shadow-foreground/10 p-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
              position === 'popper' &&
                'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
              open
                ? 'web:zoom-in-95 web:animate-in web:fade-in-0'
                : 'web:zoom-out-95 web:animate-out web:fade-out-0',
              className
            )}
            position={position}
            {...props}
          >
            <SelectScrollUpButton />
            <SelectPrimitive.Viewport
              className={cn(
                'p-1',
                position === 'popper' &&
                  'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
              )}
            >
              {children}
            </SelectPrimitive.Viewport>
            <SelectScrollDownButton />
          </SelectPrimitive.Content>
        </Animated.View>
      </SelectPrimitive.Overlay>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: SelectPrimitive.LabelProps & {
  ref?: React.RefObject<SelectPrimitive.LabelRef>;
}) {
  return (
    <SelectPrimitive.Label
      className={cn(
        'py-1.5 native:pb-2 pl-8 native:pl-10 pr-2 text-popover-foreground text-sm native:text-base font-semibold',
        className
      )}
      {...props}
    />
  );
}

function SelectItem({
  className,
  ...props
}: SelectPrimitive.ItemProps & {
  ref?: React.RefObject<SelectPrimitive.ItemRef>;
}) {
  const { value: selectedValue } = SelectPrimitive.useRootContext();
  const isSelected = selectedValue?.value === props.value;

  return (
    <SelectPrimitive.Item
      className={cn(
        'relative flex flex-row w-full items-center py-3 px-4 bg-popover',
        props.disabled && 'opacity-50',
        isSelected && 'bg-accent',
        className
      )}
      {...props}
    >
      <View className='absolute right-4'>
        <SelectPrimitive.ItemIndicator>
          <Check
            size={12}
            strokeWidth={3}
            className='text-popover-foreground'
          />
        </SelectPrimitive.ItemIndicator>
      </View>
      <SelectPrimitive.ItemText className='text-sm font-medium' />
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.SeparatorProps & {
  ref?: React.RefObject<SelectPrimitive.SeparatorRef>;
}) {
  return (
    <SelectPrimitive.Separator
      className={cn('-mx-1 my-1 h-px bg-muted', className)}
      {...props}
    />
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  selectTriggerVariants,
  SelectValue,
  selectValueVariants,
  type Option,
};
