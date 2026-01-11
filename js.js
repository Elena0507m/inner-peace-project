// Dinamicki prikaz statistike
var arrFacts = [
    { delay: '0.1s', header: '85', span: 'Stress Reduction', suffix: '%' },
    { delay: '0.3s', header: '3', span: 'Better Focus', suffix: 'X' },
    { delay: '0.5s', header: '10000', span: 'Happy Members', suffix: 'K+' },
    { delay: '0.7s', header: '4.9', span: 'User Rating', suffix: '★' }
];

var divFacts = document.getElementById('facts');

function createFact(objFact) {
    let fact = `
        <div class="stat-block" style="animation-delay: ${objFact.delay}">
            <div class="stat-value" data-target="${objFact.header}">0</div>
            <div class="stat-desc">${objFact.span}</div>
        </div>`;
    return fact;
}

if (divFacts) {
    divFacts.innerHTML = "";
    for (let objFact of arrFacts) {
        divFacts.innerHTML += createFact(objFact);
    }
}

function pokreniAnimaciju() {
    const stavke = document.querySelectorAll('.stat-value');
    stavke.forEach(stavka => {
        const cilj = parseFloat(stavka.getAttribute('data-target'));
        let trenutno = 0;
        const korak = cilj / 50;

        const updateCount = () => {
            trenutno += korak;
            const podatak = arrFacts.find(f => f.header == cilj);
            const znak = podatak ? podatak.suffix : "";

            if (trenutno < cilj) {
                stavka.innerText = (cilj === 4.9 ? trenutno.toFixed(1) : Math.ceil(trenutno)) + znak;
                setTimeout(updateCount, 30);
            } else {
                stavka.innerText = (cilj === 4.9 ? cilj : Math.ceil(cilj)) + znak;
            }
        };
        updateCount();
    });
}

// Dinamicki ispisan meni
let links = [
    { path: "#hero", text: "Home", isActive: true },
    { path: "#about", text: "About", isActive: false },
    { path: "#practices", text: "Practices", isActive: false },
    { path: "#resources", text: "Resources", isActive: false },
    { path: "#contact", text: "Contact", isActive: false },
    { path: "autor.html", text: "Author", isActive: false },
    { path: "sajt.zip", text: "Preuzmi Sajt", isZip: true }
];

function generisaniMeni() {
    let meniSadrzaj = "";
    for (let l of links) {
        if (l.isZip) {
            meniSadrzaj += `<li><a href="${l.path}" class="nav-link" download>${l.text}</a></li>`;
        } 
        else {
            meniSadrzaj += `<li><a href="${l.path}" class="nav-link">${l.text}</a></li>`;
        }
    }

    let navMeni = document.querySelector("#glavni-meni");
    if (navMeni) {
        navMeni.innerHTML = meniSadrzaj;
    }
}
function toggleMenu() {
    let meni = document.querySelector("#glavni-meni");
    let dugme = document.querySelector("#mobile-menu");
    meni.classList.toggle("active");
    dugme.classList.toggle("active");
}

// Smooth scroll
function mojSmoothScroll() {
    let sviLinkovi = document.querySelectorAll(".nav-link");

    for (let link of sviLinkovi) {
        link.onclick = function (e) {
            let href = this.getAttribute("href");
            if (href && /^#/.test(href)) {
                let sekcija = document.querySelector(href);
                if (sekcija) {
                    e.preventDefault();
                    window.scrollTo({
                        top: sekcija.offsetTop - 70,
                        behavior: "smooth"
                    });
                }
            }
        };
    }
}

// Scroll spy
window.onscroll = function () {
    let sekcije = document.querySelectorAll("section");
    let linkovi = document.querySelectorAll(".nav-link");
    let pozicija = window.scrollY + 100;

    for (let s of sekcije) {
        let id = s.getAttribute("id");
        if (pozicija >= s.offsetTop && pozicija < s.offsetTop + s.offsetHeight) {
            linkovi.forEach(l => {
                l.classList.remove("active");
                if (l.getAttribute("href") == "#" + id) l.classList.add("active");
            });
        }
    }


    // Dugme za vrh
    let dugme = document.querySelector("#backToTop");
    if (window.scrollY > 400) {
        dugme.style.display = "block";
    } else {
        dugme.style.display = "none";
    }
};

function skociNaVrh() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", function () {
    generisaniMeni();
    mojSmoothScroll();


    // Godina u futeru
    let datum = new Date();
    let godina = datum.getFullYear();
    document.querySelector("#godina").innerHTML = godina;
    window.dispatchEvent(new Event('scroll'));
});


// Prikaz i sakrivanje sadrzaja
window.showTab = function (imeTaba) {
    let sviTabovi = document.querySelectorAll('.tab-content');
    let sviDugmici = document.querySelectorAll('.tab-btn');

    for (let t of sviTabovi) {
        t.classList.remove('active');
    }

    for (let d of sviDugmici) {
        d.classList.remove('active');
    }

    let nadjenTab = document.getElementById(imeTaba);
    if (nadjenTab) {
        nadjenTab.classList.add('active');
    }

    for (let d of sviDugmici) {
        if (d.textContent.toLowerCase().includes(imeTaba.toLowerCase())) {
            d.classList.add('active');
        }
    }
};

