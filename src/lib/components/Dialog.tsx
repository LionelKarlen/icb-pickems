import { Dialog, dialogAnatomy } from "@ark-ui/solid";
import { css, sva } from "@style/css";
import { hstack } from "@style/patterns";
import { Component } from "solid-js";
import { Portal } from "solid-js/web";
import { Btn } from "./Btn";

type props = {
  open: boolean,
  updateOpen: (o: boolean) => void,
  onConfirm: () => void
}

export const ConfirmDialog: Component<props> = (props) => {


  const classes = dialog_classes();

  return (
    <>
      <Dialog.Root open={props.open} onOpenChange={(e) => props.updateOpen(e.open)}>
        <Portal>
          <Dialog.Backdrop class={classes.backdrop} />
          <Dialog.Positioner class={classes.positioner}>
            <Dialog.Content class={classes.content}>
              <Dialog.Title class={classes.title}>Confirm Reset</Dialog.Title>
              <Dialog.Description class={classes.description}>Are you sure you want to delete everything?</Dialog.Description>
              <div class={hstack({ gap: 4, marginTop: "2em", justifyContent: "end" })}>
                <button onclick={() => props.updateOpen(false)} class={css({ color: "fg.muted", cursor: "pointer" })}>Cancel</button>
                <Btn onClick={props.onConfirm}>Confirm</Btn>
              </div>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
}

const dialog_classes = sva({
  className: 'dialog',
  slots: dialogAnatomy.keys(),
  base: {
    backdrop: {
      background: {
        _light: 'white.a10',
        _dark: 'black.a10',
      },
      height: '100vh',
      left: '0',
      position: 'fixed',
      top: '0',
      width: '100vw',
      zIndex: 'overlay',
      _open: {
        animation: 'backdrop-in',
      },
      _closed: {
        animation: 'backdrop-out',
      },
    },
    positioner: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      left: '0',
      overflow: 'auto',
      position: 'fixed',
      top: '0',
      width: '100vw',
      height: '100dvh',
      zIndex: 'modal',
    },
    content: {
      background: 'bg.default',
      borderRadius: 'l3',
      boxShadow: 'lg',
      padding: "2em",
      minW: 'sm',
      position: 'relative',
      _open: {
        animation: 'dialog-in',
      },
      _closed: {
        animation: 'dialog-out',
      },
    },
    title: {
      fontWeight: 'semibold',
      textStyle: 'lg',
    },
    description: {
      color: 'fg.muted',
      textStyle: 'sm',
    },
  },
})
