type INumArr = [string, string?]

export class Calculator {
  private num1Arr: INumArr
  /** 是否为负数 */
  private isNegative = false
  /** 进位数 */
  private carry = 0

  constructor (num1: string) {
    // 根据小数点转换出基数1数组
    this.num1Arr = num1.split('.') as INumArr
  }

  /** 去除小数位多余的0 */
  private initNumber () {
    if (this.num1Arr[1]) {
      this.num1Arr[1] = this.num1Arr[1].replace(/([0]*)$/, () => '')
    }

    // 去除整数部分的负号
    this.num1Arr[0] = this.num1Arr[0].replace(/^(-)/, () => '')
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

  /** 分段 */
  private segment (target: string) {
    const arr = []

    // 以5个位数长度进行分段
    for (let i = 0, textLen = 5, frequency = Math.ceil(target.length / textLen); i < frequency; i++) {
      arr.push(target.substr(i * textLen, textLen))
    }

    return arr
  }

  /**
   * 计算进位数
   * @param target 需要截取的目标
   * @param numLen 实际字符长度
   */
  private calcCarry (target: string, numLen: number) {
    return Number.parseInt(target.substr(0, target.length - numLen) || '0')
  }

  /**
   * 计算分段小数的实际数值
   * @param target 要截取的目标
   * @param numLen 实际字符长度
   */
  private calcDecimalSegment (target: string, numLen: number) {
    const duration = target.length - numLen

    return target.substr(duration > 0 ? duration : 0, numLen).padStart(numLen, '0')
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
      const num1ArrDecimalArr = this.segment(this.num1Arr[1])

      for (let i = num1ArrDecimalArr.length - 1, result = ''; i >= 0; i--) {
        // 计算i段
        result = (Number.parseInt(num1ArrDecimalArr[i]) * num2Int + carry).toString()
        // 记录进位数
        carry = this.calcCarry(result, num1ArrDecimalArr[i].length)
        // 赋值
        num1ArrDecimalArr[i] = this.calcDecimalSegment(result, num1ArrDecimalArr[i].length)
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

        // 分段
        const num1DecimalSegment = this.segment(this.num1Arr[1])
        const num2DecimalSegment = this.segment(num2Arr[1])

        // 循环计算
        for (let i = num1DecimalSegment.length - 1, result = ''; i >= 0; i--) {
          result = (Number.parseInt(num1DecimalSegment[i]) + Number.parseInt(num2DecimalSegment[i]) + carry).toString()

          carry = this.calcCarry(result, num1DecimalSegment[i].length)

          num1DecimalSegment[i] = this.calcDecimalSegment(result, num1DecimalSegment[i].length)
        }

        this.num1Arr[1] = num1DecimalSegment.join('')
      } else {
        this.num1Arr[1] = num2Arr[1]
      }
    }

    this.num1Arr[0] = (Number.parseInt(this.num1Arr[0]) + Number.parseInt(num2Arr[0]) + carry).toString()

    return this
  }

  /** 相减 */
  minus (num2: string) {
    let num2Arr = []

    // 如果基数1小于基数2，调换两者位置
    if (Number.parseFloat(this.result()) < Number.parseFloat(num2)) {
      num2Arr = this.num1Arr
      this.num1Arr = num2.split('.') as INumArr
      this.isNegative = true
    } else {
      num2Arr = num2.split('.') as INumArr
    }

    if (this.num1Arr[1] || num2Arr[1]) {
      // 获取小数位最大长度
      const decimalMaxLen = Math.max(this.num1Arr[1]?.length || 0, num2Arr[1]?.length || 0)

      this.num1Arr[1] = (this.num1Arr[1] ? this.num1Arr[1] : '').padEnd(decimalMaxLen, '0')
      num2Arr[1] = (num2Arr[1] ? num2Arr[1] : '').padEnd(decimalMaxLen, '0')

      // 分段
      const num1DecimalSegment = this.segment(this.num1Arr[1])
      const num2DecimalSegment = this.segment(num2Arr[1])

      for (let i = num1DecimalSegment.length - 1, carry = 0, numLen = 0; i >= 0; i--) {
        carry = 0

        numLen = num1DecimalSegment[i].length

        if (Number.parseInt(num1DecimalSegment[i]) < Number.parseInt(num2DecimalSegment[i])) {
          num1DecimalSegment[i] = '1' + num1DecimalSegment[i]

          carry = -1
        }

        num1DecimalSegment[i] = (Number.parseInt(num1DecimalSegment[i]) - Number.parseInt(num2DecimalSegment[i]) + this.carry).toString().padStart(numLen, '0')

        this.carry = carry
      }

      this.num1Arr[1] = num1DecimalSegment.join('')
    }

    this.num1Arr[0] = (Number.parseInt(this.num1Arr[0]) + this.carry - Number.parseInt(num2Arr[0])).toString()

    return this
  }

  /** 相除 */
  division (num2: string) {
    const num2Arr = num2.split('.') as INumArr
    const num2Int = num2Arr.join('')

    if (num2Arr[1]) {
      // 记录基数2的小数位
      const num2ArrDecimalLen = num2Arr[1].length

      // 重置小数点位置
      this.decimalPointPosition(num2ArrDecimalLen)
    }

    return this
  }

  result () {
    this.initNumber()

    if (this.isNegative) {
      this.num1Arr[0] = '-' + this.num1Arr[0]
    }

    return this.num1Arr[1] ? this.num1Arr.join('.') : this.num1Arr[0]
  }
}

new Calculator('12').division('0.02').result()
