
export interface Car {
    
    _id: string;
    name: string;
    quantity: number;
    brand: string;
    type: string;
    fuelCapacity: string;
    transmission: string;
    seatingCapacity: number;
    pricePerDay: number;
    originalPrice: number;
    slug: {
        _type: "slug";
        current: string;
    }
    tags: string[];
    image: {
        _type: string;
        asset: {
            _ref: string;
            _type: string;
        };
    };

    pricePerDay1: number;
}
