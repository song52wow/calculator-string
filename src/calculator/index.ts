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
  private decimalPointPosition (num2DecimalLength: number, before = false) {
    let fullValue = ''

    if (!before) { // 小数点往后移
      // 先补全0
      fullValue = this.num1Arr[0].padStart(num2DecimalLength, '0')

      this.num1Arr[1] = fullValue.substr(fullValue.length - num2DecimalLength, num2DecimalLength) + (this.num1Arr[1] || '')

      this.num1Arr[0] = fullValue.substr(0, fullValue.length - num2DecimalLength) || '0'
    } else { // 小数点往前移
      fullValue = (this.num1Arr[1] || '').padEnd(num2DecimalLength, '0')

      this.num1Arr[0] = this.num1Arr[0] + fullValue.substr(0, num2DecimalLength)

      const regexp = new RegExp(`^([0-9]{${num2DecimalLength}})`)

      this.num1Arr[1] = fullValue.replace(regexp, () => '')
    }
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

    // 去除基数2前面的0
    const newNum2Int = num2Int.replace(/^([0]+)/, () => '').replace(/([0]+)$/, () => '')

    this.decimalPointPosition((num2Arr[1] || '').length, true)

    let [result, carry] = ['', '']

    const computed = () => {
      if (Number.parseInt(carry) >= Number.parseInt(newNum2Int)) {
        result += (Number.parseInt(carry) / Number.parseInt(newNum2Int)).toString()

        carry = (Number.parseInt(carry) % Number.parseInt(newNum2Int)).toString()
      } else {
        result += '0'
      }

      result = result.replace(/(\.\d+)?$/, () => '')
    }

    for (let i = 0, len = 1; i < len; i++) {
      carry += this.num1Arr[0][i] || '0'

      computed()

      if (len < this.num1Arr[0].length || (carry !== '0' && len < this.num1Arr[0].length + 30)) {
        len++
      }
    }
    // }

    const regexp = new RegExp(`^([0-9]{${this.num1Arr[0].length}})`)

    result = result.replace(regexp, (v1) => v1 ? `${v1}.` : v1).replace(/^([0]*)(\d+\.)/, '$2')

    // if (this.num1Arr[1]) {
    //   result = result.replace(/(.\d)?$/, () => '.')

    //   const num1DecimalSegment = this.segment(this.num1Arr[1])

    //   for (let i = 0; i < num1DecimalSegment.length; i++) {
    //     result += (Number.parseInt(carry + num1DecimalSegment[i]) / Number.parseInt(newNum2Int)).toString()

    //     carry = (Number.parseInt(num1DecimalSegment[i]) % Number.parseInt(newNum2Int)).toString()
    //   }
    // }

    this.num1Arr = result.split('.') as INumArr

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

new Calculator('0.2').division('2').result()
