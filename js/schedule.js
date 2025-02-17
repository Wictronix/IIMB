let sparkInterval;
function spark(event, opt_properties) {
	let mouseX, mouseY;
	if (event) {
		mouseX = event.clientX;
		mouseY = event.clientY;
	}
	const defaultProperties = {color: `random`, mouseX: mouseX, mouseY: mouseY, hw: 10, sparks: 8, sw: 8, time: 20};
	const randInt = (min, max) => {return Math.floor(Math.random() * (max - min + 1)) + min;}
  const c = Object.assign(defaultProperties, opt_properties);
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("viewBox", "0 0 100 100");
	svg.setAttribute("style", `width: 100%; height: 100%; position: fixed; height: ${c.hw}px; width: ${c.hw}px; transform: translate(-50%,-50%); left: ${c.mouseX}; top: ${c.mouseY}; z-index: 99999`);
	let rr = randInt(55,255);
	let gg = randInt(55,255);
	let bb = randInt(55,255);
	let offset = randInt(0,360);
	for (let i = 0; i < c.sparks; i++) {
		let col = c.color === 'random' ? `rgb(${((i + 1) * rr) % 255}, ${((i + 1) * gg) % 255}, ${((i + 1) * bb) % 255})` : c.color;
		svg.insertAdjacentHTML('afterbegin', `<path d="M50 50 50 ${50 - c.sw/2}" stroke="${col}" stroke-linecap="round" stroke-width="${c.sw}" fill="none" transform="rotate(${((360 / c.sparks) * i) - (randInt(-360,360))} 50 50)"><animate attributeName="d" values="M50 50 50 ${50 - c.sw/2}; M50 ${50 - c.sw} 50 ${c.sw/2}; M50 ${c.sw/2} 50 ${c.sw/2}" dur="${c.time}ms" begin="0s" repeatCount="0" fill="freeze" /></path>`);
	}
	document.body.appendChild(svg);
	setTimeout(() => {svg?.remove();}, c.time);
}
const randInt = (min, max) => {return Math.floor(Math.random() * (max - min + 1)) + min;}
document.addEventListener("click", (event) => {spark(event, {color: 'random', sparks: randInt(6, 15)})});
document.addEventListener("mousemove", (event) => {spark(event, {color: `rgba(255,255,255,${randInt(25, 50)/100})`, sparks: randInt(3, 17), hw: randInt(15, 30), sw: randInt(10, 75)/10, time: randInt(350, 600)}); });
document.addEventListener("touchmove", (event) => {spark(event, {color: `rgba(255,255,255,${randInt(25, 50)/100})`, sparks: randInt(3, 17), hw: randInt(15, 30), sw: randInt(10, 75)/10, time: randInt(350, 600)}); });
function infinite() {
	sparkInterval = setInterval(()=> {
	spark(undefined, {color: `rgba(${randInt(0,255)},${randInt(0,255)},${randInt(0,255)},${randInt(40, 100)/100})`, sparks: randInt(3, 17), hw: randInt(10, 35), sw: randInt(10, 75)/10, time: randInt(350, 600), mouseX: randInt(0,window.innerWidth), mouseY: randInt(0,window.innerHeight)});
	spark(undefined, {color: `rgba(${randInt(0,255)},${randInt(100,255)},${randInt(0,255)},${randInt(40, 100)/100})`, sparks: randInt(3, 17), hw: randInt(10, 35), sw: randInt(10, 75)/10, time: randInt(350, 600), mouseX: randInt(0,window.innerWidth), mouseY: randInt(0,window.innerHeight)});
},10);
}
infinite();


document.addEventListener("DOMContentLoaded", function () {
	const topRightImage = document.querySelector(".top-right-image");
	const hamburgerMenu = document.querySelector("#menu-btn"); // Your actual menu toggle button
	const menu = document.querySelector("#mainmenu"); // The menu that opens

	if (hamburgerMenu) {
		hamburgerMenu.addEventListener("click", function () {
			document.body.classList.toggle("menu-open"); // Toggle class on body when menu button is clicked
		});
	}

	// Detect if the menu is actually open by checking computed styles
	const observer = new MutationObserver(() => {
		if (window.getComputedStyle(menu).display !== "none") {
			document.body.classList.add("menu-open");
		} else {
			document.body.classList.remove("menu-open");
		}
	});

	observer.observe(menu, { attributes: true, attributeFilter: ["style"] });

	// Close menu and show image when a menu link is clicked
	document.querySelectorAll("#mainmenu a").forEach(link => {
		link.addEventListener("click", function () {
			setTimeout(() => {
				document.body.classList.remove("menu-open");
			}, 200);
		});
	});
});