
document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // تسجيل الدخول
    // =========================

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;

            if (email && password) {
                localStorage.setItem("almaabUser", email);
                window.location.href = "index.html";
            }
        });
    }

    // =========================
    // سلة المشتريات
    // =========================

    let cart = JSON.parse(localStorage.getItem("almaabCart")) || [];

    function saveCart() {
        localStorage.setItem("almaabCart", JSON.stringify(cart));
    }

    function renderCart() {
        const items = document.getElementById("cart-items");
        const count = document.getElementById("cart-count");
        const totalElement = document.getElementById("cart-total");

        if (!items || !count || !totalElement) return;

        items.innerHTML = "";

        let total = 0;
        let quantityTotal = 0;

        if (cart.length === 0) {
            items.textContent = "السلة فارغة حالياً 🛒";
        }

        cart.forEach(function (item, index) {
            total += item.price * item.quantity;
            quantityTotal += item.quantity;

            const div = document.createElement("div");

            const name = document.createElement("h3");
            name.textContent = item.name;

            const price = document.createElement("p");
            price.textContent = item.price.toLocaleString() + " جنيه";

            const quantity = document.createElement("p");
            quantity.textContent = "الكمية: " + item.quantity;

            const plus = document.createElement("button");
            plus.textContent = "+";
            plus.onclick = function () {
                cart[index].quantity++;
                saveCart();
                renderCart();
            };

            const minus = document.createElement("button");
            minus.textContent = "-";
            minus.onclick = function () {
                cart[index].quantity--;
                if (cart[index].quantity <= 0) {
                    cart.splice(index, 1);
                }
                saveCart();
                renderCart();
            };

            const remove = document.createElement("button");
            remove.textContent = "حذف";
            remove.onclick = function () {
                cart.splice(index, 1);
                saveCart();
                renderCart();
            };

            div.append(name, price, quantity, plus, minus, remove);
            items.appendChild(div);
        });

        count.textContent = quantityTotal;
        totalElement.textContent = total.toLocaleString();
    }

    // إضافة المنتج
    window.addToCart = function (button) {
        const product = button.closest(".product-card");

        if (!product) return;

        const name = product.dataset.name;
        const price = Number(product.dataset.price);

        if (!name || !Number.isFinite(price)) return;

        const existing = cart.find(item => item.name === name);

        if (existing) {
            existing.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        saveCart();
        renderCart();

        alert("تمت إضافة المنتج إلى السلة ❤️");
    };

    // فتح وإغلاق السلة
    window.toggleCart = function () {
        const section = document.getElementById("cart-section");

        if (!section) return;

        section.style.display =
            section.style.display === "none" ? "block" : "none";

        renderCart();
    };

    // إفراغ السلة
    window.clearCart = function () {
        if (confirm("هل تريدين إفراغ السلة؟")) {
            cart = [];
            saveCart();
            renderCart();
        }
    };

    // إتمام الشراء
    window.checkout = function () {
        if (cart.length === 0) {
            alert("السلة فارغة!");
            return;
        }

        alert("تم تجهيز طلبك بنجاح ❤️");
    };

    renderCart();

});
