function sumRows(data, rowTotal, fieldTotal = "sub_total") {
	let totalRow = {};
	const total = {};

	data.forEach((row) => {
		for (const key in row) {
			if (key === rowTotal) {
				if (!totalRow[key]) {
					totalRow[key] = "Total";
				}
			}
			const checkKey = !isNaN(key.substring(1, 3)) || key === fieldTotal;
			if (checkKey) {
				if (!totalRow[key]) totalRow[key] = 0;
				totalRow[key] += parseInt(row[key]) || 0;
				if (!total[key]) total[key] = 0;
				total[key] += parseInt(row[key]) || 0;
			}
		}
	});

	return [...data, totalRow];
}

function monthsShort() {
	return [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"Mei",
		"Jun",
		"Jul",
		"Agu",
		"Sep",
		"Okt",
		"Nov",
		"Des",
	];
}

function daysInMonth() {
	let result = [];
	for (let index = 1; index <= 31; index++) {
		result.push(index);
	}
	return result;
}

function chartYear(data, objKey) {
	return {
		labels: monthsShort(),
		datasets: data.map((item, index) => ({
			label: item[objKey],
			data: Object.keys(item)
				.filter((key) => key.startsWith("m"))
				.map((key) => item[key]),
			backgroundColor:
				index % 2 == 0
					? "rgba(255, 99, 132, 0.5)"
					: "rgba(54, 162, 235, 0.5)",
			tension: 0.1,
		})),
	};
}

function chartMonth(data, objKey) {
	return {
		labels: daysInMonth(),
		datasets: data.map((item, index) => ({
			label: item[objKey],
			data: Object.keys(item)
				.filter((key) => key.startsWith("d"))
				.map((key) => item[key]),
			backgroundColor:
				index % 2 == 0
					? "rgba(255, 99, 132, 0.5)"
					: "rgba(54, 162, 235, 0.5)",
			tension: 0.1,
		})),
	};
}

const columnYear = (obj) => [
	obj,
	{
		field: "sub_total",
		label: "Total",
		sortable: true,
		sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
		name: "sub_total",
		// style: "display: none",
		// headerStyle: "display: none",
	},
	{ field: "m01", label: "Jan" },
	{ field: "m02", label: "Feb" },
	{ field: "m03", label: "Mar" },
	{ field: "m04", label: "Apr" },
	{ field: "m05", label: "Mei" },
	{ field: "m06", label: "Jun" },
	{ field: "m07", label: "Jul" },
	{ field: "m08", label: "Agu" },
	{ field: "m09", label: "Sep" },
	{ field: "m10", label: "Okt" },
	{ field: "m11", label: "Nov" },
	{ field: "m12", label: "Des" },
];

const columnMonth = (obj) => [
	obj,
	{
		field: "sub_total",
		label: "Total",
		sortable: true,
		sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
		name: "sub_total",
	},
	{ field: "d01", label: "01" },
	{ field: "d02", label: "02" },
	{ field: "d03", label: "03" },
	{ field: "d04", label: "04" },
	{ field: "d05", label: "05" },
	{ field: "d06", label: "06" },
	{ field: "d07", label: "07" },
	{ field: "d08", label: "08" },
	{ field: "d09", label: "09" },
	{ field: "d10", label: "10" },

	{ field: "d11", label: "11" },
	{ field: "d12", label: "12" },
	{ field: "d13", label: "13" },
	{ field: "d14", label: "14" },
	{ field: "d15", label: "15" },
	{ field: "d16", label: "16" },
	{ field: "d17", label: "17" },
	{ field: "d18", label: "18" },
	{ field: "d19", label: "19" },
	{ field: "d20", label: "20" },

	{ field: "d21", label: "21" },
	{ field: "d22", label: "22" },
	{ field: "d23", label: "23" },
	{ field: "d24", label: "24" },
	{ field: "d25", label: "25" },
	{ field: "d26", label: "26" },
	{ field: "d27", label: "27" },
	{ field: "d28", label: "28" },
	{ field: "d29", label: "29" },
	{ field: "d30", label: "30" },
	{ field: "d31", label: "31" },
];

function arrayFromTo(f, t) {
	let result = [];
	for (let i = f; i <= t; i++) {
		result.push(i);
	}
	return result;
}

const reportOptions = [
	{
		value: "transactions",
		label: "Transaksi",
		response: "transactions",
		fieldTotal: "store_name",
		fieldHead: "Toko",
		withChart: true,
		withSum: true,
		withYear: true,
	},
	{
		value: "products-out",
		label: "Produk Keluar",
		response: "products_out",
		fieldTotal: "product",
		fieldHead: "Produk",
		withChart: true,
		withSum: true,
		withYear: true,
	},
	{
		value: "products-stock",
		label: "Stok Produk",
		response: "products_stock",
		fieldTotal: "product",
		fieldHead: "Produk",
		withChart: false,
		withSum: false,
		withYear: false,
	},
];
const monthOptions = [
	{ value: "01", label: "Januari" },
	{ value: "02", label: "Februari" },
	{ value: "03", label: "Maret" },
	{ value: "04", label: "April" },
	{ value: "05", label: "Mei" },
	{ value: "06", label: "Juni" },
	{ value: "07", label: "Juli" },
	{ value: "08", label: "Agustus" },
	{ value: "09", label: "September" },
	{ value: "10", label: "Oktober" },
	{ value: "11", label: "November" },
	{ value: "12", label: "Desember" },
];

function selectedReport(reportValue) {
	return reportOptions.find((report) => report.value === reportValue);
}

export {
	sumRows,
	chartMonth,
	chartYear,
	columnYear,
	columnMonth,
	reportOptions,
	monthOptions,
	selectedReport,
};
