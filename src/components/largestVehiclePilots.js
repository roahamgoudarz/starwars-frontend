export const largestVehiclePilots = {
    parameters: ['planet', 'count', 'pilots'],
    callback: function (resData) {
        document.querySelector(`#largestVehiclePilots`).innerHTML = "";
        resData.data.largestVehiclePilots.forEach(function (d) {
            document.querySelector(`#largestVehiclePilots`).innerHTML += `<li>Planet: ${d.planet} - Pilots: (${d.count}) ${d.pilots}</li>`;
        });
    }
};