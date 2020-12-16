

export interface Car{
    name:string,
    age: number
    id?: number
}

const car1: Car={
    name: "hello",
    age: 34,
    id: 1
};

const car2 : Car= {
    name: "micheeal",
    age: 58,
}

export const cars= [car1, car2];

