// ============================
// Hiển thị lời chào theo thời gian thực
// ============================
const greetingEl = document.getElementById("greeting");
const hour = new Date().getHours();

let loiChao = "";

if (hour >= 5 && hour < 12) {
    loiChao = "Chào buổi sáng! Chúc bạn một ngày tốt lành! ☀️";
} else if (hour >= 12 && hour < 18) {
    loiChao = "Chào buổi chiều! Chúc bạn buổi chiều vui vẻ! 🌤️";
} else {
    loiChao = "Chào buổi tối! Chúc bạn buổi tối an lành! 🌙";
}

greetingEl.innerText = loiChao;

// ============================
// Chức năng đổi màu nền ngẫu nhiên
// ============================
const btnChangeColor = document.getElementById("btnChangeColor");

const colors = [
    "#f0f2f5",
    "#d5f5e3",
    "#d6eaf8",
    "#fdebd0",
    "#f5eef8",
    "#fef9e7"
];

let colorIndex = 0;

btnChangeColor.addEventListener("click", function () {
    colorIndex = (colorIndex + 1) % colors.length;
    document.body.style.backgroundColor = colors[colorIndex];
});
