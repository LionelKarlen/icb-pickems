import { ark } from "@ark-ui/solid";
import { A } from "@solidjs/router";
import { sva } from "@style/css";
import { Match, ParentComponent, Show, Switch } from "solid-js"

type props = {
  onClick: (() => void) | string,
  variant?: ("solid" | "subtle" | "outline" | "ghost"),
  loading?: boolean,
  disabled?: boolean
}

export const Btn: ParentComponent<props> = (props) => {

  const classes = button_classes();

  return (
    <>
      <Show when={typeof props.onClick == "string"} fallback={
        <ark.button disabled={props.disabled} class={classes.button} onclick={props.onClick as () => void}>
          {props.children}
        </ark.button>
      }>
        <A class={classes.button} aria-disabled={props.disabled} href={props.onClick as string}>
          {props.children}
        </A>
      </Show>
    </>
  );
}


const button_classes = sva({
  className: 'button',
  slots: ["button"],
  base: {
    button: {
      alignItems: 'center',
      appearance: 'none',
      borderRadius: 'l2',
      cursor: 'pointer',
      display: 'inline-flex',
      fontWeight: 'semibold',
      isolation: 'isolate',
      minWidth: '0',
      justifyContent: 'center',
      outline: 'none',
      position: 'relative',
      transitionDuration: 'normal',
      transitionProperty: 'background, border-color, color, box-shadow',
      transitionTimingFunction: 'default',
      userSelect: 'none',
      verticalAlign: 'middle',
      whiteSpace: 'nowrap',
      _hidden: {
        display: 'none',
      },
      '& :where(svg)': {
        fontSize: '1.1em',
        width: '1.1em',
        height: '1.1em',
      },
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
  variants: {
    variant: {
      solid: {
        button: {
          background: 'colorPalette.default',
          color: 'colorPalette.fg',
          _hover: {
            background: 'colorPalette.emphasized',
          },
          _focusVisible: {
            outline: '2px solid',
            outlineColor: 'colorPalette.default',
            outlineOffset: '2px',
          },
          _disabled: {
            color: 'fg.disabled',
            background: 'bg.disabled',
            cursor: 'not-allowed',
            _hover: {
              color: 'fg.disabled',
              background: 'bg.disabled',
            },
          },
        },
      },
      outline: {
        button: {
          borderWidth: '1px',
          borderColor: 'colorPalette.a7',
          color: 'colorPalette.text',
          colorPalette: 'gray',
          _hover: {
            background: 'colorPalette.a2',
          },
          _disabled: {
            borderColor: 'border.disabled',
            color: 'fg.disabled',
            cursor: 'not-allowed',
            _hover: {
              background: 'transparent',
              borderColor: 'border.disabled',
              color: 'fg.disabled',
            },
          },
          _focusVisible: {
            outline: '2px solid',
            outlineColor: 'colorPalette.default',
            outlineOffset: '2px',
          },
          _selected: {
            background: 'accent.default',
            borderColor: 'accent.default',
            color: 'accent.fg',
            _hover: {
              background: 'accent.emphasized',
              borderColor: 'accent.emphasized',
            },
          },
        },
      },
      ghost: {
        button: {
          color: 'colorPalette.text',
          colorPalette: 'gray',
          _hover: {
            background: 'colorPalette.a3',
          },
          _selected: {
            background: 'colorPalette.a3',
          },
          _disabled: {
            color: 'fg.disabled',
            cursor: 'not-allowed',
            _hover: {
              background: 'transparent',
              color: 'fg.disabled',
            },
          },
          _focusVisible: {
            outline: '2px solid',
            outlineColor: 'colorPalette.default',
            outlineOffset: '2px',
          },
        },
      },
      link: {
        button: {

          verticalAlign: 'baseline',
          _disabled: {
            color: 'border.disabled',
            cursor: 'not-allowed',
            _hover: {
              color: 'border.disabled',
            },
          },
          height: 'auto!',
          px: '0!',
          minW: '0!',
        },
      },
      subtle: {
        button: {
          background: 'colorPalette.a3',
          color: 'colorPalette.text',
          colorPalette: 'gray',
          _hover: {
            background: 'colorPalette.a4',
          },
          _focusVisible: {
            outline: '2px solid',
            outlineColor: 'colorPalette.default',
            outlineOffset: '2px',
          },
          _disabled: {
            background: 'bg.disabled',
            color: 'fg.disabled',
            cursor: 'not-allowed',
            _hover: {
              background: 'bg.disabled',
              color: 'fg.disabled',
            },
          },
        },
      },
    },
    size: {
      xs: {
        button: {
          h: '8',
          minW: '8',
          textStyle: 'xs',
          px: '3',
          gap: '2',
        },
      },
      sm: {
        button: {
          h: '9',
          minW: '9',
          textStyle: 'sm',
          px: '3.5',
          gap: '2',
        },
      },
      md: {
        button: {
          h: '10',
          minW: '10',
          textStyle: 'sm',
          px: '4',
          gap: '2',
        },
      },
      lg: {
        button: {
          h: '11',
          minW: '11',
          textStyle: 'md',
          px: '4.5',
          gap: '2',
        },
      },
      xl: {
        button: {
          h: '12',
          minW: '12',
          textStyle: 'md',
          px: '5',
          gap: '2.5',
        },
      },
    },
  },
})
