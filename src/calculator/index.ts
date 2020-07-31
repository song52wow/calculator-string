type INumArr = [string, string?]

export class Calculator {
  /** 整数num1 */
  private num1: string
  /** 小数位长度 */
  private decimalLen = 0
  /** 是否为负数 */
  private isNegative = false

  constructor (num1: string) {
    this.decimalLen = this.getDecimalLength(num1)

    this.num1 = num1
  }

  /**
   * 计算小数位长度
   * @param num
   */
  private getDecimalLength (num: string) {
    const numArr = num.split('.')

    return numArr[1] ? numArr[1].length : 0
  }

  /** 计算小数点位置 */
  private pointPosition (num: string): string {
    if (this.decimalLen === 0) return num

    const numArr = num.split('.')

    if (this.decimalLen > 0) {
      // 补全0
      numArr[0] = numArr[0].padStart(this.decimalLen + 1, '0')

      const decimal = (numArr[0].substr(numArr[0].length - this.decimalLen) + (numArr[1] || '')).replace(/[0]*$/, '')

      if (decimal) {
        numArr[1] = decimal
      }

      numArr[0] = numArr[0].substr(0, numArr[0].length - this.decimalLen)

      return numArr.join('.')
    } else {
      numArr[1] = (numArr[1] || '').padEnd(Math.abs(this.decimalLen), '0')

      const numDecimalLength = numArr[1].length

      this.decimalLen += numDecimalLength

      return this.pointPosition(numArr.join(''))
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

  /** 相乘 */
  multiply (num2: string) {
    if (/^1[0]+$/.test(num2)) {
      this.decimalLen = -(num2.length - 1)

      this.num1 = this.pointPosition(this.num1)
    } else {
      // 叠加小数位长度
      this.decimalLen += this.getDecimalLength(num2)

      const num1IntStr = this.num1.split('.').join('')
      const num2IntStr = num2.split('.').join('')

      const num1Segment = this.segment(num1IntStr)
      const num2Segment = this.segment(num2IntStr)

      let carry = '0'

      for (let iLen = num1Segment.length, i = iLen - 1, iResult = ''; i >= 0; i--) {
        for (let jLen = num2Segment.length, j = jLen - 1, jNumLen = 0, jResultArr = [], jResult = ''; j >= 0; j--) {
          jResult = (Number.parseInt(num1Segment[i]) * Number.parseInt(num2Segment[j])).toString()

          jResultArr.unshift(jResult + ''.padEnd(jNumLen, '0'))

          if (j > 0) {
            jNumLen += num2Segment[j].length
          }

          if (j === 0) {
            jResult = jResultArr.reduce((pre, cur) => (Number.parseInt(pre) + Number.parseInt(cur)).toString(), carry)

            iResult = jResult.substr(i > 0 ? jResult.length - num1Segment[i].length : 0) + iResult

            carry = jResult.substr(0, jResult.length - num1Segment[i].length) || '0'
          }
        }

        if (i === 0) {
          this.num1 = this.pointPosition(iResult)
        }
      }
    }

    return this
  }

  /** 相加 */
  plus (num2: string) {
    // 计算小数位
    this.decimalLen = Math.max(this.decimalLen, this.getDecimalLength(num2))

    let carry = '0'

    const num1Arr = this.num1.split('.') as INumArr
    const num2Arr = num2.split('.') as INumArr

    const decimalMaxLen = Math.max((num1Arr[1] || '').length, (num2Arr[1] || '').length)
    const intMaxLen = Math.max(num1Arr[0].length, num2Arr[0].length)

    // 补全位长度
    num1Arr[0] = num1Arr[0].padStart(intMaxLen, '0')
    num2Arr[0] = num2Arr[0].padStart(intMaxLen, '0')

    if (decimalMaxLen) {
      num1Arr[1] = (num1Arr[1] || '').padEnd(decimalMaxLen, '0')
      num2Arr[1] = (num2Arr[1] || '').padEnd(decimalMaxLen, '0')
    }

    const num1Segment = this.segment(num1Arr.join(''))
    const num2Segment = this.segment(num2Arr.join(''))

    for (let len = num1Segment.length, i = len - 1, resultStr = '', resultArr = []; i >= 0; i--) {
      resultStr = (Number.parseInt(num1Segment[i]) + Number.parseInt(num2Segment[i]) + Number.parseInt(carry)).toString().padStart(num1Segment[i].length, '0')

      if (i === 0) {
        resultArr.unshift(resultStr)

        this.num1 = this.pointPosition(resultArr.join(''))
      } else {
        resultArr.unshift(resultStr.substr(resultStr.length - num1Segment[i].length, num1Segment[i].length))
      }

      carry = resultStr.substr(0, resultStr.length - num1Segment[i].length) || '0'
    }

    return this
  }

  /** 相减 */
  minus (num2: string) {
    // 计算小数位
    this.decimalLen = Math.max(this.decimalLen, this.getDecimalLength(num2))

    let carry = '0'

    let num1Arr = []
    let num2Arr = []

    if (Number.parseFloat(this.num1) < Number.parseFloat(num2)) {
      num1Arr = num2.split('.') as INumArr
      num2Arr = this.num1.split('.') as INumArr
      this.isNegative = true
    } else {
      num1Arr = this.num1.split('.') as INumArr
      num2Arr = num2.split('.') as INumArr
    }

    const decimalMaxLen = Math.max((num1Arr[1] || '').length, (num2Arr[1] || '').length)
    const intMaxLen = Math.max(num1Arr[0].length, num2Arr[0].length)

    // 补全位长度
    num1Arr[0] = num1Arr[0].padStart(intMaxLen, '0')
    num2Arr[0] = num2Arr[0].padStart(intMaxLen, '0')

    if (decimalMaxLen) {
      num1Arr[1] = (num1Arr[1] || '').padEnd(decimalMaxLen, '0')
      num2Arr[1] = (num2Arr[1] || '').padEnd(decimalMaxLen, '0')
    }

    const num1Segment = this.segment(num1Arr.join(''))
    const num2Segment = this.segment(num2Arr.join(''))

    for (let len = num1Segment.length, i = len - 1, resultStr = '', resultArr = []; i >= 0; i--) {
      if (Number.parseInt(num1Segment[i]) < Number.parseInt(num2Segment[i])) {
        num1Segment[i] = '1' + num1Segment[i]

        resultStr = (Number.parseInt(num1Segment[i]) - Number.parseInt(num2Segment[i]) + Number.parseInt(carry)).toString().padStart(num2Segment[i].length, '0')

        resultArr.unshift(resultStr.substr(resultStr.length - num2Segment[i].length, num2Segment[i].length))

        carry = '-1'
      } else {
        resultStr = (Number.parseInt(num1Segment[i]) - Number.parseInt(num2Segment[i]) + Number.parseInt(carry)).toString().padStart(num2Segment[i].length, '0')

        resultArr.unshift(resultStr.substr(resultStr.length - num1Segment[i].length, num1Segment[i].length))

        carry = resultStr.substr(0, resultStr.length - num1Segment[i].length) || '0'
      }

      if (i === 0) {
        this.num1 = this.pointPosition(resultArr.join(''))
      }
    }

    return this
  }

  /** 相除 */
  division (num2: string) {
    // 判断基数2为0，直接报NaN
    if (Number.parseFloat(num2) === 0) {
      console.error(new Error('Num2 cannot be 0'))

      return this
    }

    if (/^1[0]+$/.test(num2)) {
      this.decimalLen = num2.length - 1

      this.num1 = this.pointPosition(this.num1)
    } else {
      const num2Arr = num2.split('.') as INumArr

      // 记录基数2的小数位长度
      if (num2Arr[1]) {
      // 移除小数位
        this.decimalLen = -num2Arr[1].length

        this.num1 = this.pointPosition(this.num1)

        this.decimalLen = 0
      }

      const num1Arr = this.num1.split('.')

      const num2Int = num2Arr.join('').replace(/^[0]*/, () => '')

      // 最大计算次数
      const maxComputedLen = 30

      const resultArr = [''] as string[]

      let carry = ''

      const computed = (i: 0|1) => {
        if (Number.parseInt(carry) >= Number.parseInt(num2Int)) {
          resultArr[i] += (Number.parseInt(carry) / Number.parseInt(num2Int)).toString()

          carry = (Number.parseInt(carry) % Number.parseInt(num2Int)).toString()
        } else {
          resultArr[i] += '0'
        }

        resultArr[i] = resultArr[i].replace(/(\.\d+)?$/, () => '')
      }

      // 计算整数位的结果
      for (let i = 0, len = 1; i < len; i++) {
        carry += num1Arr[0][i] || '0'

        computed(0)

        if (len < num1Arr[0].length || (carry !== '0' && len < num1Arr[0].length + maxComputedLen && !num1Arr[1])) {
          len++
        }
      }

      if (num1Arr[1]) {
        resultArr[1] = ''

        // 去除小数位
        for (let i = 0, len = 1; i < len; i++) {
          carry += num1Arr[1][i] || '0'

          computed(1)

          if (len < num1Arr[1].length || (carry !== '0' && len < num1Arr[1].length + maxComputedLen)) {
            len++
          }
        }
      } else {
        const decimal = resultArr[0].substr(num1Arr[0].length).replace(/[0]*$/, '')
        if (decimal) {
          resultArr[1] = decimal
        }
        resultArr[0] = resultArr[0].substr(0, num1Arr[0].length)
      }

      this.num1 = resultArr.join('.').replace(/^[0]*([0-9]+)/, '$1')
    }
    return this
  }

  result () {
    if (this.isNegative) {
      this.num1 = '-' + this.num1
    }

    return this.num1
  }
}
