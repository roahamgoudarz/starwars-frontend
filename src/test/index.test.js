import HomePage from '../pages/Home';

test("test longestOpeningCrawl", async () => {
  const y = new HomePage();
  let i = `longestOpeningCrawl`;
  await y.fetchData(i).then(function (r) {
    expect(`Attack of the Clones`).toEqual(r.data[i]);
  });

});

test("test mostAppreadCharacter", async () => {
  const y = new HomePage();
  let i = `mostAppreadCharacter`;
  await y.fetchData(i).then(function (r) {
    expect(`C-3PO`).toEqual(r.data[i]);
  });

});

test("test mostAppreadSpecies", async () => {
  const y = new HomePage();
  let i = `mostAppreadSpecies`;
  await y.fetchData(i).then(function (r) {
    expect(14).toEqual(r.data[i][0].count);
  });
});


test("test largestVehiclePilots", async () => {
  const y = new HomePage();
  let i = `largestVehiclePilots`;
  await y.fetchData(i).then(function (r) {
    expect(2).toEqual(r.data[i][0].count);
  });
});