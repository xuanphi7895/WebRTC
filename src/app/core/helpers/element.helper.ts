import {
  ElementOptions,
  InteractionOptions,
  StateOptions,
  StyleOptions,
  CustomScrollOptions,
} from '../../interfaces/element-options.interface';
import { StringUtils } from './string.helper';

export function updateElement(element: HTMLElement | null, options: ElementOptions): void {
  if (!element) return;

  if (options.style) {
    applyStyle(element, options.style);
  }

  if (options.interaction) {
    applyInteraction(element, options.interaction);
  }

  if (options.state) {
    applyState(element as HTMLButtonElement, options.state);
  }

  if (options.scroll) {
    applyScroll(element, options.scroll);
  }

  if (options.value) { 
    appValue(element as HTMLInputElement, options.value.value);
  }
}

export function applyStyle(element: HTMLElement, style?: StyleOptions): void {
  if (!style) return;

  if (style.width) {
    element.style.width = style.width;
  }

  if (style.color) {
    element.style.color = style.color;
  }

  if (style.backgroundColor) {
    element.style.backgroundColor = style.backgroundColor;
  }

  if (style.animation) {
    element.style.animation = style.animation;
  }

  if (style.className) {
    element.className = style.className;
  }
}

export function applyInteraction(element: HTMLElement, interaction?: InteractionOptions): void {
  if (!interaction) return;

  if (interaction.focus) {
    element.focus();
  }
}

export function setDisabled(
  element: HTMLButtonElement | HTMLInputElement | null,
  disabled: boolean,
): void {
  if (!element) return;

  element.disabled = disabled;
}

export function applyState(button: HTMLButtonElement, state?: StateOptions): void {
  if (!state) return;

  setDisabled(button, state.disabled ?? false);

  if (state.loading) {
    button.disabled = state.loading;
  }
}

export function applyScroll(element: HTMLElement, scroll?: CustomScrollOptions): void {
  if (!scroll) return;

  if (scroll.toBottom) {
    element.scrollIntoView({ behavior: scroll.smooth ? 'smooth' : 'auto', block: 'end' });
  } else {
    element.scrollIntoView({ behavior: scroll.smooth ? 'smooth' : 'auto', block: 'start' });
  }
}

export function appValue(element: HTMLInputElement | null, value?: string): void { 
   if (!element) return;
   
   if (StringUtils.hasValue(value)) {
    element.value = value || '';
   } else {
    element.value = '';
   }
}
