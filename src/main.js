export function multiply(val1, val2) {
  
  let val1Arr = val1.split(".");
  let val1FloatResultArr = [];
  let val1IntRemainder = 0;

  let val2Arr = val2.split(".");
  let val2Num = Number.parseInt(val2);
  let val2FloatLen = 0;

  if (val2Arr[1]) {
    //         记录小数位长度
    val2FloatLen = val2Arr[1].length;

    val2Num = Number.parseInt(val2Arr.join(""));
  }

  if (val1Arr[1]) {
    let productArr = val1Arr[1]
      .split("")
      .reverse()
      .map(ele => Number.parseInt(ele) * val2Num);

    if (productArr.length > 1) {
      for (let i = 0; i < productArr.length - 1; i++) {
        productArr[i] = productArr[i]
          .toString()
          .replace(/(\d*)(\d{1})$/, (_v1, v2, v3) => {
            if (v2) {
              (productArr[i + 1]) += Number.parseInt(v2);
            }

            return v3;
          });
      }
    }

    val1FloatResultArr = productArr.reverse();

    val1FloatResultArr[0] = val1FloatResultArr[0]
      .toString()
      .replace(/(\d*)(\d{1})$/, (_v1, v2, v3) => {
        if (v2) {
          val1IntRemainder = Number.parseInt(v2);
        }

        return v3;
      });
  }

  val1Arr[0] = (
    Number.parseInt(val1Arr[0]) * val2Num +
    val1IntRemainder
  ).toString();

  val1Arr[1] = val1FloatResultArr.join("");

  const regexp = new RegExp(`(\\d*)(\\d{${val2FloatLen}})$`);

  return val1Arr[0].replace(regexp, (v1, v2, v3) => {
    const float = v3 + val1Arr[1];

    return float ? `${v2 || "0"}.${float}` : v2;
  });
}