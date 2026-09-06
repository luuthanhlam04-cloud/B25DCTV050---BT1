// ============================
// KHỞI TẠO DOM
// ============================
const display = document.getElementById("display");

// ============================
// STATE
// ============================
let currentInput = "";
let previousInput = "";
let operator = "";
let justCalculated = false;

// ============================
// updateDisplay()
// Đồng bộ state → DOM
// ============================
function updateDisplay() {
    display.innerText = currentInput || "0";
}

// ============================
// inputNumber(value)
// Xử lý click số 0–9
// ============================
function inputNumber(value) {
    // Xử lý khi đang ở trạng thái lỗi: Đặt lại toàn bộ dữ liệu
    if (currentInput === "Lỗi") {
        currentInput = "";
        previousInput = "";
        operator = "";
        justCalculated = false;
    }

    // Bắt đầu số mới sau khi đã tính toán xong (không nối vào kết quả cũ)
    if (justCalculated) {
        currentInput = "";
        justCalculated = false;
    }

    // Xử lý chuỗi số bắt đầu bằng 0 (ví dụ: thay thế số 0 đầu tiên)
    if (currentInput === "0" || currentInput === "") {
        currentInput = value;
    } else {
        currentInput += value;
    }

    updateDisplay();
}

// ============================
// chooseOperator(value)
// Xử lý click +, -, *, /
// ============================
function chooseOperator(value) {
    // Bỏ qua nếu đang ở trạng thái lỗi
    if (currentInput === "Lỗi") {
        return;
    }

    // Xử lý nhập toán tử liên tiếp (ví dụ: 7 + +): Cập nhật toán tử mới
    if (currentInput === "" && previousInput !== "") {
        operator = value;
        return;
    }

    // Xử lý tiếp tục tính toán với kết quả vừa tính được
    if (justCalculated) {
        previousInput = currentInput;
        operator = value;
        currentInput = "";
        justCalculated = false;
        updateDisplay();
        return;
    }

    // Trạng thái bình thường: Lưu toán hạng đầu tiên, toán tử và chuẩn bị nhận số thứ hai
    if (currentInput === "") {
        return;
    }

    previousInput = currentInput;
    operator = value;
    currentInput = "";
    justCalculated = false;
    updateDisplay();
}

// ============================
// calculate(a, b, op)
// Tính kết quả
// ============================
function calculate(a, b, op) {
    if (op === "+") return a + b;
    if (op === "-") return a - b;
    if (op === "*") return a * b;
    if (op === "/") {
        if (b === 0) return "Lỗi";
        return a / b;
    }
    return "Lỗi"; // Giá trị mặc định khi có lỗi xảy ra
}

// ============================
// handleEquals()
// Xử lý click =
// ============================
function handleEquals() {
    // Guard: chỉ tính khi có đủ dữ liệu
    if (!currentInput || !previousInput || !operator) {
        return;
    }

    // Guard: đang ở trạng thái lỗi
    if (currentInput === "Lỗi" || previousInput === "Lỗi") {
        return;
    }

    const a = parseFloat(previousInput);
    const b = parseFloat(currentInput);
    let result = calculate(a, b, operator);

    if (result === "Lỗi") {
        // Gán trạng thái lỗi
        currentInput = "Lỗi";
    } else {
        // Xử lý độ dài số thập phân hiển thị
        // toFixed(10) và parseFloat() giúp loại bỏ các chữ số 0 dư thừa (ví dụ: 2.0000000000 -> 2)
        result = parseFloat(result.toFixed(10));
        currentInput = String(result);
    }

    previousInput = "";
    operator = "";
    justCalculated = true;

    updateDisplay();
}

// ============================
// handleClear()
// Xử lý click C — reset toàn bộ
// ============================
function handleClear() {
    currentInput = "";
    previousInput = "";
    operator = "";
    justCalculated = false;
    updateDisplay(); // hiển thị "0"
}

// ============================
// EVENT BINDING
// ============================

// Số 0–9
const numberBtns = document.querySelectorAll(".number");
numberBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
        inputNumber(this.getAttribute("data-value"));
    });
});

// Operator +, -, *, /
const operatorBtns = document.querySelectorAll(".operator");
operatorBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
        chooseOperator(this.getAttribute("data-value"));
    });
});

// Equal =
document.getElementById("btnEqual").addEventListener("click", handleEquals);

// Clear C
document.getElementById("btnClear").addEventListener("click", handleClear);
