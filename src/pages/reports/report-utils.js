function sumRows(data, fieldTotal) {
	let totalRow = {};
	const total = {};

	data.forEach((row) => {
		for (const key in row) {
			if (key === "store_name") {
				if (!totalRow[key]) {
					totalRow[key] = "Total";
				}
			}
			const checkKey = !isNaN(key.substring(1, 3)) || key === fieldTotal;
			if (checkKey) {
				if (!totalRow[key]) totalRow[key] = 0;
				totalRow[key] += parseInt(row[key]);
				if (!total[key]) total[key] = 0;
				total[key] += parseInt(row[key]);
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

function chartYear(data) {
	return {
		labels: monthsShort(),
		datasets: data.map((item, index) => ({
			label: item.store_name,
			data: Object.keys(item)
				.filter((key) => key.startsWith("m"))
				.map((key) => item[key]),
			backgroundColor:
				index === 0
					? "rgba(255, 99, 132, 0.5)"
					: "rgba(54, 162, 235, 0.5)",
			tension: 0.1,
		})),
	};
}

function chartMonth(data) {
	return {
		labels: daysInMonth(),
		datasets: data.map((item, index) => ({
			label: item.store_name,
			data: Object.keys(item)
				.filter((key) => key.startsWith("d"))
				.map((key) => item[key]),
			backgroundColor:
				index === 0
					? "rgba(255, 99, 132, 0.5)"
					: "rgba(54, 162, 235, 0.5)",
			tension: 0.1,
		})),
	};
}

const columnYear = [
	{ field: "store_name", label: "Toko", align: "left" },
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
	{ field: "sub_total", label: "Total" },
];

const columnMonth = [
	{ field: "store_name", label: "Toko", align: "left" },
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

	{ field: "sub_total", label: "Total" },
];

function arrayFromTo(f, t) {
	let result = [];
	for (let i = f; i <= t; i++) {
		result.push(i);
	}
	return result;
}

const reportOptions = [
	{ value: "transactions", label: "Transaksi" },
	{ value: "products-out", label: "Produk Keluar" },
];
const yearOptions = arrayFromTo(2021, 2030);
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
export {
	sumRows,
	chartMonth,
	chartYear,
	columnYear,
	columnMonth,
	reportOptions,
	yearOptions,
	monthOptions,
};