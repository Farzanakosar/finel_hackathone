
export interface Car {
    
    _id: string;
    name: string;
    brand: string;
    type: string;
    fuelCapacity: string;
    transmission: string;
    seatingCapacity: number;
    pricePerDay: number;
    originalPrice: number;
    tags: string[];
    image: {
        _type: string;
        asset: {
            _ref: string;
            _type: string;
        };
    };
}
