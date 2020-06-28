function clr(){
	localStorage.clear();
	upload();
	location.reload();
}

function is_more_five(blocksArray){
	let i = 0;
	while (blocksArray.length >= 5)
	{
		blocksArray.splice(blocksArray[i], 1);
	}
}

function operation(text, num, operationclass)
{	

	let blocksArray = localStorage.getItem("blocks") ? JSON.parse(localStorage.getItem('blocks')) : [];
	is_more_five(blocksArray);
	const container = document.getElementById('operations');
	const block = document.createElement('div');
	block.innerHTML = '<div class= "operation '+ operationclass +'"> \
			<h3>'+ text +'</h3>\
			<span><strong id="money">'+ num +'</strong> BYN</span></div>';
	
	blocksArray.push(block.outerHTML);
	
	container.appendChild(block);
	localStorage.setItem("blocks", JSON.stringify(blocksArray));
}

function class_name(checkbox)
{
 	if (checkbox.checked) {
 		return "operation-positive";
 	}
 	else{
 		return "operation-negative";
 	}
}

function edit_income(income, money){
	
	return income += Number(money[money.length - 1].textContent);
}

function edit_costs(costs, money){
	return costs += Number(money[money.length - 1].textContent);
}

function main()
{	
	//get data from input
	let checkbox = document.querySelector('#checkbox');
	let operation_class = class_name(checkbox);
	//add operations
	let operation_name = document.getElementById("operationnamed").value;
	let operation_number = document.getElementById("operationnumber").value;
	
	//foolproof
	const numLimit = 1000000, nameLimit = 30;
	if (operation_number > numLimit || operation_name.length > nameLimit){
		alert("Слишком много данных!");
		return;
	}
	else if(operation_class == 'operation-positive')
	{
		operation_number = Math.abs(operation_number);
	}
	else if(operation_class == 'operation-negative')
	{
		operation_number = -(Math.abs(operation_number));
	}
	
	//

	let is_add = false;
	if (operation_name && operation_number){
		operation(operation_name, operation_number, operation_class);
		is_add = true;
	}
	else{
		alert("Введите все данные!");
	}
	
	//balance
	let income = document.getElementById('income');
	income = Number(income.innerHTML);

	let costs = document.getElementById('costs');
	costs = Number(costs.innerHTML);
	if (is_add){
		
		let money = document.querySelectorAll('#money');
		if (operation_class == "operation-positive"){
			income = edit_income(income, money);
		}
		else{
			costs = edit_costs(costs, money);
		}
	}

	document.getElementById('income').innerHTML = Math.round((income) * 100) / 100;
	document.getElementById('costs').innerHTML = Math.round((costs) * 100) / 100;
	let balance = Math.round((income + costs) * 100) / 100;
	document.getElementById('balance').innerHTML = balance;
	localStorage.setItem('income', income);
	localStorage.setItem('costs', costs);
	localStorage.setItem('balance', balance);
}