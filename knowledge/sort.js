// 今天重温算法题的时候，发现排序这块又忘的差不多了
// 之前都是用python刷的题，最近连python的用法也忘了大部分了，干脆用js重新记录一遍

// 需求：给定一个有整数组成的数组，实现从小到大排序
const arr = [1, -1, 2, 5, 3, 9, 7, 6, 7, 1]

// 第 0 种方案：使用js提供的原声api，sort
function sortIntegers(arr) {
  return arr.sort((a, b) => {
    return a - b
  })
}

// 第 1 种方案：冒泡排序，平均时间复杂度O(n^2)，空间复杂度O(1)
// 思想：两两元素对比，按照大小关系，两两进行交换。
function bubbleSort(arr) {
  const len = arr.length
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i - 1; j++) { // len - 1 - i 表示已经排序过的节点不用二次排序
      if (arr[j] > arr[j+1]) {
        // es5 交换方式
        const tmp = arr[j+1]
        arr[j+1] = arr[j]
        arr[j] = tmp
        // es6 交换方式
        // [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
      }
    }
  }
  return arr
}

// 第 2 种方案：选择排序，平均时间复杂度 O(n^2)，空间复杂度O(1)
// 思想：从数组中选择 最小/最大 的元素，与首位交换
// 其他：适合小规模的数组，不占用额外空间
function selectionSort(arr) {
  const len = arr.length
  let minIndex
  for (let i = 0; i < len; i++) {
    minIndex = i
    for (let j = i+1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    // 进行交换，两种方式，同上，这里直接用es6的方法
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
  }
  return arr
}

// 第 3 种方案：插入排序，平均时间复杂度 O(n^2)，空间复杂度O(1)
// 思想：将数组分成两堆，一堆是有序数组，一堆是未排序数组，然后将未排序数组的元素，倒序两两交换，直到插入到指定位置
// 
function insertionSort(arr) {
  const len = arr.length
  let preIndex, current // 将数组分成两堆，preIndex以及之前是第一堆，current之后是第二堆，current是当前被排序值
  for (let i = 1; i < len; i++) {
    preIndex = i - 1
    current = arr[i] // 这里因为是直接交换值，不需要保存索引
    while( preIndex >= 0 && arr[preIndex] > current ) {
      arr[preIndex + 1] = arr[preIndex]
      preIndex--
    }
    arr[preIndex + 1] = current // 最后一步，将current值赋给 preIndex + 1，这里为什么是preIndex + 1，是因为上一步多做了一次preIndex--
  }
  return arr
}

// 第 4 种方案：归并排序，
// 思想：分而治之思想的主要体现。特点是 先分 而 后治，
//      在归并排序里，分指的是，讲数组一分为二，剩下的再各自一分为二，直到不能分位置
//      治的是指，当分到不可分之后，再进行处理，这里是指两两比较，得到排序后的顺序
// 递归实现
function mergeSort(arr) {
  if (arr.length < 2) { // 确定最小原子，不然会造成不限递归
    return arr
  }
  // 确定分的条件，这里是一分为二
  const middle = parseInt(arr.length / 2)
  const leftArr = arr.slice(0, middle)
  const rightArr = arr.slice(middle)

  // 递归，将剩下的数组继续分，分到不可分为止
  return merge(mergeSort(leftArr), mergeSort(rightArr))
}

function merge (leftArr, rightArr) {
  // 得到左右两侧的数组，进行排序
  // 由于得到的数据结构是数组类型，需要将数组元素取出比较
  // 同时两侧数组的元素数量不一定相同，例如[2]和[1,3]比较
  const r = []

  while(leftArr.length && rightArr.length) {
    if (leftArr[0] < rightArr[0]) {
      r.push(leftArr.shift())
    } else {
      r.push(rightArr.shift())
    }
  }

  if (leftArr.length) {
    r.push(...leftArr)
  }
  if (rightArr.length) {
    r.push(...rightArr)
  }
  return r
}

// 第 5 种方案：快速排序
// 思想：也是基于分治思想的一种排序方法
// 首先需要选出一个“基准（pivot）”，然后进行分区操作，最后递归地重复上述操作
function quickSort (arr) {
  const len = arr.length
  if (len < 2) {
    return arr
  }
  const pivot = arr[0]
  const smaller = arr.slice(1).filter(item => item <= pivot) // 这里别忘记切割，因为要去掉pivot
  const bigger = arr.slice(1).filter(item => item > pivot)
  return [...quickSort(smaller), pivot, ...quickSort(bigger)]
}
