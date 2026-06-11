// BEST PRACTICE
// Use: named exports instead of default exports, to make it easier to identify the exported members and avoid naming conflicts.
export function setButtonDisabled(
  button:
    HTMLButtonElement | null,
  disabled: boolean
): void {

  if (!button) return;

  button.disabled = disabled;
}

export function closeChannel(
  channel:
    RTCDataChannel | null
): void {

  if (!channel) return;

  channel.close();
}