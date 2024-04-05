var currentSelectedSize = null;

function selectSize(element) {
    // Kiểm tra xem đã chọn kích thước trước đó chưa
    if (currentSelectedSize !== null) {
        // Nếu đã chọn trước đó, trừ giá bổ sung của nó khỏi tổng giá hiện tại
        var previousAdditionalPrice = parseFloat(currentSelectedSize.dataset.price);
        var totalPriceElement = document.querySelector('.content-info_title span');
        var currentPrice = parseFloat(totalPriceElement.innerText);
        var newPrice = currentPrice - previousAdditionalPrice;
        totalPriceElement.innerText = newPrice.toFixed(2);
        // Loại bỏ lớp "selected" khỏi kích thước trước đó
        currentSelectedSize.classList.remove('selected');
    }

    // Lấy giá bổ sung của kích thước mới
    var additionalPrice = parseFloat(element.dataset.price);

    // Thêm giá bổ sung của kích thước mới vào tổng giá
    var totalPriceElement = document.querySelector('.content-info_title span');
    var currentPrice = parseFloat(totalPriceElement.innerText);
    var newPrice = currentPrice + additionalPrice;
    totalPriceElement.innerText = newPrice.toFixed(3) + " " + "đ";

    // Lưu trữ kích thước được chọn hiện tại
    currentSelectedSize = element;

    // Thêm lớp "selected" cho phần tử được click
    element.classList.add('selected');
}

var currentSelectedTopping = null;

function addTopping(element) {
    var toppingPrice = parseFloat(element.dataset.price);

    var previousToppingPrice = parseFloat(currentSelectedTopping.dataset.price);
    var totalPriceElement = document.querySelector('.content-info_title span');
    var currentTotalPrice = parseFloat(totalPriceElement.innerText);
    var newTotalPrice = currentTotalPrice - previousToppingPrice;
    totalPriceElement.innerText = newTotalPrice.toFixed(2);

    // Xóa lớp 'đã chọn' khỏi phần trên cùng đã chọn trước đó
    currentSelectedTopping.classList.remove('selected');

    // Cộng giá của lớp phủ mới vào tổng giá
    var totalPriceElement = document.querySelector('.content-info_title span');
    var currentTotalPrice = parseFloat(totalPriceElement.innerText);
    var newTotalPrice = currentTotalPrice + toppingPrice;
    totalPriceElement.innerText = newTotalPrice.toFixed(2);

    // Lưu topping hiện đang được chọn
    currentSelectedTopping = element;

   // Thêm lớp 'đã chọn' vào phần tử được nhấp
    element.classList.add('selected');
}


window.onload = function() {
    var imageSrc = localStorage.getItem('selectedImage');
    var altText = localStorage.getItem('selectedAlt');
    var coffeeName = localStorage.getItem('coffeeName');
    var totalPrice = localStorage.getItem('totalPrice');
    if (imageSrc && altText && coffeeName && totalPrice) {
        var detailImage = document.getElementById('detailImage');
        var thumbnailImage = document.querySelector('.thumbnail-image');
        var coffeeTitle = document.getElementById('coffeeName'); // For the <h3> element
        var coffeeListItem = document.getElementById('coffeeListItem'); // Now correctly targeting the <li> element
        var coffeePrice = document.getElementById('totalPrice');
        if (detailImage && thumbnailImage && coffeeTitle && coffeePrice && coffeeListItem) {
            detailImage.src = imageSrc;
            detailImage.alt = altText;
            thumbnailImage.src = imageSrc;
            thumbnailImage.alt = altText;
            coffeeTitle.innerText = coffeeName; // Sets text in the <h3>
            coffeePrice.innerText = totalPrice;
            coffeeListItem.innerText = coffeeName; // Sets text in the <li>
        } else {
            console.error('Error: HTML element not found.');
        }
    } else {
        console.error('Error: No product data found in localStorage.');
    }
};


document.addEventListener('DOMContentLoaded', function() {
    var addToCartButton = document.getElementById('addToCartButton');
    addToCartButton.addEventListener('click', function() {
        alert('Sản phẩm đã được thêm vào giỏ hàng!');
        var cart = JSON.parse(localStorage.getItem('cart')) || [];
        var coffeeName = localStorage.getItem('coffeeName');
        var totalPrice = localStorage.getItem('totalPrice');
        var imgSrc = localStorage.getItem('selectedImage');
        var altText = localStorage.getItem('selectedAlt');

        var item = {
            name: coffeeName,
            price: totalPrice,
            img: imgSrc,
            alt: altText
        };
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
    });
});