export class Pokemon {
    name: string;
    number: Number;
    color: string;
    height: Number;
    weight: Number;
    types: Array<string> = new Array<string>();
    flavorText: string;
    frontImageUrl: string;
    backImageUrl: string;
    frontShinyImageUrl: string;
    backShinyImageUrl: string;
}