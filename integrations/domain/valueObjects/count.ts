import * as z from "zod"

export const countSchema = z.number().min(0)

export type CountValue = z.infer<typeof countSchema>

/**
 * 集計した値
 *
 * - 数字である
 * - 0以上
 */
export class Count {
  constructor(public value: CountValue) {
    countSchema.parse(value)
    Object.freeze(this)
  }
}