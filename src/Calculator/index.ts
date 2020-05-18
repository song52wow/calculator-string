export class Calculator {
  private num1Arr: [string, string?]

  constructor (num1: string) {
    this.num1Arr = this.removeDecimalExtraZero(num1).split('.')
  }

  /** 去除小数位多余的0 */
  private removeDecimalExtraZero (val: string) {
    return Number.parseFloat(val).toString()
  }

  /** 相乘 */
  multiply (num2: string) {
    const num2Arr = this.removeDecimalExtraZero(num2).split('.') as [string, string?]
    // 保存小数位长度
    const num2DecimalLength = num2Arr[1]?.length
    // 把num2变为整数
    const num2Int = Number.parseInt(num2Arr.join(''))

    // 需要与下一位数相加的值
    let nextSum = 0

    // 当第一个因数有小数位时
    if (this.num1Arr[1]) {
      // 把小数位转换位数组
      const num1ArrDecimalArr = this.num1Arr[1].split('')

      for (let i = num1ArrDecimalArr.length - 1, sumArr = '', nextSumStr = ''; i >= 0; i--) {
        // 从最后一位数开始计算 * num2的整数
        sumArr = (Number.parseInt(num1ArrDecimalArr[i]) * num2Int).toString()

        num1ArrDecimalArr[i] = (Number.parseInt(sumArr.substr(sumArr.length - 1, 1)) + nextSum).toString()

        nextSumStr = sumArr.substr(0, sumArr.length - 1)

        nextSum = nextSumStr ? Number.parseInt(nextSumStr) : 0
      }

      this.num1Arr[1] = num1ArrDecimalArr.join('')
    }

    // 计算整数部分
    this.num1Arr[0] = (Number.parseInt(this.num1Arr[0]) * num2Int).toString()

    if (num2DecimalLength && num2DecimalLength > 0) {
      // this.num1Arr[1] = this.num1Arr[0].substr(this.num1Arr[0].length - num2DecimalLength, num2DecimalLength) + this.num1Arr[1]

      this.num1Arr[0] = this.num1Arr[0].substr(0, this.num1Arr[0].length - num2DecimalLength) || '0'
    }

    return this

    // let val2Num = Number.parseInt(num2)
    // let val2FloatLen = 0

    // if (num2Arr[1]) {
    //   //         记录小数位长度
    //   val2FloatLen = num2Arr[1].length

    //   val2Num = Number.parseInt(num2Arr.join(''))
    // }

    // if (this.num1Arr[1]) {
    //   const productArr = this.num1Arr[1]
    //     .split('')
    //     .reverse()
    //     .map(ele => Number.parseInt(ele) * val2Num)

    //   if (productArr.length > 1) {
    //     for (let i = 0; i < productArr.length - 1; i++) {
    //       productArr[i] = productArr[i]
    //         .toString()
    //         .replace(/(\d*)(\d{1})$/, (_v1, v2, v3) => {
    //           if (v2) {
    //             (productArr[i + 1]) += Number.parseInt(v2)
    //           }

    //           return v3
    //         })
    //     }
    //   }

    //   val1FloatResultArr = productArr.reverse()

    //   val1FloatResultArr[0] = val1FloatResultArr[0]
    //     .toString()
    //     .replace(/(\d*)(\d{1})$/, (_v1, v2, v3) => {
    //       if (v2) {
    //         val1IntRemainder = Number.parseInt(v2)
    //       }

    //       return v3
    //     })
    // }

    // this.num1Arr[0] = (
    //   Number.parseInt(val1Arr[0]) * val2Num +
    //   val1IntRemainder
    // ).toString()

    // this.num1Arr[1] = val1FloatResultArr.join('')

    // this.num1Arr[0] = this.num1Arr[0].padStart(val2FloatLen, '0')

    // const regexp = new RegExp(`(\\d*)(\\d{${val2FloatLen}})$`)

    // this.val1 = val1Arr[0].replace(regexp, (v1, v2, v3) => {
    //   const float = v3 + val1Arr[1]

    //   return float ? `${v2 || '0'}.${float}` : v2
    // })

    // return this
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
    return this.num1Arr.join('.')
  }
}
