// This code block is executed once the HTML document has been fully loaded.
document.addEventListener('DOMContentLoaded', function() {
    // Retrieves the container element where cart items will be displayed.
    var cartItemsContainer = document.getElementById('cartItems');
    // Cố gắng phân tích mảng 'cart' từ localStorage hoặc mặc định là một mảng trống nếu không tìm thấy.
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
   // Kiểm tra xem giỏ hàng có trống không và hiển thị thông báo nếu đúng.
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<span>Your cart is empty</span>';
    } else {
        // Nếu giỏ hàng không trống, hãy lặp lại các mục trong giỏ hàng và tạo HTML cho từng mục.
        var itemsHtml = cart.map(function(item, index) {
            return `<div class="cart-item">
                        <img src="${item.img}" alt="${item.alt}"/>
                        <h4>${item.name} ${item.size ? '+ ' + item.size : ''} ${item.toppings ? ' ' + item.toppings.join(', ') : ''}</h4>
                        <div class="quantity-controls">
                            <button class="decrease-quantity">-</button>
                            <h5 class="quantity">1</h5>
                            <button class="increase-quantity">+</button>
                        </div>
                        <p class="price-entry">Price: ${item.price}.000 VND </p>
                        <button class="remove-item-btn" data-item-index="${index}">Remove</button>
                    </div>`;
        }).join(''); // Nối tất cả các chuỗi HTML của mục thành một chuỗi duy nhất.
        cartItemsContainer.innerHTML = itemsHtml; // Inserts the items HTML into the container.
        attachRemoveItemEventListeners(); // Attaches event listeners to the remove buttons.
        attachQuantityControlEventListeners(); // Attaches event listeners to the quantity control buttons.
    }

    // Lấy thông tin từ cartItems sau khi đã tạo và hiển thị giỏ hàng
    var updatedCartItems = cartItemsContainer.innerHTML;

    // Cập nhật thông tin vào itemPay
    var itemPayContainer = document.getElementById('itemPay');
    itemPayContainer.innerHTML = updatedCartItems;
});


// Hàm tính tổng giá tiền trong giỏ hàng
function calculateTotalPrice() {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var totalPrice = 0;

    cart.forEach(function(item) {
        totalPrice += item.price;
    });

    return totalPrice;
}

var totalPriceElement = document.getElementById('totalPrice');
var totalPrices = calculateTotalPrice();
totalPriceElement.textContent = totalPrices +  '.000 VND'; // Hiển thị tổng giá tiền

var totalPriceElement = document.getElementById('totalPricePay');
var totalPrices = calculateTotalPrice();
totalPriceElement.textContent = totalPrices +  '.000 VND'; // Hiển thị tổng giá tiền

function updateTotalPrice(newPrice) {
    var totalPriceElement = document.getElementById('totalPrice');
    var currentTotalPrice = parseFloat(totalPriceElement.textContent); // Lấy tổng giá tiền hiện tại
    var updatedTotalPrice = currentTotalPrice + newPrice; // Cộng giá tiền mới vào tổng giá tiền hiện tại

    if (totalPriceElement) {
        totalPriceElement.textContent = updatedTotalPrice + '.000 VND'; // Hiển thị tổng giá tiền

        // Cập nhật tổng giá tiền trong phần Pay
        var totalPricePayElement = document.getElementById('totalPricePay');
        if (totalPricePayElement) {
            totalPricePayElement.textContent = updatedTotalPrice + '.000 VND';
        } else {
            console.error('Element with id "totalPricePay" not found.');
        }
    } else {
        console.error('Element with id "totalPrice" not found.');
    }
}

// Hàm tăng số lượng sản phẩm và cập nhật giá trị trong "price-entry"
function increaseQuantity(button) {
    var quantityElement = button.parentElement.querySelector('.quantity');
    var currentQuantity = parseInt(quantityElement.textContent);
    quantityElement.textContent = currentQuantity + 1;

    var priceEntry = button.parentElement.nextElementSibling; // Lấy phần tử "price-entry" kế tiếp
    var itemPrice = parseFloat(priceEntry.textContent.split(' ')[1]); // Lấy giá tiền từ "price-entry"
    var originalPrice = itemPrice / (currentQuantity); // Lấy giá tiền ban đầu
    var totalPrice = originalPrice * (currentQuantity + 1); // Tính tổng giá tiền mới
    priceEntry.textContent = 'Price: ' + totalPrice + '.000 VND'; // Cập nhật giá trị trong "price-entry"

    updateTotalPrice(originalPrice);
    // Lấy lại thông tin giỏ hàng sau khi cập nhật số lượng sản phẩm và hiển thị trong phần Pay
    var cartItemsContainer = document.getElementById('cartItems');
    var updatedCartItems = cartItemsContainer.innerHTML;
    var itemPayContainer = document.getElementById('itemPay');
    itemPayContainer.innerHTML = updatedCartItems;
}


