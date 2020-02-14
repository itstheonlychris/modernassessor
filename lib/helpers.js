const padZeros = n => {
	if (n <= 9) {
		return '0' + n;
	}
	return n;
};

const getCurDate = () => {
	var divider = '';
	var yearLength = 2;
	var d = new Date(Date(0));
	var yearTrim = yearLength === 2 ? 2 : 0;
	var date =
		'' +
		padZeros(d.getMonth() + 1) +
		divider +
		padZeros(d.getDate()) +
		divider +
		d
			.getFullYear()
			.toString()
			.substring(yearTrim, 4);
	return date;
};

module.exports = {
	padZeros: padZeros,
	getCurDate: getCurDate
};
