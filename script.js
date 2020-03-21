const  formSearch = document.querySelector('.form-search'),
        inputCitiesFrom = document.querySelector('.input__cities-from'),
        dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
        inputCitiesTo = document.querySelector('.input__cities-to'),
        dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
        inputDateDepart = document.querySelector('.input__date-depart');

let city = [];


const citiesApi = 'dataBase/cities.json',
     proxy = 'https://cors-anywhere.herokuapp.com/',
     API_KEY = 'e87d7ee4e8d2e59db0f0b444fbba80d4',
     calendar = 'http://min-prices.aviasales.ru/calendar_preload';





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

const renderCheapDay = (cheapTicket) => {
    console.log(cheapTicket);
};

const renderCheapYear = (cheapTickets) => {
    cheapTickets.sort((a,b) => {
        if(a.value > b.value){
            return 1;
        }
        if(a.value < b.value){
            return -1;
        }

        return 0;
    });
    console.log(cheapTickets);
};

const renderCheap = (data, date) =>{
    cheapTicketYear = JSON.parse(data).best_prices;

    cheapTicketDay = cheapTicketYear.filter((item) => {
        return item.depart_date === date;
    });

    renderCheapDay(cheapTicketDay);
    renderCheapYear(cheapTicketYear);
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

formSearch.addEventListener('submit', (event) => {
    event.preventDefault();

    const cityFrom = city.find((item) => inputCitiesFrom.value === item.name),
          cityTo = city.find((item) => inputCitiesTo.value === item.name);

    const formData =  {
        from: cityFrom.code,
        to: cityTo.code,
        when: inputDateDepart.value,
    }

    const requestData = `?depart_date=${formData.when}&origin=${formData.from}&destination=${formData.to}&one_way=true&token`;

    getData(calendar + requestData, (response) => {
        renderCheap(response, formData.when);
    });
});


getData(citiesApi, (data) => {
     city = JSON.parse(data).filter(item => item.name);
});

/*
    (item) => {
        return item.name;
    }
*/

