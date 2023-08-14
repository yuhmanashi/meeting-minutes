export function headers() {
  return {
    'X-CSRF-Token': document.head.querySelector('[name=csrf-token]').content,
    'Content-Type': 'application/json',
    // "Access-Control-Allow-Headers" : "Content-Type",
    // 'Access-Control-Allow-Origin':'*',
    // 'Access-Control-Allow-Methods':'POST, PATCH, OPTIONS'
  };
}

export function generateKey(pre) {
  return `${ pre }_${ new Date().getTime() }`;
}