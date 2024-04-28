export class PropType{
    public rotate: number;
    public color: string;
    public name: string;
    public icon: string;
    public rent: number;
    constructor(rotate: number, color: string, name: string, icon: string, rent: number){
        this.rotate = rotate;
        this.color = color;
        this.name = name;
        this.icon = icon;
        this.rent = rent;
    }
}