import { createListCollection, Listbox } from "@ark-ui/solid";
import { css } from "@style/css";
import { center, stack } from "@style/patterns";
import { FaSolidCheck } from "solid-icons/fa";
import { Component, Index, Show } from "solid-js";

type props = {
  options: string[],
  disabled?: boolean,
  labels?: string[],
  label?: string,
  value: string,
  onChange: (s: string) => void
  close_right?: boolean
}

export const Tablepicker: Component<props> = (props) => {

  const collection = createListCollection({ items: props.options });

  const border_classes = "solid 1px"

  return (
    <>
      <div class={stack({ gap: 0 })}>
        <h3 class={center({ height: "50px" })}>{props.label}</h3>
        <Listbox.Root collection={collection} disabled={props.disabled} value={[props.value]} onValueChange={(e) => props.onChange(e.value[0])}>
          <Listbox.Content class={css({
            borderLeft: border_classes,
            borderRight: props.close_right ? border_classes : "",
          })}>
            <Index each={collection.items}>
              {(item, index) => (
                <Listbox.Item item={item()} class={center({
                  borderBottom: (index == 4 && props.close_right) ? "" : border_classes,
                  borderTop: (index == 5 && props.close_right) ? border_classes : "",
                  _first: {
                    borderTop: border_classes,
                  },
                  height: "50px",
                  width: "150px"
                })}>
                  <Show when={(props.labels ?? [])[index]}>
                    <Listbox.Label>
                      {(props.labels ?? [])[index]}
                    </Listbox.Label>
                  </Show>
                  <Listbox.ItemIndicator>
                    <FaSolidCheck />
                  </Listbox.ItemIndicator>
                </Listbox.Item>
              )}
            </Index>
          </Listbox.Content>
        </Listbox.Root >
      </div >
    </>
  );
}
