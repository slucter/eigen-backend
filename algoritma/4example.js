// const reverse = (string) => {
//     let str = string.match(/([A-Za-z]+)(\d+)/) // Pemisah string dan angka
//     let res = ''
//     for (let i = str[1].length; i > 0; i--) {
//         res += str[1].charAt(i-1)
//     }
//     return res + str[2]
// }

// const result = reverse('NEGIE1')
// console.log(result);


// const terpanjang = (kalimat) => {
//     const kataKata = kalimat.split(' ')
//     let terpanjang = 0
//     let kataTerpanjang = ''

//     for (let i = 0; i < kataKata.length; i++) {
//         const kata = kataKata[i]
//         if (kata.length > terpanjang) {
//             terpanjang = kata.length
//             kataTerpanjang = kata
//         }
//     }
//     return kataTerpanjang
// }
// const result = terpanjang('Saya sangat senang mengerjakan soal algoritma')
// console.log(result);

// const kembaran = (input, query) => {
//     const hasil = query;
//     for (let i = 0; i < hasil.length; i++) {
//         const string = hasil[i]
//         let total = 0
//         for (let u = 0; u < input.length; u++) {
//             if (string === input[u]) {
//                 total += 1
//             }
//         }
//         hasil[i] = total
//     }
//     return hasil
// }
// const INPUT = ['xc', 'dz', 'bbb', 'dz', 'dz', 'bbb']  
// const QUERY = ['bbb', 'ac', 'dz'] 
// const result = kembaran(INPUT, QUERY)
// console.log(result);

// const matrixDiagonal = (matrix) => {
//     let diagonal1 = 0;
//     let diagonal2 = 0;

//     for (let i = 0; i < matrix.length; i++) {
//         diagonal1 += matrix[i][i]
//     }
//     for (let i = 0; i < matrix.length; i++) {
//         diagonal2 += matrix[i][matrix.length - 1 - i]
//     }

//     return diagonal1 - diagonal2
// }

// const Matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]]
// const result = matrixDiagonal(Matrix)
// console.log(result);