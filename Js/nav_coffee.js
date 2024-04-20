function changeImage(imageSrc, altText, totalPrice, describeCoffee) {
    localStorage.setItem('selectedImage', imageSrc);
    localStorage.setItem('selectedAlt', altText);
    localStorage.setItem('totalPrice', totalPrice);
    localStorage.setItem('coffeeName', altText); // Giả định altText là tên cà phê
    localStorage.setItem('describeCoffee', describeCoffee);

    // Lưu trạng thái ẩn size và topping
    localStorage.setItem('hideSizeAndTopping', 'true');
    window.location.href = 'coffee.html';
}
