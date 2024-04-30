import React from "react";
import { NyThemeData } from "../NyTheme";
import { ColorBar } from "./ColorBar";
import Player from '../../assets/player.png'

interface Props {
    id: number;
}

export const PropertyDisplay: React.FC<Props> = ({ id }) => {

    const txt: string | undefined = NyThemeData.get(id)?.name;
    const price: number | undefined = NyThemeData.get(id)?.price;

    return (
        <React.Fragment>
            <ColorBar id={id} />
            <div className="square-name relative">
                <p>{txt}</p>
                <p>{`$${price}`}</p>
            </div>
            {/* <div className="absolute flex justify-center items-center w-1/5 h-1/4">
            <img src={Player} alt="Hello" className="w-[25px] h-[25px]"/>
            </div> */}
        </React.Fragment>
    );

};