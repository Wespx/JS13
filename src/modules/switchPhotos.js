const switchPhotos = () => {
    const photos = document.querySelectorAll('.command__photo');
    const switchPhoto = photo => {
        const src = photo.getAttribute('src');
        const dataImg = photo.getAttribute('data-img');

        photo.setAttribute('src', dataImg);
        photo.setAttribute('data-img', src);
    };

    photos.forEach(photo => {
        photo.addEventListener('mouseenter', switchPhoto.bind(this, photo));
    });

    photos.forEach(photo => {
        photo.addEventListener('mouseleave', switchPhoto.bind(this, photo));
    });
};


export default switchPhotos;
