const  formSearch = document.querySelector('.form-search'),
        inputCitiesFrom = document.querySelector('.input__cities-from'),
        dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
        inputCitiesTo = document.querySelector('.input__cities-to'),
        dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
        inputDateDepart = document.querySelector('.input__date-depart'),
        cheapestTicket = document.getElementById('cheapest-ticket'),
        otherCheapTickets = document.getElementById('other-cheap-tickets');

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
            return fixItem.startsWith(input.value.toLowerCase());   // Now search gonna start from letter what was typed and sort by alfabeth
            
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
const getDate = (date) =>{
    return new Date(date).toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }); //Function what show time in your on country local time
};

const getNameCity = (code) =>{
    objCity = city.find((item) => item.code === code);
    return objCity.name;
};

const getChanges = (num) => {
    if(num){
        return num === 1 ? 'With one transfer' : 'With two transfers';
    }else{
        return 'Without transfer';
    }
};

const getLinkAiasales = (data) => {
    let link = 'https://www.aviasales.ru/search';

    link += data.origin;

    const date = new Date(data.depart_date);

    const day = date.getDate(); 

    link += day<10 ? '0' + day : day; 

    const month = date.getMonth() + 1;

    link += month < 10 ? '0' + month : month;

    link += data.destination; 

    link += '1';
    // SVX2905KGD1

    console.log(data);
    return link;
    
};

const createCard = (data) =>{
    const ticket = document.createElement('article');
    ticket.classList.add('ticket');

    let deep = '';
    if(data){
        deep = `
        <h3 class="agent">${data.gate}</h3>
            <div class="ticket__wrapper">
                <div class="left-side">
                    <a href="${getLinkAiasales(data)}" class="button button__buy">Buy
                        for ${data.value}₽</a>
                </div>
                <div class="right-side">
                    <div class="block-left">
                        <div class="city__from">Depart from
                            <span class="city__name">${getNameCity(data.origin)}</span>
                        </div>
                        <div class="date">${getDate(data.depart_date)}</div>
                    </div>
            
                    <div class="block-right">
                        <div class="changes">${getChanges(data.number_of_changes)}</div>
                        <div class="city__to">Destination City:
                            <span class="city__name">${getNameCity(data.destination)}</span>
                        </div>
                    </div>
                </div>
        </div>
        `;
    }else{
        deep = '<h3> Unfortunately for the current date, there are no tickets </h3>';
    }

    ticket.insertAdjacentHTML('beforeend', deep);

    return ticket;
};

const renderCheapDay = (cheapTicket) => {
    cheapestTicket.style.display = 'block';
    cheapestTicket.innerHTML = '<h2>The cheapest ticket for the selected date</h2>'; // Clear double text
    const ticket = createCard(cheapTicket[0]);
    cheapestTicket.append(ticket);

};

const renderCheapYear = (cheapTickets) => {
    otherCheapTickets.style.display = 'block';
    otherCheapTickets.innerHTML = '<h2>Cheapest tickets for other dates</h2>';  // Clear useful article
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
        from: cityFrom,
        to: cityTo,
        when: inputDateDepart.value,
    }

    if(formData.from && formData.to){
        const requestData = `?depart_date=${formData.when}&origin=${formData.from.code}&destination=${formData.to.code}&one_way=true&token`;

        getData(calendar + requestData, (response) => {
            renderCheap(response, formData.when);
        });
    }else{
        alert('Enter correct city name');
    }
});


getData(citiesApi, (data) => {
     city = JSON.parse(data).filter(item => item.name);

     city.sort((a, b) => {
        if(a.name > b.name){
            return 1;
        }
        if(a.name < b.name){
            return -1;
        }
        return 0;
    });

    console.log(city);
});
