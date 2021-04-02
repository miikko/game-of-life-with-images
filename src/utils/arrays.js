// Created by a Python programmer :D
export const range = (end) => [...Array(end).keys()]
export const sum = (arr) => arr.reduce((a, b) => a + b, 0)
// https://docs.python.org/3/library/itertools.html#itertools.product
export const product = (...a) =>
  a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())))
