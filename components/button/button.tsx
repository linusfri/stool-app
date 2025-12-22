import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Pressable } from 'react-native';
import { cn } from 'lib/utils';
import { TextClassContext } from 'components/text/text';

const buttonVariants = cva(
  'group flex items-center justify-center rounded-md web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary active:opacity-90',
        destructive:
          'bg-destructive web:hover:opacity-90 active:opacity-90',
        outline:
          'border border-input bg-background web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent',
        secondary: 'bg-secondary active:opacity-90',
        ghost:
          'web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent',
        link: 'web:underline-offset-4 web:hover:underline web:focus:underline',
      },
      size: {
        default:
          'min-h-10 px-4 rounded-sm py-2 native:min-h-12 native:px-5 native:py-3',
        sm: 'min-h-8 py-2 rounded-sm px-4',
        lg: 'min-h-9 py-2 rounded-sm px-8 native:min-h-14',
        icon: 'min-h-8 py-2 min-w-10',
        custom: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const buttonTextVariants = cva(
  'web:whitespace-nowrap text-sm native:text-base font-medium text-foreground web:transition-colors',
  {
    variants: {
      variant: {
        default: 'text-primary-foreground',
        destructive: 'text-destructive-foreground',
        outline: 'group-active:text-accent-foreground',
        secondary: 'text-secondary-foreground',
        ghost: 'group-active:text-accent-foreground',
        link: 'text-primary',
      },
      size: {
        default: 'native:text-sm text-sm font-semibold',
        sm: 'native:text-sm text-sm font-semibold',
        lg: 'native:text-base text-base font-semibold',
        icon: '',
        custom: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type ButtonProps = React.ComponentProps<typeof Pressable> &
  VariantProps<typeof buttonVariants>;

function Button({ ref, className, variant, size, ...props }: ButtonProps) {
  return (
    <TextClassContext.Provider
      value={buttonTextVariants({
        variant,
        size,
        className: 'web:pointer-events-none',
      })}
    >
      <Pressable
        className={cn(
          props.disabled && 'opacity-50 web:pointer-events-none',
          buttonVariants({ variant, size, className })
        )}
        ref={ref}
        role='button'
        {...props}
      />
    </TextClassContext.Provider>
  );
}

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
