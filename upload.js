function upload(){
	document.getElementById('income').innerHTML = localStorage.getItem('income') ? localStorage.getItem('income') : 0;
	document.getElementById('costs').innerHTML = localStorage.getItem('costs') ? localStorage.getItem('costs') : 0;
	document.getElementById('balance').innerHTML = localStorage.getItem('balance') ? localStorage.getItem('balance') : 0;
	const data = localStorage.getItem("blocks") ? JSON.parse(localStorage.getItem('blocks')) : [];
	
	const blockMaker = txt => {
		const element = document.getElementById('operations');
		const block = document.createElement('div');
		block.innerHTML = txt;
		element.appendChild(block);
	}
	
	data.forEach(item => {
		blockMaker(item);
	})	
}

upload();
