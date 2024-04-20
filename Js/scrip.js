//Start
const headerImages = [
    "./font/img/web_desktop_573e127f375143e7a4a737eebf1ddad8.jpg",
    "./font/img/web_desktop_a50f3240978147428c663fc456e98b8e.jpg",
    "./font/img/web_moi_-_desktop_f6262a8c178b4bada6b90a9a4a845ee4.jpg",
    "./font/img/web_desktop_1046f53e0b804a159ed93e6cc0548263.jpg"
];

let currentHeaderImageIndex = 0;

// Hàm này cập nhật ảnh hiển thị trên slider
function updateSlider() {
    const headerImage = document.getElementById("headerImage");
    headerImage.src = headerImages[currentHeaderImageIndex];
}

// Hàm này thay đổi ảnh hiển thị trên slider dựa vào bước nhảy được truyền vào
function changeSlides(step) {
    currentHeaderImageIndex += step;
    if (currentHeaderImageIndex >= headerImages.length) {
        currentHeaderImageIndex = 0; // Nếu vượt quá số lượng ảnh, quay lại ảnh đầu tiên
    } else if (currentHeaderImageIndex < 0) {
        currentHeaderImageIndex = headerImages.length - 1; // Nếu nhỏ hơn 0, chuyển đến ảnh cuối cùng
    }
    updateSlider(); // Gọi hàm cập nhật slider
};

// Hàm này tự động chuyển đổi ảnh trên slider mỗi 5 giây
function autoChangeSlides() {
    setInterval(function() {
        changeSlides(1); // Chuyển đến ảnh tiếp theo
    }, 5000); // 5 giây
}

autoChangeSlides(); // Bắt đầu tự động chuyển đổi ảnh

// Hàm này được gọi khi trang web được tải, để hiển thị ảnh đầu tiên trên slider
window.onload = function() {
    updateSlider();
};
//End


//Start
const storeImages = [
    [
        "./font/img/sig-01_2c5b08d6b9294c82ac64901e12ae6106_master.png",
        "./font/img/sig-02_895710c1013446fa940ac2407700ba20_master.png",
        "./font/img/sig-03_c74a0629d8b44ac580a3e9cf51fadb0a_master.png",
        "./font/img/sig-04_45f046ffbfa94c069b4d9697e8444baa_master.png",
        "./font/img/sig-05_d573c2d41cfa45769e61890e2cc17be7_master.png",
    ],
    [
        "./font/img/grandview1_281ebbd42e1e40368c783002bfda0054_master (5).png",
        "./font/img/grandview1_281ebbd42e1e40368c783002bfda0054_master (6).png",
        "./font/img/grandview1_281ebbd42e1e40368c783002bfda0054_master (7).png",
        "./font/img/grandview1_281ebbd42e1e40368c783002bfda0054_master (8).png",
        "./font/img/grandview1_281ebbd42e1e40368c783002bfda0054_master (9).png",
    ],
    [
        "./font/img/_kh_9431__1__e19a7a49963245b39b280271da3cd9fb_master.png",
        "./font/img/_kh_9302_5a346ad2dafa4f02afd24481f5ca9a1e_master.png",
        "./font/img/_kh_9290_df84171506554f16b8e55bff9a6c0dd1_master.png",
        "./font/img/_kh_9308_71dd5f99cfe4431a82bbf9dae99f71ea_master.png",
        "./font/img/_kh_9331_4f5565bc16d8427b858f6e37145bd354_master.png",
    ],
];

// Maintain a separate index for each store
let currentStoreImageIndices = [0, 0, 0];

// Hàm này cập nhật ảnh cho mỗi bộ sưu tập cửa hàng dựa vào chỉ số và bước nhảy
function updateStoreImage(storeIndex, step = 1) {
    const storeImageElements = document.querySelectorAll(".storeImage");

    // Update the index for the specific store, ensuring it doesn't exceed the number of images
    currentStoreImageIndices[storeIndex] = (currentStoreImageIndices[storeIndex] + step + storeImages[storeIndex].length) % storeImages[storeIndex].length;

    // Update the image for the specific store
    const storeImage = storeImageElements[storeIndex];
    storeImage.src = storeImages[storeIndex][currentStoreImageIndices[storeIndex]];
}


// Hàm này tự động cập nhật tất cả ảnh cho các bộ sưu tập cửa hàng mỗi 5 giây
function updateAllStoresAutomatically() {
    storeImages.forEach((_, index) => {
        updateStoreImage(index);
    });
    setTimeout(updateAllStoresAutomatically, 5000); // Đặt thời gian tự động chuyển đổi
}
updateAllStoresAutomatically(); // Kích hoạt cập nhật tự động


function changeSlide() {
    var store1 = document.getElementById("store1");
    var store2 = document.getElementById("store2");
    var store3 = document.getElementById("store3");

    // Kiểm tra xem store nào đang được hiển thị và chuyển sang store tiếp theo
    if (store1.style.display === "flex") {
        store1.style.display = "none";
        store2.style.display = "flex";
        store3.style.display = "none";
    } else if (store2.style.display === "flex") {
        store1.style.display = "none";
        store2.style.display = "none";
        store3.style.display = "flex";
    } else {
        store1.style.display = "flex";
        store2.style.display = "none";
        store3.style.display = "none";
    }
}

// Hàm này lưu trữ thông tin ảnh được chọn vào localStorage và chuyển hướng người dùng
function changeImage(imageSrc, altText, totalPrice, describeCoffee) {
    localStorage.setItem('selectedImage', imageSrc);
    localStorage.setItem('selectedAlt', altText);
    localStorage.setItem('totalPrice', totalPrice);
    localStorage.setItem('coffeeName', altText); // Giả định altText là tên cà phê
    localStorage.setItem('describeCoffee', describeCoffee);
    window.location.href = 'coffee.html';
}


