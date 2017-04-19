 const verificationNum = val => {
	const reg = new RegExp('^[0-9]*$')

	return reg.test(val)
}

const eimalReg = val => {
	const reg = new RegExp(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/)

	return reg.test(val)
}

const phoneEeg = val => {
	const reg = /^1[3|4|5|7|8][0-9]{9}$/
	return reg.test(val)
}
