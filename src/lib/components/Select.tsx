import { createListCollection, Select, selectAnatomy } from "@ark-ui/solid";
import { sva } from "@style/css";
import { FaSolidCheck, FaSolidChevronDown } from "solid-icons/fa";
import { Component, Index } from "solid-js";
import { Portal } from "solid-js/web";


type props = {
  onChange: (value: string) => void,
  label: string,
  placeholder: string,
  value: string,
  options: string[]
}

export const Selects: Component<props> = (props) => {


  const classes = select_classes();

  const collection = createListCollection({ items: props.options })
  return (
    <>
      <Select.Root collection={collection} class={classes.root} positioning={{ sameWidth: true }} onValueChange={(e) => props.onChange(e.items[0])} value={[props.value ?? ""]}>
        <Select.Label class={classes.label}>{props.label}</Select.Label>
        <Select.Control class={classes.control}>
          <Select.Trigger class={classes.trigger}>
            <Select.ValueText placeholder={props.placeholder} class={classes.valueText} />
            <Select.Indicator class={classes.indicator}>
              <FaSolidChevronDown />
            </Select.Indicator>
          </Select.Trigger>
        </Select.Control>
        <Portal>
          <Select.Positioner class={classes.positioner}>
            <Select.Content class={classes.content}>
              <Select.ItemGroup class={classes.itemGroup}>
                <Index each={collection.items}>
                  {(item) => (
                    <Select.Item item={item()} class={classes.item}>
                      <Select.ItemText class={classes.itemText}>{item()}</Select.ItemText>
                      <Select.ItemIndicator class={classes.itemIndicator}>
                        <FaSolidCheck />
                      </Select.ItemIndicator>
                    </Select.Item>
                  )}
                </Index>
              </Select.ItemGroup>
            </Select.Content>
          </Select.Positioner>
        </Portal>
        <Select.HiddenSelect />
      </Select.Root>
    </>
  );
}


const select_classes = sva({
  className: 'select',
  slots: selectAnatomy.keys(),
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5',
      width: 'full',
    },
    content: {
      background: 'bg.default',
      borderRadius: 'l2',
      boxShadow: 'lg',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 'dropdown',
      _hidden: {
        display: 'none',
      },
      _open: {
        animation: 'fadeIn 0.25s ease-out',
      },
      _closed: {
        animation: 'fadeOut 0.2s ease-out',
      },
      _focusVisible: {
        outlineOffset: '2px',
        outline: '2px solid',
        outlineColor: 'border.outline',
      },
    },
    item: {
      alignItems: 'center',
      borderRadius: 'l1',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      transitionDuration: 'fast',
      transitionProperty: 'background, color',
      transitionTimingFunction: 'default',
      _hover: {
        background: 'gray.a3',
        color: 'fg.default',
      },
      _highlighted: {
        background: 'gray.a3',
        color: 'fg.default',
      },
      _selected: {
        color: 'fg.default',
      },
      _disabled: {
        color: 'fg.disabled',
        cursor: 'not-allowed',
        _hover: {
          background: 'transparent',
          color: 'fg.disabled',
        },
      },
    },
    itemGroupLabel: {
      fontWeight: 'semibold',
      textStyle: 'sm',
    },
    itemIndicator: {
      color: 'colorPalette.default',
    },
    label: {
      color: 'fg.default',
      fontWeight: 'medium',
    },
    trigger: {
      appearance: 'none',
      alignItems: 'center',
      borderColor: 'border.default',
      borderRadius: 'l2',
      cursor: 'pointer',
      color: 'fg.default',
      display: 'inline-flex',
      justifyContent: 'space-between',
      outline: 0,
      position: 'relative',
      transitionDuration: 'normal',
      transitionProperty: 'background, box-shadow, border-color',
      transitionTimingFunction: 'default',
      width: 'full',
      _placeholderShown: {
        color: 'fg.subtle',
      },
      _disabled: {
        color: 'fg.disabled',
        cursor: 'not-allowed',
        '& :where(svg)': {
          color: 'fg.disabled',
        },
      },
      '& :where(svg)': {
        color: 'fg.subtle',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
  variants: {
    variant: {
      outline: {
        trigger: {
          borderWidth: '1px',
          _focus: {
            borderColor: 'colorPalette.default',
            boxShadow: '0 0 0 1px var(--colors-color-palette-default)',
          },
        },
      },
      ghost: {
        trigger: {
          _hover: {
            background: 'gray.a3',
          },
          _focus: {
            background: 'gray.a3',
          },
        },
      },
    },
    size: {
      sm: {
        content: { p: '0.5', gap: '1' },
        item: { textStyle: 'sm', px: '2', height: '9' },
        itemIndicator: {
          '& :where(svg)': {
            width: '4',
            height: '4',
          },
        },
        itemGroupLabel: {
          px: '2',
          py: '1.5',
        },
        label: { textStyle: 'sm' },
        trigger: {
          px: '2.5',
          h: '9',
          minW: '9',
          fontSize: 'sm',
          gap: '2',
          '& :where(svg)': {
            width: '4',
            height: '4',
          },
        },
      },
      md: {
        content: { p: '1', gap: '1' },
        item: { textStyle: 'md', px: '2', height: '10' },
        itemIndicator: {
          '& :where(svg)': {
            width: '4',
            height: '4',
          },
        },
        itemGroupLabel: {
          px: '2',
          py: '1.5',
        },
        label: { textStyle: 'sm' },
        trigger: {
          px: '3',
          h: '10',
          minW: '10',
          fontSize: 'md',
          gap: '2',
          '& :where(svg)': {
            width: '4',
            height: '4',
          },
        },
      },
      lg: {
        content: { p: '1.5', gap: '1' },
        item: { textStyle: 'md', px: '2', height: '11' },
        itemIndicator: {
          '& :where(svg)': {
            width: '5',
            height: '5',
          },
        },
        itemGroupLabel: {
          px: '2',
          py: '1.5',
        },
        label: { textStyle: 'sm' },
        trigger: {
          px: '3.5',
          h: '11',
          minW: '11',
          fontSize: 'md',
          gap: '2',
          '& :where(svg)': {
            width: '5',
            height: '5',
          },
        },
      },
    },
  },
})
