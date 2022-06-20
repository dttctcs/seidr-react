export function fromEntries(entries: any) {
  const o: any = {};

  entries.forEach((entry) => {
    const [k, v] = entry;
    o[k] = v;
  });

  return o;
}
