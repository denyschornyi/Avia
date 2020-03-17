const  formSearch = document.querySelector('.form-search'),
        inputCitiesFrom = document.querySelector('.input__cities-from'),
        dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
        inputCitiesTo = document.querySelector('.input__cities-to'),
        dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
        inputDateDepart = document.querySelector('.input__date-depart');


const city = ['Moskow', 'Kiev', 'Warsaw', 'Lublin', 'Gdansk' , 'New York', 'Paris', 'Milan', 'Washington D.C.' , 'Wroclaw', 'Lviv','London'];

const showCity = (input, list) =>{
    list.textContent = '';
    if(input.value !== ''){
        const filterCity = city.filter((item) =>{ 
            const fixItem = item.toLowerCase();   
            return fixItem.includes(input.value.toLowerCase());   
        });
    
        filterCity.forEach((item) => {
            const li = document.createElement('li');
            li.classList.add('dropdown__city');
            li.textContent = item;
            list.append(li);
     
        });
    }
};

inputCitiesFrom.addEventListener('input', () => {
    showCity(inputCitiesFrom, dropdownCitiesFrom);
});

// inputCitiesTo.addEventListener('input', () =>{
//     showCity(inputCitiesTo, dropdownCitiesTo);
// });

