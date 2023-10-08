import digitSeparator from "src/utils/digit-separator";

function sumRows(data, rowTotal, fieldTotal = "sub_total") {
	let totalRow = {};
	const total = {};

	data.forEach((row) => {
		for (const key in row) {
			if (key === rowTotal) {
				if (!totalRow[key]) {
					totalRow[key] = "__Total__";
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
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "m01",
		label: "Jan",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "m02",
		label: "Feb",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "m03",
		label: "Mar",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "m04",
		label: "Apr",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "m05",
		label: "Mei",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "m06",
		label: "Jun",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "m07",
		label: "Jul",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "m08",
		label: "Agu",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "m09",
		label: "Sep",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "m10",
		label: "Okt",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "m11",
		label: "Nov",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "m12",
		label: "Des",
		format: (val, row) => `${digitSeparator(val)}`,
	},
];

const columnMonth = (obj) => [
	obj,
	{
		field: "sub_total",
		label: "Total",
		sortable: true,
		sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
		name: "sub_total",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "d01",
		label: "01",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "d02",
		label: "02",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "d03",
		label: "03",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "d04",
		label: "04",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "d05",
		label: "05",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "d06",
		label: "06",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "d07",
		label: "07",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "d08",
		label: "08",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "d09",
		label: "09",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "d10",
		label: "10",
		format: (val, row) => `${digitSeparator(val)}`,
	},

	{
		field: "d11",
		label: "11",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "d12",
		label: "12",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "d13",
		label: "13",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "d14",
		label: "14",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "d15",
		label: "15",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "d16",
		label: "16",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "d17",
		label: "17",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "d18",
		label: "18",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "d19",
		label: "19",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "d20",
		label: "20",
		format: (val, row) => `${digitSeparator(val)}`,
	},

	{
		field: "d21",
		label: "21",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "d22",
		label: "22",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "d23",
		label: "23",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "d24",
		label: "24",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "d25",
		label: "25",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "d26",
		label: "26",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "d27",
		label: "27",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "d28",
		label: "28",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "d29",
		label: "29",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "d30",
		label: "30",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "d31",
		label: "31",
		format: (val, row) => `${digitSeparator(val)}`,
	},
];

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
		withChart: false,
		withSum: true,
		withYear: true,
	},
	{
		value: "profit",
		label: "Laba",
		response: "profit",
		fieldTotal: "store_name",
		fieldHead: "Toko",
		withChart: false,
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
	{ value: "01", lab: "Jan", label: "Januari" },
	{ value: "02", lab: "Feb", label: "Februari" },
	{ value: "03", lab: "Mar", label: "Maret" },
	{ value: "04", lab: "Apr", label: "April" },
	{ value: "05", lab: "Mei", label: "Mei" },
	{ value: "06", lab: "Jun", label: "Juni" },
	{ value: "07", lab: "Jul", label: "Juli" },
	{ value: "08", lab: "Agu", label: "Agustus" },
	{ value: "09", lab: "Sep", label: "September" },
	{ value: "10", lab: "Okt", label: "Oktober" },
	{ value: "11", lab: "Nov", label: "November" },
	{ value: "12", lab: "Des", label: "Desember" },
];

function monthsShort() {
	return monthOptions.map((month) => month.lab);
}

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
