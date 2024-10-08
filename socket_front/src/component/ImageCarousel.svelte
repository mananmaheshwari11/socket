<script>
    let currentIndex = 0;
    let images = [
        { src: 'cover.png', title:  'Get a link you can share and connect people around the globe' },
        { src: 'desk.webp', title: 'See everyone together at the same time and get a real feel'},
        { src: 'safe.jpg', title: 'No one outside the organization cannot able to enter unless invited' },
    ];

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
    }
</script>

<style>
    .carousel {
        margin-top: 40px;
        position: relative;
        width: 100%;
        max-width: 560px;
        margin: auto;
        overflow: hidden;
        text-align: center;
    }

    .carousel img {
        width: 60%;
        height: auto;
        border-radius: 50%;
        margin-top: 20px;
    }
    .carousel-controls {
        position: absolute;
        top: 50%;
        width: 100%;
        display: flex;
        justify-content: space-between;
        transform: translateY(-50%);
    }

    .carousel-controls button {
        color: black;
        background-color: white;
        border: 1px solid white;
        border-radius: 50%;
        padding: 10px 15px;
        cursor: pointer;
        font-size: 1.5em;
    }

    .carousel-controls button:hover {
        opacity: 0.8;
    }

    .carousel-controls button:focus {
        outline: none;
    }

    .carousel-title {
        font-size: 22px;
        font-weight: 500;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        word-wrap: break-word; 
        overflow-wrap: break-word;
        white-space: normal;
        text-align: center;
        max-width: 80%;
        margin: 0 auto;
        margin-top: 50px;
        cursor: default;
    }
</style>

<div class="carousel">
    <img src={images[currentIndex].src} alt={images[currentIndex].title} />
    <div class="carousel-controls">
        <button on:click={prevImage}>❮</button>
        <button on:click={nextImage}>❯</button>
    </div>
</div>
<div class="carousel-title">{images[currentIndex].title}</div>
