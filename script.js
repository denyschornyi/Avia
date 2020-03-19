const  formSearch = document.querySelector('.form-search'),
        inputCitiesFrom = document.querySelector('.input__cities-from'),
        dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
        inputCitiesTo = document.querySelector('.input__cities-to'),
        dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
        inputDateDepart = document.querySelector('.input__date-depart');

const citiesApi = 'http://api.travelpayouts.com/data/ru/cities.json',
     proxy = 'https://cors-anywhere.herokuapp.com/';

let city = [];

const getData = (url , callback) => {
    const request = new XMLHttpRequest();

    request.open('GET', url);

    request.addEventListener('readystatechange', () =>{  //answer from server
        if(request.readyState !== 4) return;

        if(request.status == 200 ){
            callback(request.response);
        }else{
            console.error(request.status);
        }
    });

    request.send();
};



const showCity = (input, list) =>{   //Show list of cities from dropdown
    list.textContent = '';
    if(input.value !== ''){
        const filterCity = city.filter((item) =>{ 
           
            const fixItem = item.name.toLowerCase();   
            return fixItem.includes(input.value.toLowerCase());   
            
        });
    
        filterCity.forEach((item) => {
            const li = document.createElement('li');
            li.classList.add('dropdown__city');
            li.textContent = item.name;
            list.append(li);
     
        });
    }
};

const hideCity = (event, input, list) =>{ //Hide the dropdown list after choosen city and put choosen city to input
    const target = event.target;
    if(target.tagName.toLowerCase() === 'li'){
        input.value = target.textContent;
        list.textContent = '';
    }
};

inputCitiesFrom.addEventListener('input', () => {
    showCity(inputCitiesFrom, dropdownCitiesFrom);
});

inputCitiesTo.addEventListener('input', () =>{
    showCity(inputCitiesTo, dropdownCitiesTo);
});

dropdownCitiesFrom.addEventListener('click', (event) => {  
    hideCity(event,inputCitiesFrom, dropdownCitiesFrom );
});

dropdownCitiesTo.addEventListener('click', (event) => {
    hideCity(event,inputCitiesTo, dropdownCitiesTo);
});


getData(proxy + citiesApi, (data) => {
     city = JSON.parse(data).filter((item) => {
        return item.name;
     });
});