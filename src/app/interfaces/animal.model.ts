export interface Animal {
    id: number,
    name: string;
    species: string;
    age: number;
    cage: {
      id: number;
      cageNumber: string;
    };
    health: {
      id: number;
      status: string;
    };
}