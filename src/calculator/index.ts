type INumArr = [string, string?]

export class Calculator {
  private num1Arr: INumArr

  constructor (num1: string) {
    // 根据小数点转换出基数1数组
    this.num1Arr = num1.split('.') as INumArr
  }

  /** 去除小数位多余的0 */
  private removeDecimalExtraZero (val: string) {
    return val.replace(/([0]*)$/, () => '')
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
    const num2Arr = num2.split('.') as INumArr
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

      for (let i = num1ArrDecimalArr.length - 1, numLen = 0, duration = 0; i >= 0; i--) {
        // 记录i段的位数长度
        numLen = num1ArrDecimalArr[i].length
        // 计算i段
        num1ArrDecimalArr[i] = (Number.parseInt(num1ArrDecimalArr[i]) * num2Int + carry).toString()
        // 记录进位数
        carry = Number.parseInt(num1ArrDecimalArr[i].substr(0, num1ArrDecimalArr[i].length - numLen) || '0')

        duration = num1ArrDecimalArr[i].length - numLen

        // 根据位数长度重新赋值
        num1ArrDecimalArr[i] = num1ArrDecimalArr[i].substr(duration > 0 ? duration : 0, numLen).padStart(numLen, '0')
      }

      // 合并小数位
      this.num1Arr[1] = num1ArrDecimalArr.join('')
    }

    // 计算整数位
    this.num1Arr[0] = (Number.parseInt(this.num1Arr[0]) * num2Int + carry).toString()

    // 重置小数位
    num2DecimalLength && this.decimalPointPosition(num2DecimalLength)

    if (this.num1Arr[1]) {
      this.num1Arr[1] = this.removeDecimalExtraZero(this.num1Arr[1])
    }

    return this
  }

  /** 相加 */
  plus (num2: string) {
    const num2Arr = num2.split('.') as INumArr
    // 进位数
    let carry = 0

    // 小数位计算
    if (num2Arr[1]) {
      // 判断基数1是否存在小数位
      if (this.num1Arr[1]) {
        // 获取两个基数中小数位长度最大值
        const decimalMaxLen = Math.max(this.num1Arr[1].length, num2Arr[1].length)

        // 为两个基数补全0
        this.num1Arr[1] = this.num1Arr[1].padEnd(decimalMaxLen, '0')
        num2Arr[1] = num2Arr[1].padEnd(decimalMaxLen, '0')

        this.num1Arr[1] = (Number.parseFloat(this.num1Arr[1]) + Number.parseFloat(num2Arr[1])).toString()

        const duration = this.num1Arr[1].length - decimalMaxLen

        if (this.num1Arr[1].length > decimalMaxLen) {
          carry = Number.parseInt(this.num1Arr[1].substr(0, duration))
        }

        this.num1Arr[1] = this.num1Arr[1].substr(duration > 0 ? duration : 0, decimalMaxLen).padStart(decimalMaxLen, '0')
      } else {
        this.num1Arr[1] = num2Arr[1]
      }

      this.num1Arr[1] = this.removeDecimalExtraZero(this.num1Arr[1])
    }

    this.num1Arr[0] = (Number.parseInt(this.num1Arr[0]) + Number.parseInt(num2Arr[0]) + carry).toString()

    return this
  }

  result () {
    return this.num1Arr.join('.')
  }
}