// Hàm giảm số lượng sản phẩm
function decreaseQuantity(button) {
    var quantityElement = button.parentElement.querySelector('.quantity');
    var currentQuantity = parseInt(quantityElement.textContent);

    if (currentQuantity > 1) { 
        quantityElement.textContent = currentQuantity - 1;
        var priceEntry = button.parentElement.nextElementSibling; // Lấy phần tử "price-entry" kế tiếp
        var itemPrice = parseFloat(priceEntry.textContent.split(' ')[1]); // Lấy giá tiền từ "price-entry"
        var originalPrice = itemPrice / (currentQuantity); // Lấy giá tiền ban đầu
        var totalPrice = originalPrice * (currentQuantity - 1); // Tính tổng giá tiền mới
        priceEntry.textContent = 'Price: ' + totalPrice + '.000 VND'; // Cập nhật giá trị trong "price-entry"

        updateTotalPrice(-originalPrice);
    }
}

// Gắn sự kiện click vào nút tăng và giảm số lượng
function attachQuantityControlEventListeners() {
    var increaseButtons = document.querySelectorAll('.increase-quantity');
    var decreaseButtons = document.querySelectorAll('.decrease-quantity');

    increaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            increaseQuantity(button);
        });
    });

    decreaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            decreaseQuantity(button);
        });
    });
}

// Gắn các trình nghe sự kiện click cho tất cả các nút xóa sản phẩm
function attachRemoveItemEventListeners() {
    var removeButtons = document.querySelectorAll('.remove-item-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            var itemIndex = parseInt(button.getAttribute('data-item-index'));
            removeItemFromCartAndReset(itemIndex);
        });
    });
}

// Xóa sản phẩm khỏi giỏ hàng, cập nhật Local Storage và reset dữ liệu sản phẩm trước
function removeItemFromCartAndReset(itemIndex) {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var removedItem = cart.splice(itemIndex, 1)[0]; // Xóa sản phẩm và lấy sản phẩm đã xóa
    localStorage.setItem('cart', JSON.stringify(cart)); // Cập nhật giỏ hàng trong Local Storage

    // Reset dữ liệu sản phẩm trước
    localStorage.setItem('selectedSizes', JSON.stringify([]));
    localStorage.setItem('selectedToppings', JSON.stringify([]));

    // Thêm sản phẩm mới vào Local Storage nếu sản phẩm đã xóa không trùng với sản phẩm mới
    var selectedSizes = JSON.parse(localStorage.getItem('selectedSizes')) || [];
    var selectedToppings = JSON.parse(localStorage.getItem('selectedToppings')) || [];

    // Kiểm tra và xử lý sizes của removedItem
    var removedSizes = Array.isArray(removedItem.sizes) ? removedItem.sizes : [removedItem.sizes];

    if (removedSizes.join(',') !== selectedSizes.join(',') || removedItem.toppings.join(',') !== selectedToppings.join(',')) {
        localStorage.setItem('selectedSizes', JSON.stringify(selectedSizes));
        localStorage.setItem('selectedToppings', JSON.stringify(selectedToppings));
    }

    // Tải lại trang sau khi xóa sản phẩm
    window.location.reload();
}

//Pay

const payBtns = document.querySelectorAll('.pay-js');
const payOpen = document.querySelector('.pay-jsOpen');
const payContainer = document.querySelector('.pay-jsContainer');
const payClose = document.querySelector('.pay-jsClose');

// Hàm hiển thị phương thức thanh toán
function showPay() {
    payOpen.classList.add('open');
}

// Hàm ẩn phương thức thanh toán
function hiddenPay() {
    payOpen.classList.remove('open');
}

// Lặp qua từng nút và lắng nghe các sự kiện nhấp chuột
for (const payBtn of payBtns) {
    payBtn.addEventListener('click', showPay);
}

// Lắng nghe sự kiện click vào nút đóng
payClose.addEventListener('click', hiddenPay);

// Lắng nghe các sự kiện nhấp chuột trên nền phương thức để đóng phương thức
payOpen.addEventListener('click', hiddenPay);

// Ngăn phương thức đóng khi nhấp vào bên trong phương thức
payContainer.addEventListener('click', function(event) {
    event.stopPropagation();
});



// Toast function
function toast({ title = '', message = '', type = 'info', duration = 3000 }) {
    const main = document.getElementById('toast');
    if (main) {
        const toast = document.createElement('div');

        const autoRemovedId = setTimeout(function() {
            main.removeChild(toast);
        }, duration + 1000);

        toast.onclick = function(e) {
            if (e.target.closest('.toast__close')) {
                main.removeChild(toast);
                clearTimeout(autoRemovedId);
            }
        };

        const icons = {
            success: '',
            info: '',
            warning: '',
            error: ''
        };
        const icon = icons[type];
        const delay = (duration / 1000).toFixed(2);

        toast.classList.add('toast', `toast--${type}`);
        toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
        toast.innerHTML = `
            <div class="toast__icon">
                <i class="${icon}"></i>
            </div>
            <div class="toast__body">
                <h3 class="toast__title">${title}</h3>
                <p class="toast__msg">${message}</p>
            </div>
            <div class="toast__close">
                <i class="fa-solid fa-xmark"></i>
            </div>
        `;
        main.appendChild(toast);
    }
}

// Function to show the success toast message
function showSuccessToast() {
    toast({
        title: 'Success',
        message: 'Payment successful',
        type: 'success',
        duration: 4000
    });
}

