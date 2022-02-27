export default function (sel, data, children, text, elm) {
  const key = data?.key ? data.key : undefined
  return {sel, data, children, text, elm, key}
}