// Prikazivanje kad se dodje do bloka
function postaviOtkrivanje() {
    let elementi = document.querySelectorAll('.sakriveno');

    let gledanje = new IntersectionObserver(function (entries) {
        for (let entry of entries) {
            if (entry.isIntersecting) {
                entry.target.classList.add('prikazano');
            }
        }
    }, { threshold: 0.3 });

    for (let el of elementi) {
        gledanje.observe(el);
    }
}

document.addEventListener("DOMContentLoaded", function () {

    postaviOtkrivanje();
});

// Dinamicki ispis futera
function popuniFuter() {
    let futerMeni = document.querySelector(".footer-links");
    if (futerMeni) {
        let ispis = "";
        for (let l of links) {
            ispis += `<a href="${l.path}">${l.text}</a>`;
        }
        futerMeni.innerHTML = ispis;
    }

    let god = document.querySelector("#godina");
    if (god) {
        god.innerHTML = new Date().getFullYear();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    generisaniMeni();
    popuniFuter();
});


// Ucitavanje
window.addEventListener("load", function () {
    let loader = document.querySelector("#preloader");
    loader.classList.add("loader-hidden");
    setTimeout(() => {
        loader.style.display = "none";
    }, 600);
});


document.addEventListener("DOMContentLoaded", function () {
    mojSmoothScroll();
    pokreniAnimaciju();
    postaviOtkrivanje();
    popuniFuter();
    window.dispatchEvent(new Event('scroll'));
});

// Forma
document.querySelector(".submit-btn").addEventListener("click", function (e) {
    e.preventDefault();

    const nameRegex = /^[A-ZŠĐŽČĆ][a-zšđžčć]{2,19}(\s[A-ZŠĐŽČĆ][a-zšđžčć]{2,19})?$/;
    const emailRegex = /^[a-z]{3,}(\.)?[a-z\d]{1,}(\.[a-z0-9]{1,})*\@gmail\.com$/;
    const messageRegex = /^[A-ZŠĐŽČĆ].{9,199}$/;

    const firstName = document.getElementById("name");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const terms = document.getElementById("terms");
    const radioSelected = document.querySelector('input[name="reason"]:checked');

    let errorsCount = 0;

    function checkField(regex, element, errorId) {
        if (!regex.test(element.value)) {
            document.getElementById(errorId).style.display = "block";
            errorsCount++;
        } else {
            document.getElementById(errorId).style.display = "none";
        }
    }

    checkField(nameRegex, firstName, "name-error");
    checkField(nameRegex, lastName, "lastName-error");
    checkField(emailRegex, email, "email-error");
    checkField(messageRegex, message, "message-error");

    if (!radioSelected) {
        document.getElementById("radio-error").style.display = "block";
        errorsCount++;
    } else {
        document.getElementById("radio-error").style.display = "none";
    }

    if (!terms.checked) {
        document.getElementById("terms-error").style.display = "block";
        errorsCount++;
    } else {
        document.getElementById("terms-error").style.display = "none";
    }

    if (errorsCount === 0) {
        document.getElementById("form-success").style.display = "block";
        document.getElementById("contactForm").reset();
    }
});

// Dinamicki ispis prednosti
const features = [
    "Science-backed techniques proven by neuroscience",
    "Personalized journey adapted to your needs",
    "Expert guidance from certified instructors",
    "Track your progress with real metrics",
    "Brought to you by Tooplate website"
];

function popuniPrednosti() {
    const lista = document.querySelector("#lista-prednosti");
    if (lista) {
        let ispis = "";
        for (let f of features) {
            ispis += `
                <li>
                    <span class="feature-check">✓</span>
                    <span>${f}</span>
                </li>`;
        }
        lista.innerHTML = ispis;
    }
}
document.addEventListener("DOMContentLoaded", function () {

    popuniPrednosti();
});


// Dekoracija koja se ponavlja
function generisiPozadinu() {
    const networkContainer = document.querySelector("#network-container");
    const peaceContainer = document.querySelector("#peace-container");

    if (networkContainer) {
        let networkHtml = "";
        for (let i = 0; i < 8; i++) {
            networkHtml += `<div class="network-line"></div>`;
        }
        for (let i = 0; i < 12; i++) {
            networkHtml += `<div class="network-dot"></div>`;
        }
        networkContainer.innerHTML = networkHtml;
    }

    if (peaceContainer) {
        let peaceHtml = "";
        for (let i = 0; i < 4; i++) {
            peaceHtml += `<div class="breathing-circle"></div>`;
        }
        peaceContainer.innerHTML = peaceHtml;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    generisiPozadinu();
});

