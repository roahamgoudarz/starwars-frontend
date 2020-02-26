export const longestOpeningCrawl = {
    parameters: [], 
    callback: function(resData){
      document.querySelector(`#longestOpeningCrawl`).innerHTML = resData.data.longestOpeningCrawl;
    } 
  }