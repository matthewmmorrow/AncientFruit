class Plant {
    maturityDay: number;
    nextHarvestDay: number;
    hasFruit : boolean = false;
    constructor(public plantedDay:number, public maturityTime:number){
        this.maturityDay = plantedDay + maturityTime;
        this.nextHarvestDay = this.maturityDay;

    }

    public Grow(day:number){
        if(day >= this.nextHarvestDay){
            this.hasFruit = true;
        }
    }

    public Harvest(day:number) : Fruit[]{
        let fruits : Fruit[] = [];
        if(this.hasFruit){

            this.nextHarvestDay = day + 7;
            this.hasFruit = false;
            fruits.push(new Fruit(day));
       }
        return fruits;
    }
}

class Fruit{
    constructor(public harvestDay:number){

    }
    public MakeSeeds(seedCount:number) : Seed[] {
        let seeds:Seed[] = [];
        for(let seed = 1; seed<=seedCount; seed = seed+1){
            seeds.push(new Seed());
        }
        return seeds;
    }
}

class Seed{
    public Plant(day:number, maturityTime:number): Plant{
        return new Plant(day, maturityTime);
    }
}

let plants:Plant[] = [];
let fruits:Fruit[] = [];
let seeds:Seed[] = [new Seed()]; //Start with one seed

let seedCount = 2;
let speedGroMaturity = 25;
let maxHarvestDay = 28*3 //end of fall
let maxPlantingDay = maxHarvestDay - speedGroMaturity; //Don't plant if the plant won't produce by end of season
let day: number;
let found = false;
for(day = 1; day <=  maxHarvestDay; ++day){
    //Grow plants
    plants.forEach(plant=>{
        plant.Grow(day);
    });

    //Harvest plants
    plants.forEach(plant=>{
        fruits = fruits.concat(plant.Harvest(day));
    }); 

    if(day <= maxPlantingDay){
        //Make seeds
        fruits.forEach(fruit => {
            seeds = seeds.concat(fruit.MakeSeeds(seedCount));
        });
        fruits = [];

        //Plant seeds
        seeds.forEach(seed => {
            plants.push(seed.Plant(day, speedGroMaturity));
        });
        seeds = [];
    } 

    //Look to see if we have a full greenhouse
    if(plants.length >= 116 && !found){
        console.log("Found on day:",day);
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


