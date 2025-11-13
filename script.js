const counterEl = document.getElementById('counter');
const incrBtn = document.getElementById('incr');
const decrBtn = document.getElementById('decr');
const resetBtn = document.getElementById('reset');
const stepInput = document.getElementById('step');
const STORAGE_KEY = 'counter-app:value';

let count = 0;

function clampInt(x){
	if (!Number.isFinite(x)) return 0;
	return Math.trunc(x);
}

function load() {
	try{
		const v = localStorage.getItem(STORAGE_KEY);
		if (v !== null) count = clampInt(Number(v));
	}catch(e){}
	update();
}

function save(){
	try{ localStorage.setItem(STORAGE_KEY, String(count)); }catch(e){}
}

function update(){
	counterEl.textContent = String(count);
	document.title = `Counter: ${count}`;
}

function stepValue(){
	const v = Number(stepInput.value);
	return (Number.isFinite(v) && v>0) ? Math.trunc(v) : 1;
}

function change(delta){
	const s = stepValue();
	count = clampInt(count + delta * s);
	update();
	save();
}

incrBtn.addEventListener('click', ()=> change(1));
decrBtn.addEventListener('click', ()=> change(-1));
resetBtn.addEventListener('click', ()=> { count = 0; update(); save(); });

document.addEventListener('keydown', (e)=>{
	if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
	if (e.key === '+' || e.key === '=' ) { change(1); e.preventDefault(); }
	else if (e.key === '-') { change(-1); e.preventDefault(); }
	else if (e.key.toLowerCase() === 'r') { count = 0; update(); save(); }
});

// small accessibility: focus styles with keyboard navigation
document.body.addEventListener('keyup', (e)=>{
	if (e.key === 'Tab') document.body.classList.add('kbd');
});

load();
