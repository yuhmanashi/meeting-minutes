export function headers() {
  return {
    'X-CSRF-Token': document.head.querySelector('[name=csrf-token]').content,
    'Content-Type': 'application/json',
  };
}