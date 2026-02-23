// =============================
// REVEAL ANIMATION
// =============================
const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("active");
        }
    });
},{threshold:0.15});

document.querySelectorAll(".reveal")
.forEach(el=>observer.observe(el));


// =============================
// DINAMIC LOCALES SYSTEM
// =============================

const dynamic = document.getElementById("dynamic-section");
let current = null;

document.querySelectorAll(".btn-circle")
.forEach(btn=>{
    btn.addEventListener("click", async () => {

        const cat = btn.dataset.cat;

        if(current === cat){
            closeSection();
            return;
        }

        document.querySelectorAll(".btn-circle")
        .forEach(b=>b.classList.remove("active"));

        btn.classList.add("active");
        current = cat;

        await loadCategory(cat);
    });
});


function closeSection(){
    dynamic.innerHTML = "";
    dynamic.classList.remove("dynamic-active");
    document.querySelectorAll(".btn-circle")
    .forEach(b=>b.classList.remove("active"));
    current = null;
}


// =============================
// LOAD CATEGORY FROM JSON
// =============================

async function loadCategory(category){

    dynamic.innerHTML = "";
    dynamic.classList.add("dynamic-active");

    try {

        const response = await fetch(`locali/${category}/index.json`);
        const locales = await response.json();

        locales.forEach(locale => {

            const tile = document.createElement("div");
            tile.className = "locale-tile";

            tile.innerHTML = `
                <div class="locale-text">
                    <h2 style="font-family:Oswald;font-size:22px;">
                        ${getIcon(category)} ${locale.name}
                        <span style="font-size:14px;">(${locale.city})</span>
                    </h2>

                    <p style="margin:15px 0;">${locale.description}</p>
                    <p style="font-size:13px;">📍 ${locale.address}</p>

                    <div class="locale-map">
                        <iframe 
                        src="https://www.google.com/maps?q=${encodeURIComponent(locale.address)}&output=embed">
                        </iframe>
                    </div>
                </div>

				<div class="locale-carousel">
					<div class="carousel">
						<button class="carousel-btn prev">‹</button>
						<img src="locali/${category}/${locale.folder}/1.jpg">
						<button class="carousel-btn next">›</button>
					</div>
				</div>
            `;

            dynamic.appendChild(tile);

			enableSwipe(
				tile.querySelector("img"),
				category,
				locale.folder,
				locale.images,
				tile.querySelector(".carousel")
			);

        });

    } catch(error) {
        dynamic.innerHTML = "<p>Nessun locale trovato.</p>";
        console.error(error);
    }
}


// =============================
// SWIPE DINAMICO
// =============================

function enableSwipe(img, category, folder, totalImages, container){

    let index = 1;

    const prevBtn = container.querySelector(".prev");
    const nextBtn = container.querySelector(".next");

    function updateImage(){
        img.src = `locali/${category}/${folder}/${index}.jpg`;
    }

    prevBtn.addEventListener("click", () => {
        index--;
        if(index < 1) index = totalImages;
        updateImage();
    });

    nextBtn.addEventListener("click", () => {
        index++;
        if(index > totalImages) index = 1;
        updateImage();
    });
}


// =============================
// ICONS PER CATEGORIA
// =============================

function getIcon(category){
    switch(category){
        case "gelaterie": return "🍦";
        case "ristoranti": return "🍽️";
        case "shops": return "🛍️";
        case "pasticcerie": return "🧁";
        default: return "";
    }
}


// =============================
// NAVIGATION
// =============================

function scrollToTop(){
    window.scrollTo({top:0,behavior:"smooth"});
}

function scrollToMap(){
    document.querySelector(".map-section")
    .scrollIntoView({behavior:"smooth"});
}

function scrollToBot(){
    document.querySelector(".telegram-section")
    .scrollIntoView({behavior:"smooth"});
}