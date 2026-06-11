export function findElementById(
  id: string
): HTMLElement | HTMLInputElement | null {

  return document.getElementById(id);
}

