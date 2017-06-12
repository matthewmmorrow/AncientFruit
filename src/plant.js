var Plant = (function () {
    function Plant(plantedDay, maturityTime) {
        this.plantedDay = plantedDay;
        this.maturityTime = maturityTime;
        this.hasFruit = false;
        this.maturityDay = plantedDay + maturityTime;
        this.nextHarvestDay = this.maturityDay;
    }
    Plant.prototype.Grow = function (day) {
        if (day >= this.nextHarvestDay) {
            this.hasFruit = true;
        }
    };
    Plant.prototype.Harvest = function (day) {
        var fruits = [];
        if (this.hasFruit) {
            this.nextHarvestDay = day + 7;
            this.hasFruit = false;
            fruits.push(new Fruit(day));
        }
        return fruits;
    };
    return Plant;
}());
var Fruit = (function () {
    function Fruit(harvestDay) {
        this.harvestDay = harvestDay;
    }
    Fruit.prototype.MakeSeeds = function (seedCount) {
        var seeds = [];
        for (var seed = 1; seed <= seedCount; seed = seed + 1) {
            seeds.push(new Seed());
        }
        return seeds;
    };
    return Fruit;
}());
var Seed = (function () {
    function Seed() {
    }
    Seed.prototype.Plant = function (day, maturityTime) {
        return new Plant(day, maturityTime);
    };
    return Seed;
}());
var plants = [];
var fruits = [];
var seeds = [new Seed()]; //Start with one seed
var seedCount = 2;
var speedGroMaturity = 25;
var maxHarvestDay = 28 * 3; //end of fall
var maxPlantingDay = maxHarvestDay - speedGroMaturity; //Don't plant if the plant won't produce by end of season
var day;
var found = false;
for (day = 1; day <= maxHarvestDay; ++day) {
    //Grow plants
    plants.forEach(function (plant) {
        plant.Grow(day);
    });
    //Harvest plants
    plants.forEach(function (plant) {
        fruits = fruits.concat(plant.Harvest(day));
    });
    if (day <= maxPlantingDay) {
        //Make seeds
        fruits.forEach(function (fruit) {
            seeds = seeds.concat(fruit.MakeSeeds(seedCount));
        });
        fruits = [];
        //Plant seeds
        seeds.forEach(function (seed) {
            plants.push(seed.Plant(day, speedGroMaturity));
        });
        seeds = [];
    }
    //Look to see if we have a full greenhouse
    if (plants.length >= 116 && !found) {
        console.log("Found on day:", day);
        console.log("Plants:", plants.length);
        console.log("Fruits:", fruits.length);
        console.log("Seeds:", seeds.length);
        found = true;
    }
}
console.log("Day:", maxHarvestDay);
console.log("Plants:", plants.length);
console.log("Fruits:", fruits.length);
console.log("Seeds:", seeds.length);
