interface SquareThemeData {
  readonly name: string;
  readonly icon?: string;
  readonly price?: number;
}

export const NyThemeData = new Map<number, SquareThemeData>();
NyThemeData.set(1, { name: "<- Go" });
NyThemeData.set(2, { name: "Gravesend" , price: 100});
NyThemeData.set(4, { name: "Sheepshead bay" , price: 100});

NyThemeData.set(5, { name: "Governors Island" , price: 100});

NyThemeData.set(6, { name: "JFK" , price: 100});


NyThemeData.set(7, { name: "Canarsie" , price: 100});
NyThemeData.set(9, { name: "Brownsville" , price: 100});
NyThemeData.set(10, { name: "Bushwick" , price: 100});

NyThemeData.set(12, { name: "Forest Hills" , price: 100});
NyThemeData.set(14, { name: "Rego Park" , price: 100});
NyThemeData.set(15, { name: "Astoria" , price: 100});

NyThemeData.set(16, { name: "Newark" , price: 100});

NyThemeData.set(17, { name: "Dumbo" , price: 100});
NyThemeData.set(18, { name: "MTA", icon: "subway" , price: 100});
NyThemeData.set(19, { name: "Clinton Hill" , price: 100});
NyThemeData.set(20, { name: "Park Slope" , price: 100});

NyThemeData.set(22, { name: "Hell's Kitchen" , price: 100});
NyThemeData.set(24, { name: "Chelsea" , price: 100});
NyThemeData.set(25, { name: "West Village" , price: 100});

NyThemeData.set(26, { name: "La Guardia" , price: 100});

NyThemeData.set(27, { name: "Gramercy" , price: 100});
NyThemeData.set(29, { name: "Chinatown" , price: 100});
NyThemeData.set(30, { name: "Greenwich Village" , price: 100});

NyThemeData.set(32, { name: "Times Square", price: 100 });
NyThemeData.set(34, { name: "Midtown", price: 100 });
NyThemeData.set(35, { name: "Columbus Circle" , price: 100});

NyThemeData.set(36, { name: "Albany" , price: 100});

NyThemeData.set(37, { name: "Con Edison" , price: 100});

NyThemeData.set(38, { name: "Tribeca" , price: 100});
NyThemeData.set(40, { name: "Wall Street" , price: 100});
