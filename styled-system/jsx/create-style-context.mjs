import { cx, css, sva } from '../css/index.mjs';
import { styled } from './factory.mjs';
import { getDisplayName } from './factory-helper.mjs';
import { createComponent, mergeProps } from 'solid-js/web'
import { createContext, createMemo, splitProps, useContext } from 'solid-js'

export function createStyleContext(recipe) {
  const StyleContext = createContext({})
  const isConfigRecipe = '__recipe__' in recipe
  const svaFn = isConfigRecipe ? recipe : sva(recipe.config)

  const getResolvedProps = (props, slotStyles) => {
    const { unstyled, ...restProps } = props
    if (unstyled) return restProps
    if (isConfigRecipe) {
      return { ...restProps, class: cx(slotStyles, restProps.class) }
    }
    return { ...slotStyles, ...restProps }
  }

  const withRootProvider = (Component, options) => {
    const WithRootProvider = (props) => {
      const [variantProps, otherProps] = svaFn.splitVariantProps(props)
      const [local, propsWithoutChildren] = splitProps(otherProps, ['children'])

      const slotStyles = createMemo(() => {
        const styles = isConfigRecipe ? svaFn(variantProps) : svaFn.raw(variantProps)
        styles._classNameMap = svaFn.classNameMap
        return styles
      })
        
      const mergedProps = createMemo(() => {
        if (!options?.defaultProps) return propsWithoutChildren
        return { ...options.defaultProps, ...propsWithoutChildren }
      })

      return createComponent(StyleContext.Provider, {
        get value() {
          return slotStyles()
        },
        get children() {
          return createComponent(
            Component,
            mergeProps(mergedProps, {
              get children() {
                return local.children
              },
            }),
          )
        },
      })
    }
    
    const componentName = getDisplayName(Component)
    WithRootProvider.displayName = `withRootProvider(${componentName})`
    return WithRootProvider
  }

  const withProvider = (Component, slot, options) => {
    const StyledComponent = styled(Component, {}, options)
    
    const WithProvider = (props) => {
      const [variantProps, restProps] = svaFn.splitVariantProps(props)
      const [local, propsWithoutChildren] = splitProps(restProps, ["children"])

      const slotStyles = createMemo(() => {
        const styles = isConfigRecipe ? svaFn(variantProps) : svaFn.raw(variantProps)
        styles._classNameMap = svaFn.classNameMap
        return styles
      })

      const resolvedProps = createMemo(() => {
        const propsWithClass = {
          ...propsWithoutChildren,
          class: propsWithoutChildren.class ?? options?.defaultProps?.class,
        }
        const resolved = getResolvedProps(propsWithClass, slotStyles()[slot])
        resolved.class = cx(resolved.class, slotStyles()._classNameMap[slot])
        return resolved
      })

      return createComponent(StyleContext.Provider, {
        get value() {
          return slotStyles()
        },
        get children() {
          return createComponent(
            StyledComponent,
            mergeProps(resolvedProps, {
              get children() {
                return local.children
              },
            })
          )
        },
      })
    }
    
    const componentName = getDisplayName(Component)
    WithProvider.displayName = `withProvider(${componentName})`
    return WithProvider
  }

  const withContext = (Component, slot, options) => {
    const StyledComponent = styled(Component, {}, options)
    
    const WithContext = (props) => {
      const slotStyles = useContext(StyleContext)
      const [local, propsWithoutChildren] = splitProps(props, ["children"])

      const resolvedProps = createMemo(() => {
        const propsWithClass = {
          ...propsWithoutChildren,
          class: propsWithoutChildren.class ?? options?.defaultProps?.class,
        }
        const resolved = getResolvedProps(propsWithClass, slotStyles[slot])
        resolved.class = cx(resolved.class, slotStyles._classNameMap?.[slot])
        return resolved
      })

      return createComponent(
        StyledComponent,
        mergeProps(resolvedProps, {
          get children() {
            return local.children
          },
        })
      )
    }
    
    const componentName = getDisplayName(Component)
    WithContext.displayName = `withContext(${componentName})`
    return WithContext
  }

  return {
    withRootProvider,
    withProvider,
    withContext,
  }
}