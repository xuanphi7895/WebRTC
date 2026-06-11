export class StringUtils {

  static isNullOrEmpty(
    value?: string | null
  ): boolean {

    return value == null ||
           value === '';
  }

  static isNullOrWhiteSpace(
    value?: string | null
  ): boolean {

    return value == null || value === undefined ||
           value.trim() === '';
  }

  static hasValue(
    value?: string | null
  ): boolean {

    return !this.isNullOrWhiteSpace(
      value
    );
  }
}

export class NumberUtils {  
    static isNullOrUndefined(
        value?: number | null
    ): boolean {
        return value == null;
    }
}