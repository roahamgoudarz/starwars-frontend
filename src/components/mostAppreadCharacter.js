 export const mostAppreadCharacter = {
    parameters: [], 
    callback: function(resData){
      document.querySelector(`#mostAppreadCharacter`).innerHTML = resData.data.mostAppreadCharacter;
    } 
  };