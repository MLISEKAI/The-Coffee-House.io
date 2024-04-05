
document.addEventListener('DOMContentLoaded', function() {
    var cartItemsContainer = document.getElementById('cartItems');
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Giỏ của bạn trống trơn.</p>';
    } else {
        var itemsHtml = cart.map(function(item, index) {
            return `<div class="cart-item">
                        <img src="${item.img}" alt="${item.alt}" />
                        <h4>${item.name}</h4>
                        <p>Price: ${item.price}</p>
                        <button class="remove-item-btn" data-item-index="${index}">Remove</button>
                    </div>`;
        }).join('');
        cartItemsContainer.innerHTML = itemsHtml;
        attachRemoveItemEventListeners();
    }
});

// Xóa coffee trên gỏ hàng
function attachRemoveItemEventListeners() {
    var removeButtons = document.querySelectorAll('.remove-item-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            removeItemFromCart(button.getAttribute('data-item-index'));
        });
    });
}

function removeItemFromCart(itemIndex) {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(itemIndex, 1); // Xóa mục tại chỉ mục đã chỉ định
    localStorage.setItem('cart', JSON.stringify(cart)); // Cập nhật giỏ hàng trong localStorage
    location.reload(); // Tải lại trang để cập nhật hiển thị giỏ hàng
}