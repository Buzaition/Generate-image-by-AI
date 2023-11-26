const input = document.getElementById("input");
const images = document.querySelector(".genrated_images");
const loadingIndicator = document.querySelector(".loading-indicator");

const API_KEYS = [
    "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"
];

const getRandomApiKey = () => {
    const randomIndex = Math.floor(Math.random() * API_KEYS.length);
    return API_KEYS[randomIndex];
};

const generate_img = async() => {
    images.innerHTML = "";
    loadingIndicator.style.display = "block";
    const apiKey = getRandomApiKey();

    try {
        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                prompt: input.value,
                n: 3,
                size: "256x256",
            }),
        });


        if (response.ok) {
            const received_data = await response.json();

            received_data.data.forEach((photo) => {
                const div = document.createElement("div");
                const img = document.createElement("img");
                img.src = photo.url;
                div.append(img);
                images.append(div);
            });
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error("Error fetching data:", error.message);
    } finally {
        loadingIndicator.style.display = "none";
    }
};