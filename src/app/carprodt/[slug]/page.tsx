
import { Car } from "@/types/car";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

interface DetailPageProps {
    params: { slug: string }; // Removed Promise
}

async function getproduct(slug: string): Promise<Car> {
    return client.fetch(
        groq`*[_type == "car" && slug.current == $slug][0]{
            _id,
            name,
            brand,
            type,
            fuelCapacity,
            transmission,
            seatingCapacity,
            pricePerDay,
            originalPrice,
            tags,
            image,
            slug
        }`,
        { slug } // Pass the slug here
    );
}

export default async function ProductPage({ params }: DetailPageProps) {
    const { slug } = params; // Directly destructure params
    const product = await getproduct(slug);

    if (!product) {
        return <p>Product not found!</p>;
    }

    return (
        <div className="bg-[#f6f7f9] min-h-screen p-4 sm:p-6 lg:p-20 flex flex-col gap-10 font-[family-name:var(--font-geist-sans)]">
                          <div className="sec grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {product.image && (
                        <img
                            src={urlFor(product.image).url()}
                            alt={product.name}
                            width={492}
                            height={400}
                            className="w-full h-auto rounded-t-xxl object-cover"
                        />
                    )}
                    <div>
                        <h1 className="font-bold text-9xl sm:text-xl lg:text-2xl">{product.name}</h1>
                        <p className="font-normal text-lg sm:text-xl lg:text-2xl">{product.brand}</p>
                        <h1 className="font-normal text-lg sm:text-xl lg:text-2xl">{product.type}</h1>
                        <h1 className="font-normal text-lg sm:text-xl lg:text-2xl">{product.fuelCapacity}</h1>
                        <h1 className="font-normal text-lg sm:text-xl lg:text-2xl">{product.transmission}</h1>
                        <h1 className="font-normal text-lg sm:text-xl lg:text-2xl">{product.seatingCapacity}</h1>
                        <h1 className="font-bold text-lg sm:text-xl lg:text-2xl">{product.pricePerDay}</h1>
                        <h1 className="font-bold text-lg sm:text-xl lg:text-2xl">{product.originalPrice}</h1>
                        <h1 className="font-normal text-lg sm:text-xl lg:text-2xl">{product.tags}</h1>
                        <br />
                        <Link href={"/paymentPage"}>
                <button className="bg-[#3563e9] hover:bg-[#264ac6] transition-all p-3 sm:p-4 px-6 sm:px-10 text-nowrap  text-white rounded-md w-full max-w-[180px] text-center">
                  Rent Now
                </button>
              </Link>
                    </div>
                </div>
            
        </div>
    );
}
