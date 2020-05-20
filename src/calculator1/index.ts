type INumArr = [string, string?]

export class Calculator {
  private num1Arr: INumArr

  constructor (num1: string) {
    // 根据小数点转换出基数1数组
    this.num1Arr = this.removeDecimalExtraZero(num1).split('.') as INumArr
  }

  /** 去除小数位多余的0 */
  private removeDecimalExtraZero (val: string) {
    return Number.parseFloat(val).toString()
  }

  /** 计算小数点位置 */
  private decimalPointPosition (num2DecimalLength: number) {
    // 基数1整数位长度
    const num1IntLen = this.num1Arr[0].length

    if (num1IntLen - num2DecimalLength > 0) {
      this.num1Arr[1] = (this.num1Arr[0].substr(num1IntLen - num2DecimalLength, num2DecimalLength) + (this.num1Arr[1] || ''))
    } else {
      this.num1Arr[1] = (this.num1Arr[0].substr(0, num1IntLen).padStart(num2DecimalLength, '0') + (this.num1Arr[1] || ''))
    }
    this.num1Arr[0] = this.num1Arr[0].substr(0, num1IntLen - num2DecimalLength) || '0'
  }

  /** 相乘 */
  multiply (num2: string) {
    // 根据小数点转换出基数2数组
    const num2Arr = this.removeDecimalExtraZero(num2).split('.') as INumArr
    // 记录基数2的小数位长度，后面计算小数点的位置
    const num2DecimalLength = num2Arr[1]?.length
    // 把基数2变为整数
    const num2Int = Number.parseInt(num2Arr.join(''))
    // 进位数
    let carry = 0

    // 判断是否存在小数位
    if (this.num1Arr[1]) {
      // 基数1小数位分段后的数组
      const num1ArrDecimalArr = [] as string[]

      // 把基数1的小数位以5个位数长度进行分段
      for (let i = 0, textLen = 5, frequency = Math.ceil(this.num1Arr[1].length / textLen); i < frequency; i++) {
        num1ArrDecimalArr.push(this.num1Arr[1].substr(i * textLen, textLen))
      }

      for (let i = num1ArrDecimalArr.length - 1, numLen = 0; i >= 0; i--) {
        // 记录i段的位数长度
        numLen = num1ArrDecimalArr[i].length
        // 计算i段
        num1ArrDecimalArr[i] = (Number.parseInt(num1ArrDecimalArr[i]) * num2Int + carry).toString()

        console.log(num1ArrDecimalArr[i])

        // 记录进位数
        carry = Number.parseInt(num1ArrDecimalArr[i].substr(0, num1ArrDecimalArr[i].length - numLen) || '0')
        // 根据位数长度重新赋值
        num1ArrDecimalArr[i] = num1ArrDecimalArr[i].substr(num1ArrDecimalArr[i].length - numLen, numLen)
      }

      // 合并小数位
      this.num1Arr[1] = num1ArrDecimalArr.join('')
    }

    // 计算整数位
    this.num1Arr[0] = (Number.parseInt(this.num1Arr[0]) * num2Int + carry).toString()

    // 重置小数位
    num2DecimalLength && this.decimalPointPosition(num2DecimalLength)

    return this
  }

  result () {
    return Number.parseFloat(this.num1Arr.join('.')).toString()
  }
}

new Calculator('0.01006').multiply('0.12345').result()
