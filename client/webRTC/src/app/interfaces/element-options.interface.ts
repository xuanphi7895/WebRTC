export interface ElementOptions {

  style?: StyleOptions;

  interaction?: InteractionOptions;

  state?: StateOptions;

  scroll?: CustomScrollOptions;
  
  value? : TextOptions;
}

export interface StyleOptions {

  width?: string;

  color?: string;

  backgroundColor?: string;

  animation?: string;

  className?: string;
}

export interface InteractionOptions {

  focus?: boolean;

  click?: () => void;
}

export interface StateOptions {

  disabled?: boolean;

  loading?: boolean;
}

export interface CustomScrollOptions {

  smooth?: boolean;

  toBottom?: boolean;
}

export interface TextOptions {
  value?: string;
}