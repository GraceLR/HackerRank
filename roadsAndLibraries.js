
// map first
// try all the combinations for each group find the min cost by recursion
//// or take derivativies
// apply on all the groups

function roadsAndLibraries(n, c_lib, c_road, cities) {

    if(c_lib <= c_road) {
        return n * c_lib;
    }

    let map = {};
    const setCity = (city1, city2) => {
        if (map[city1] === undefined) {
            map[city1] = {[city2]: true};
        } else {
            map[city1][city2] = true;
        }
    }

    cities.forEach(([city1, city2]) => {
        setCity(city1, city2);
        setCity(city2, city1);
    });

    const recurse = (curCity, seenCities) => {
        // base: hit a step that had occur
        if (seenCities[curCity]) {
            return;
        }
        // recursion
        const xyz = Object.keys(map[curCity]);
        seenCities[curCity] = true;
        xyz.forEach(ele => {
            ele = Number(ele);
            recurse(ele, seenCities);
        });

        return;
    }

    let remainingCities = Object.keys(map);
    let cost = (n - remainingCities.length) * c_lib;
    while (remainingCities.length !== 0) {
        const subGraph = {};
        recurse(remainingCities[0], subGraph);
        remainingCities = remainingCities.filter(ele => subGraph[ele] === undefined);
        cost += (Object.keys(subGraph).length - 1) * c_road + c_lib;
    }

    return cost;

}