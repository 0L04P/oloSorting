var MyArray = [];
	$(document).ready(function(){
						
	}); 

	function popola(arr, NomeAlg = '', tempo = '', swaps = '', inversioni){
		let s = '<table><tr>';				
		arr.forEach(function(element, index){
		if ((index)%10 == 0) s += '</tr><tr>'
			s += '<td>' + element + '</td>'
		});
		let intestazione = '';
		if (tempo != ''){
			intestazione = '<label><i>' + NomeAlg + '</i>&nbsp;&nbsp;&nbsp;' + tempo 
		}else{
			intestazione = '<label><i>Array</i></label>'
		}
		if(swaps != '') intestazione += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'  + swaps + ' scambi'
		if (arr.length > 100) s = '<br>troppe righe, non visualizzo la griglia'
		s = $('#array').html() + '<br><br>' + intestazione + '</label>' + s + '</tr></table>'
		
		$('#array').html(s)
	}

	function BubbleSort(){
		//let a = MyArray; NON SI COPIANO COSì GLI ARRAY, sennò si punta sempre all'allocazine di memoria
		let a = [...MyArray]; //si copiano così
		let swaps = 0; 
		startTime = new Date();
		for(k = 0; k<= a.length; ++k){			
			for (let i = 0; i< a.length - k; ++i){						
				if(a[i] > a[i+1]) {					
					Swap(a, i, i+1);
					swaps+=1;
				} 	
			}		
		}
		endTime = new Date();
		let timeDiff = endTime - startTime + 'ms'; //in ms
		popola(a, 'Bubble Sort', timeDiff, swaps)
		return a;
	} 
		
	function RndArray(){
		console.clear()
		$('#array').html('');
		MyArray = [];
		let num = $('#numero').val();
		 
		if (num == '') num = 3;
		for (let j=0; j< num; ++j){
				MyArray[j] = Math.floor(Math.random()*1000)
			}	
		popola(MyArray);
		BubbleSort(num);
		SelectionSort();
		InsertionSort();
	}
	
	function SelectionSort(rightArray){
		if (rightArray == undefined) rightArray = [...MyArray];
	
		let leftArray = [];
		//let rightArray = [...MyArray];
		let n = rightArray.length;
		startTime = new Date();
		for(let k = 0; k<n; ++k){
			//trovo il minimo
			let m = getMinimo(rightArray)
			//elimino il minimo da rightArray
			rightArray.splice(m.index, 1)
			//aggiungo il valore trovato in fondo a leftArray 
			leftArray.push(m.minimo)
			//ricomincio
		}
		
		endTime = new Date();
		let timeDiff = endTime - startTime + 'ms'; //in ms
		popola(leftArray, 'Selection sort', timeDiff, '')
		return leftArray;
	
	
	}
	

	
	function InsertionSort(array){
		if (array == undefined) array = [...MyArray];
		let index = '';
		let n = array.length;
		let moves = 0;
		startTime = new Date();
		for(i = 1; i<n; ++i){			
			index = i;	
			let valore = array[i]			
			console.log('=============' + i + '=======valore'+ valore)			
			//for(k = 0; k<i; ++k){
			for(k = i-1; k>=0; --k){
				console.log('k=' + k)
				if (valore < array[k]) {	
					console.log( array[i] + 'minore' + array[k] + 'quindi index = ' + k)				
					index = k					
					}
				else {		
					console.log( array[i] + 'è MAGGIORE' + array[k] + 'quindi index = ' + index + 'ed ESCO')				
					//esco
					k = -1
				}
			}	
			//if(i ==n) debugger;
			console.log('OLD' + array)
			console.log('i=' + i +', index ' +index)
			if(i!=index) {MoveAtIndex(array, i, index); moves+=1} //Swap(array, i, index)
			console.log('NEW' + array)
			console.log(' ')
		}
		
		endTime = new Date();
		let timeDiff = endTime - startTime + 'ms'; //in ms
		popola(array, 'Insertion sort', timeDiff, moves)
		return array;		
	}
	
	//Funzioni ausiliarie
	function getMinimo(array){
		let minimo = Number.MAX_VALUE;
		let index = -1;
		for(let i = 0; i< array.length; ++i){
			if(array[i] < minimo){
				minimo = array[i]
				index = i;
			}
		}
		
		let ret = {
			"minimo" : minimo,
			"index" : index
		}
		return ret;	
	}
	function Swap(array, i, j){
		let v = array[j]
		array[j] = array[i]
		array[i] = v	
	}
	function MoveAtIndex(array, index_From, index_To){		
		let s = array.splice(index_From,1)	
		array.splice(index_To, 0, s[0]);
		return array			
	}
	//funzione che in tempo lineare fa il merge di due array gia ordinati
	function MergeSortedArrays(arr_1, arr_2){
		let array = []
		while(arr_1.length > 0 && arr_2.length > 0){
			if(arr_1[0] < arr_2[0]){
				array.push(arr_1[0])
				arr_1.splice(0,1)
			}else if(arr_1[0] > arr_2[0]){
				array.push(arr_2[0])
				arr_2.splice(0,1)
			}						
		}
		// By now, either A or B is empty. It remains to empty the other input list.
		while(arr_1.length > 0){
			array.push(arr_1[0])
			arr_1.splice(0,1)
		}
		while(arr_2.length > 0){
			array.push(arr_2[0])
			arr_2.splice(0,1)
		}
		return array
	}