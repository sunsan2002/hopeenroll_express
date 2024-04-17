const getRes = {
    //得到测试一的结果
    getResult1: (select1) => {
        if(!select1) return false
        select1 = select1.trim()
        if (select1.length != 33) return false
        let result1;
        let score = 0;
        for (let i = 0; i < select1.length; i++) {
            if (i <= 9) {
                switch (select1[i]) {
                    case 'A':
                        score += 6;
                        break;
                    case 'B':
                        score += 3;
                        break;
                }
            }
            else if (i >= 10 && i < 26) {
                switch (select1[i]) {
                    case 'A':
                        score += 5;
                        break;
                    case 'B':
                        score += 2;
                        break;
                }
            }
            else if (i >= 26 && i < 30) {
                if (select1[i] == 'B') score += 5
            }
            else if (i >= 30 && i < 34) {
                if (select1[i] == 'A') score += 1
                else if (select1[i] == 'B') score += 2
                else if (select1[i] == 'C') score += 3 
                else if (select1[i] == 'D') score += 4
                else if (select1[i] == 'E') score += 5
            }
        }
        if (score < 90) result1 = 'EQ较低'
        else if (score >= 90 && score <= 129) result1 = 'EQ中等'
        else if (score >= 130 && score <= 149) result1 = 'EQ较高'
        else result1 = 'EQ很高'
        return result1
    },
    
    // getTest3: () => {
    //      let score1 = 0, score2 = 0
    //      for (let item of arr) {
    //          if (select3[item.key] == item.value)
    //              score1++
    //          else score2++
    //      }
    //      if (score1 > score2) result += str[0]
    //      else result += str[1]
    //     return  1
    // },
    //得到测试二的结果
    getResult2: (select2) => {
        if(!select2) return false
        let result = '';
        select2 = select2.trim()
        if (select2.length != 90) return false
        let arr = [
            {
                name: '躯体化',
                index: [0, 3, 11, 26, 39, 41, 47, 48, 51, 52, 55, 57]
            },
            {
                name: '强迫症状',
                index: [2, 8, 9, 27, 37, 44, 45, 50, 54, 64]
            },
            {
                name: '人际关系',
                index: [5, 20, 33, 35, 36, 40, 60, 68, 72]
            },
            {
                name: '抑郁',
                index: [4, 13, 14, 19, 21, 25, 28, 29, 30, 31, 53, 70, 78]
            },
            {
                name: '焦虑',
                index: [1, 16, 22, 32, 38, 56, 71, 77, 79, 85]
            },
            {
                name: '敌对',
                index: [10, 23, 62, 66, 73, 80]
            },
            {
                name: '恐怖',
                index: [12, 24, 46, 49, 69, 74, 81]
            },
            {
                name: '偏执',
                index: [7, 17, 42, 67, 75, 82]
            },
            {
                name: '精神病性',
                index: [6, 15, 34, 61, 76, 83, 84, 86, 87, 89]
            },
            {
                name: '其他',
                index: [18, 43, 58, 59, 63, 65, 88]
            },
        ]
        for (let i of arr) {
            result = solveData(i.name, select2, result, i.index)
        }
        /**
     * 处理测试二的信息
     * @param {症状名称} str 
     * @param {测试2数组} select2 
     * @param {测试2结果} result 
     * @param {选题数组} arr 
     */
    function  solveData (str, select2, result, arr) {
        let score = 0
        const state = {
            'A':1,
            'B':2,
            'C':3,
            'D':4,
        }
        console.log(select2)
        for (let i of arr) {
            score += state[select2[i]]
        }
        let res 
        score = score / arr.length
        // console.log(score)
        if (score < 1.50) {
            res = '无';
        } else if (score >= 1.50 && score < 2.50) {
            res = '轻度';
        } else if (score >= 2.50 && score < 3.50) {
            res = '中度';
        } else if (score >= 3.50 && score < 4.50) {
            res = '重度';
        } else {
            res = '极重度';
        }
        result = result + str + res + ","
        return result
    }
        return result
    },

    //得到测试三结果
    getResult3: (select3) => {
        if(!select3) return false
        select3=select3.trim()
        if (select3.length != 93) return false
        let result = ''
        let score
        const state = [
            {
                str: 'EI',
                value: {
                    3: 'A',
                    7: 'A',
                    11: 'B',
                    13: 'A',
                    17: 'B',
                    18: 'A',
                    21: 'B',
                    22: 'A',
                    25: 'B',
                    26: 'B',
                    33: 'A',
                    34: 'B',
                    41: 'B',
                    47: 'B',
                    53: 'B',
                    59: 'B',
                    61: 'A',
                    65: 'B',
                    66: 'A',
                    71: 'B',
                    76: 'A',
                }
            },
            {
                str: 'SN',
                value: {
                    2: 'A',
                    4: 'B',
                    12: 'A',
                    14: 'B',
                    23: 'B',
                    28: 'B',
                    31: 'A',
                    36: 'B',
                    39: 'A',
                    43: 'B',
                    46: 'A',
                    49: 'B',
                    52: 'A',
                    54: 'B',
                    57: 'A',
                    60: 'A',
                    62: 'B',
                    72: 'A',
                    73: 'B',
                    78: 'B',
                    81: 'A',
                    82: 'B',
                    85: 'A',
                    86: 'B',
                    89: 'A',
                    92: 'A',
                }
            },
            {
                str: 'TF',
                value: {
                    5: 'B',
                    15: 'B',
                    29: 'B',
                    30: 'A',
                    37: 'B',
                    38: 'A',
                    44: 'B',
                    45: 'A',
                    50: 'B',
                    51: 'A',
                    55: 'B',
                    56: 'A',
                    63: 'B',
                    68: 'A',
                    74: 'B',
                    77: 'A',
                    79: 'B',
                    80: 'A',
                    83: 'B',
                    84: 'A',
                    87: 'B',
                    88: 'A',
                    90: 'B',
                    91: 'A',
                }
            },
            {
                str: 'JP',
                value: {
                    0: 'A',
                    1: 'B',
                    6: 'B',
                    8: 'A',
                    9: 'A',
                    10: 'B',
                    16: 'B',
                    19: 'A',
                    20: 'B',
                    24: 'B',
                    27: 'A',
                    32: 'B',
                    35: 'A',
                    40: 'B',
                    42: 'A',
                    48: 'A',
                    58: 'A',
                    64: 'B',
                    67: 'A',
                    69: 'A',
                    70: 'B',
                    75: 'B',
                }
            }
        ]
        for (let item of state) {
            // console.log(item.value)
            result = getTest3(item.str, item.value, select3, result)
        }
    /**
     * 
     * @param {第一种人格} sre1 
     * @param {第二种人格} str2 
     * @param {选题数组} arr1 
     * @param {选题数组} arr2
     * @param {结果字符串} result
     * @param {测试三选择} select3
     */
        function getTest3(str, arr, select3, result) {
            let score1 = 0, score2 = 0
            const myMap = new Map(Object.entries(arr));
            for (let item of myMap) {
                if (select3[item[0]] == item[1])
                    score1++
                else score2++
            }
            console.log(score1, score2)
            if (score1 > score2) result += str[0]
            else result += str[1]
            return result
        }
        return result
    },
    //得到测试四结果
    getResult4: (select4) => {
        if(!select4) return false
        select4 = select4.trim()
        if (select4.length != 10) return false
        let score = 0
        let arr = [
            {
                'A': 20,
                'B': 20,
                'C': 20,
                'D': 0,
            },
            {
                'A': 0,
                'B': 20,
                'C': 0,
                'D': 0,
            },
            {
                'A': 20,
                'B': 0,
                'C': 20,
                'D': 0,
            },
            {
                'A': 0,
                'B': 0,
                'C': 20,
                'D': 0,
            },
            {
                'A': 0,
                'B': 0,
                'C': 20,
                'D': 0,
            },
            {
                'A': 0,
                'B': 5,
                'C': 5,
                'D': 20,
            },
            {
                'A': 20,
                'B': 0,
                'C': 0,
                'D': 0,
            },
            {
                'A': 0,
                'B': 20,
                'C': 0,
                'D': 0,
            },
            {
                'A': 0,
                'B': 5,
                'C': 0,
                'D': 20,
            },
            {
                'A': 0,
                'B': 20,
                'C': 0,
                'D': 0,
            },


        ]
        for (let i = 0; i < 10; i++) {
            let select = select4[i]
            score += arr[i][select];
        }
        return String(score)
    }
}



module.exports = getRes;