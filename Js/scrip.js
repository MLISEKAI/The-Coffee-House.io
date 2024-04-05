//Start
const headerImages = [
    "./font/img/web_desktop_573e127f375143e7a4a737eebf1ddad8.jpg",
    "./font/img/web_desktop_a50f3240978147428c663fc456e98b8e.jpg",
    "./font/img/web_moi_-_desktop_f6262a8c178b4bada6b90a9a4a845ee4.jpg",
    "./font/img/web_desktop_1046f53e0b804a159ed93e6cc0548263.jpg"
];

let currentHeaderImageIndex = 0;

function updateSlider() {
    const headerImage = document.getElementById("headerImage");
    headerImage.src = headerImages[currentHeaderImageIndex];
}

function changeSlide(step) {
    currentHeaderImageIndex += step;
    if (currentHeaderImageIndex >= headerImages.length) {
        currentHeaderImageIndex = 0; // Quay lại ảnh đầu tiên
    } else if (currentHeaderImageIndex < 0) {
        currentHeaderImageIndex = headerImages.length - 1; // Chuyển đến ảnh cuối cùng
    }
    updateSlider(); // Đây là tên hàm đúng để cập nhật slider
};

window.onload = function() {
    updateSlider(); // Sửa lại để gọi đúng hàm
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

let currentStoreImageIndex = 0;

function updateStoreImage(index, step = 1) {
    const storeImageElements = document.querySelectorAll(".storeImage");

    // Cập nhật chỉ số cho từng bộ sưu tập
    currentStoreImageIndex = (currentStoreImageIndex + step + storeImages[index].length) % storeImages[index].length;

    // Cập nhật ảnh cho bộ sưu tập cụ thể
    const storeImage = storeImageElements[index];
    storeImage.src = storeImages[index][currentStoreImageIndex];
}

// Cập nhật tất cả ảnh tự động (nếu cần)
function updateAllStoresAutomatically() {
    storeImages.forEach((_, index) => {
        updateStoreImage(index);
    });
    setTimeout(updateAllStoresAutomatically, 5000); // Đặt thời gian tự động chuyển đổi
}
updateAllStoresAutomatically(); // Kích hoạt cập nhật tự động nếu cần



function changeImage(imageSrc, altText, totalPrice) {
    localStorage.setItem('selectedImage', imageSrc);
    localStorage.setItem('selectedAlt', altText);
    localStorage.setItem('totalPrice', totalPrice);
    localStorage.setItem('coffeeName', altText); // Assuming altText is the coffee name
    window.location.href = 'coffee.html';
}