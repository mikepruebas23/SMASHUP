export interface Cards {
    card1?: {
        name: string,
        atk: number,
        def: number;
        lvl: number;
        life: number;
        type: string;
        price: number;
        evolve: number;
        stock: number;
    };
    card2?: {
        name: string,
        atk: number,
        def: number;
        lvl: number;
        life: number;
        type: string;
        price: number;
        evolve: number;
        stock: number;
    };

}

export const AllCards = [
    {
        atk: 1,
        def: 1,
        evolve:0,
        id:"cfaxlcon",
        life: 1,
        lvl: 1,
        name: "Falcon",
        price: 0,
        stock: 2,
        type: 'normal'
    },
    {
        atk: 1,
        def: 1,
        evolve:0,
        id:"Ike",
        life: 1,
        lvl: 1,
        name: "Ike",
        price: 0,
        stock: 1,
        type: 'normal'
    }
];