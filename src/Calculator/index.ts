export class Calculator {
  private val1Arr: [string, string | null]

  constructor (val1: string) {
    this.val1Arr = val1.split('.')
  }

  /** 相乘 */
  multiply (val2: string) {
    let val1FloatResultArr = []
    let val1IntRemainder = 0

    const val2Arr = val2.split('.')
    let val2Num = Number.parseInt(val2)
    let val2FloatLen = 0

    if (val2Arr[1]) {
      //         记录小数位长度
      val2FloatLen = val2Arr[1].length

      val2Num = Number.parseInt(val2Arr.join(''))
    }

    if (this.val1Arr[1]) {
      const productArr = this.val1Arr[1]
        .split('')
        .reverse()
        .map(ele => Number.parseInt(ele) * val2Num)

      if (productArr.length > 1) {
        for (let i = 0; i < productArr.length - 1; i++) {
          productArr[i] = productArr[i]
            .toString()
            .replace(/(\d*)(\d{1})$/, (_v1, v2, v3) => {
              if (v2) {
                (productArr[i + 1]) += Number.parseInt(v2)
              }

              return v3
            })
        }
      }

      val1FloatResultArr = productArr.reverse()

      val1FloatResultArr[0] = val1FloatResultArr[0]
        .toString()
        .replace(/(\d*)(\d{1})$/, (_v1, v2, v3) => {
          if (v2) {
            val1IntRemainder = Number.parseInt(v2)
          }

          return v3
        })
    }

    this.val1Arr[0] = (
      Number.parseInt(val1Arr[0]) * val2Num +
      val1IntRemainder
    ).toString()

    this.val1Arr[1] = val1FloatResultArr.join('')

    this.val1Arr[0] = this.val1Arr[0].padStart(val2FloatLen, '0')

    const regexp = new RegExp(`(\\d*)(\\d{${val2FloatLen}})$`)

    this.val1 = val1Arr[0].replace(regexp, (v1, v2, v3) => {
      const float = v3 + val1Arr[1]

      return float ? `${v2 || '0'}.${float}` : v2
    })

    return this
  }

  /** 相加 */
  // plus(val2) {
  //   const val1Arr = this.val1.split(".");
  //   const val2Arr = val2.split(".");
  //   let maxLen = 0;

  //   if (val1Arr[1] || val2Arr[1]) {
  //     if (val1Arr[1] && val2Arr[1]) {
  //       maxLen = Math.max(val1Arr[1].length, val2Arr[1].length);
  //     } else if (val1Arr[1]) {
  //       maxLen = val1Arr[1].length;
  //     } else if (val2Arr[1]) {
  //       maxLen = val2Arr[1].length;
  //     }
  //   }

  //   const resultStr = (
  //     Math.pow(10, maxLen) * Number.parseFloat(this.val1) +
  //     Math.pow(10, maxLen) * Number.parseFloat(val2)
  //   ).toString();
  //   const resultStrArr = resultStr.split("");

  //   const resultIntArr = resultStrArr.splice(0, resultStr.length - maxLen);

  //   if (resultStrArr.length > 0) {
  //     resultStrArr.unshift(".");
  //   }

  //   this.val1 = resultIntArr.concat(resultStrArr).join("");

  //   return this;
  // }

  result () {
    return this.val1Arr.join('.')
  }
}
