import { apiTokened } from "../../config/api";
import { notifyError, notifyWarningExpired } from "src/utils/notify";
import auth from "src/stores/auth-store";
import toArray from "src/utils/to-array";
import { params, router } from './ProductAll.vue';

// `products/categories/${params.value.category}`
function fetchApi(url) {

try {
const response = await apiTokened.get(
`products/categories/${params.value.category}`
);
const result = response.data.data;
return result;
} catch (error) {
console.log(error);
const status = error.response.status;
const message = error.response.data.message;
let isExp = false;
if (message) {
const arrMessage = toArray(message);
for (const msg of arrMessage) {
if (msg.toLowerCase().includes("expired") ||
msg.toLowerCase().includes("login kembali")) {
isExp = true;
break;
}
}
}

if (status == 401 && isExp) {
message.forEach((msg) => {
notifyWarningExpired(msg);
});
auth().$reset();
router.push("/login");
} else if (message) {
toArray(message).forEach((msg) => {
notifyError(msg);
});
} else {
console.log(error);
}
}
}
