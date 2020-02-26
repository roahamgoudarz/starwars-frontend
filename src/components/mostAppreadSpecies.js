 export const mostAppreadSpecies = {
      parameters: ['name', 'count'], 
      callback: function(resData){
        document.querySelector(`#mostAppreadSpecies`).innerHTML = "";
        resData.data.mostAppreadSpecies.forEach(function(d){
          document.querySelector(`#mostAppreadSpecies`).innerHTML += `<li>${d.name} (${d.count}) </li>`;
        });
      } 
    };