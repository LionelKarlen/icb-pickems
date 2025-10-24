import { Component, Show } from "solid-js";
import { ark, Field, fieldAnatomy } from "@ark-ui/solid";
import { sva } from "@style/css";

type props = {
  label: string,
  error?: string,
  helper?: string,
  onChange: (value: string) => void,
  value: string,
}

export const Inputfield: Component<props> = (props) => {

  const classes = field_classes();
  return (
    <>
      <Field.Root class={classes.root}>
        <Field.Label class={classes.label}>{props.label}</Field.Label>
        <ark.input class={classes.input} value={props.value} oninput={(e) => props.onChange(e.target.value)} />
        <Show when={props.helper}>
          <Field.HelperText class={classes.helperText}>{props.helper}</Field.HelperText>
        </Show>
        <Show when={props.error}>
          <Field.ErrorText class={classes.errorText}>{props.error}</Field.ErrorText>
        </Show>
      </Field.Root>
    </>
  );
}


const field_classes = sva({
  className: 'field',
  slots: fieldAnatomy.keys(),
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5',
    },
    label: {
      color: 'fg.default',
      fontWeight: 'medium',
      textStyle: 'sm',
      _disabled: {
        color: 'fg.disabled',
      },
    },
    helperText: {
      color: 'fg.muted',
      textStyle: 'sm',
      _disabled: {
        color: 'fg.disabled',
      },
    },
    errorText: {
      alignItems: 'center',
      color: 'fg.error',
      display: 'inline-flex',
      gap: '2',
      textStyle: 'sm',
      _disabled: {
        color: 'fg.disabled',
      },
    },
    input: {
      appearance: 'none',
      background: 'none',
      borderColor: 'border.default',
      borderRadius: 'l2',
      borderWidth: '1px',
      color: 'fg.default',
      outline: 0,
      position: 'relative',
      transitionDuration: 'normal',
      transitionProperty: 'box-shadow, border-color',
      transitionTimingFunction: 'default',
      width: 'full',
      _disabled: {
        opacity: 0.4,
        cursor: 'not-allowed',
      },
      _focus: {
        borderColor: 'colorPalette.default',
        boxShadow: '0 0 0 1px var(--colors-color-palette-default)',
      },
      _invalid: {
        borderColor: 'fg.error',
        _focus: {
          borderColor: 'fg.error',
          boxShadow: '0 0 0 1px var(--colors-border-error)',
        },
      },
    },
  },
  defaultVariants: {
    size: "md"
  },
  variants: {
    size: {
      sm: {
        label: { textStyle: 'sm' },
        input: {
          px: '2.5',
          h: '9',
          minW: '9',
          fontSize: 'sm',
          gap: '2',
        },
      },
      md: {
        label: { textStyle: 'sm' },
        input: {
          px: '3',
          h: '10',
          minW: '10',
          fontSize: 'md',
          gap: '2',
        },
      },
      lg: {
        label: { textStyle: 'sm' },
        input: {
          px: '3.5',
          h: '11',
          minW: '11',
          fontSize: 'md',
          gap: '2',
        },
      },
    },
  },
});


