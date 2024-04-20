window.onload = function() {
    var imageSrc = localStorage.getItem('selectedImage');
    var altText = localStorage.getItem('selectedAlt');
    var coffeeName = localStorage.getItem('coffeeName');
    var describeCoffee = localStorage.getItem('describeCoffee')
    var totalPrice = localStorage.getItem('totalPrice');
    if (imageSrc && altText && coffeeName && totalPrice && describeCoffee) {
        var detailImage = document.getElementById('detailImage');
        var thumbnailImage = document.querySelector('.thumbnail-image');
        var coffeeTitle = document.getElementById('coffeeName');
        var coffeeListItem = document.getElementById('coffeeListItem');
        var coffeePrice = document.getElementById('totalPrice');
        var describeCoffeeElement = document.getElementById('describeCoffee');
        if (detailImage && thumbnailImage && coffeeTitle && coffeePrice && coffeeListItem  && describeCoffeeElement) {
            detailImage.src = imageSrc;
            detailImage.alt = altText;
            thumbnailImage.src = imageSrc;
            thumbnailImage.alt = altText;
            coffeeTitle.innerText = coffeeName;
            coffeePrice.innerText = totalPrice;
            coffeeListItem.innerText = coffeeName;
            describeCoffeeElement.innerText = describeCoffee;
        } else {
            console.error('Error: HTML element not found.');
        }
    } else {
        console.error('Error: No product data found in localStorage.');
    }
};

// Update the way of storing and retrieving selected sizes and toppings
var selectedSize = JSON.parse(localStorage.getItem('selectedSizes')) || [];
var selectedToppings = JSON.parse(localStorage.getItem('selectedToppings')) || [];
var currentTotalPrice = parseFloat(localStorage.getItem('currentTotalPrice')) || 0;

// Mảng lưu trữ size đã chọn
var selectedSize = null;

function selectSize(element) {
    var additionalPrice = parseFloat(element.dataset.price);
    var totalPriceElement = document.getElementById('totalPrice');
    var currentPrice = parseFloat(totalPriceElement.innerText);

    if (selectedSize) {
        currentPrice -= parseFloat(selectedSize.dataset.price);
        selectedSize.classList.remove('selected');
    }

    selectedSize = element;
    currentPrice += additionalPrice;

    element.classList.add('selected');
    totalPriceElement.innerText = currentPrice.toFixed(3) + " VND";

    // Hiển thị thông tin chính xác từ element
    var selectedSizeInfo = element.innerText.trim(); // Đảm bảo lấy thông tin chính xác từ element
    localStorage.setItem('selectedSize', JSON.stringify(selectedSizeInfo));
}

function addTopping(element) {
    var toppingPrice = parseFloat(element.dataset.price);
    var totalPriceElement = document.getElementById('totalPrice');
    var currentTotalPrice = parseFloat(totalPriceElement.innerText);

    var index = selectedToppings.indexOf(element.innerText.trim());
    if (index > -1) {
        currentTotalPrice -= toppingPrice;
        selectedToppings.splice(index, 1);
        element.classList.remove('selected');
    } else {
        currentTotalPrice += toppingPrice;
        selectedToppings.push(element.innerText.trim());
        element.classList.add('selected');
    }
    totalPriceElement.innerText = currentTotalPrice.toFixed(3) + " VND";
    localStorage.setItem('selectedToppings', JSON.stringify(selectedToppings));
    localStorage.setItem('currentTotalPrice', currentTotalPrice);
}


addToCartButton.addEventListener('click', function() {
    var sizeSelection = document.querySelector('.content-info_Size');
    var toppingSelection = document.querySelector('.content-info_toping');
    var isSizeRequired = sizeSelection && sizeSelection.style.display !== 'none';
    var isToppingRequired = toppingSelection && toppingSelection.style.display !== 'none';

    if ((isSizeRequired && !selectedSize) || (isToppingRequired && selectedToppings.length === 0)) {
        alert('Please select at least one size and one topping before adding to cart.');
        return; // Sử dụng return để thoát khỏi hàm
    } else {
        alert('The product has been added to cart!');
    }

    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var coffeeName = localStorage.getItem('coffeeName');
    // Cập nhật để sử dụng giá tiền hiện tại từ totalPriceElement nếu có
    var totalPriceElement = document.getElementById('totalPrice');
    var totalPrice = totalPriceElement ? parseFloat(totalPriceElement.innerText) : 0;
    var imgSrc = localStorage.getItem('selectedImage');
    var altText = localStorage.getItem('selectedAlt');

    var item = {
        name: coffeeName,
        price: totalPrice, // Sử dụng giá tiền đã cập nhật
        img: imgSrc,
        alt: altText,
        size: selectedSize ? selectedSize.innerText.trim() : undefined, // Chỉ thêm size nếu có
        toppings: selectedToppings// Có thể là mảng rỗng nếu không có topping nào được chọn
    };
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));

    // Reset Local Storage
    localStorage.removeItem('selectedSize');
    localStorage.removeItem('selectedToppings');
    localStorage.removeItem('currentTotalPrice');
    localStorage.removeItem('hideSizeAndTopping'); // Xóa dữ liệu sau khi ẩn
});

function hideSizeAndTopping() {
    var sizeSelection = document.querySelector('.content-info_Size');
    var toppingSelection = document.querySelector('.content-info_toping');

    if (sizeSelection && toppingSelection) {
        sizeSelection.style.display = 'none';
        toppingSelection.style.display = 'none';
    } else {
        console.log('Không tìm thấy phần tử để ẩn.');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var shouldHideSizeAndTopping = localStorage.getItem('hideSizeAndTopping');
    if (shouldHideSizeAndTopping === 'true') {
        hideSizeAndTopping(); // Sửa ở đây để tránh nhầm lẫn
    }
});

