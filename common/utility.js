  const xlsx = require('xlsx')

exports.exel2json = (sheet) => {
	const file = xlsx.readFile('public/sheet/' + sheet)
	let data = []
	const sheets = file.SheetNames
	for (let i = 0; i < sheets.length; i++) {
		const temp = xlsx.utils.sheet_to_json(
			file.Sheets[file.SheetNames[i]])
		temp.forEach((res) => {
			data.push(res)
		})
	}
	return data
}

exports.randomString = () => {
    var length = 5
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return "DP" + result.toUpperCase();
}