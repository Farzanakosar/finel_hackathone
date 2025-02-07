'use client';  // Add this at the top to make the component a client-side component

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Car } from "@/types/car";
import { client } from "@/sanity/lib/client";
import { carsQuery } from "@/sanity/lib/queries";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { urlFor } from "@/sanity/lib/image";
import { addtocart } from "./action/actions";
import Swal from "sweetalert2";

// Client-side component
export default function Home() {
  const [carData, setCarData] = useState<Car[]>([]);

  useEffect(() => {
    async function fetchCarData() {
      const fetchedCarData: Car[] = await client.fetch(carsQuery);
      setCarData(fetchedCarData);
    }

    fetchCarData();
  }, []);

  const handleAddtoCart = (e: React.MouseEvent, car: Car) => {
    e.preventDefault()
        
    Swal.fire({
      position: 'top-right',
      icon: "success",
      title: `${car.name} added to cart`,
      showConfirmButton: false,
      timer: 1000

    })

    addtocart(car);
    
    
  }


  
  useEffect(() => {
    const sections = document.querySelectorAll(
      "#block1, #block2, #block3, #block4, #block5"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Only add the animate class when the element is in view
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.1 }
    ); // 10% visibility

    sections.forEach((section) => observer.observe(section));

    // Cleanup the observer when the component unmounts
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="bg-[#f6f7f9] min-h-screen p-4 sm:p-6 lg:p-20 flex flex-col gap-10 font-[family-name:var(--font-geist-sans)]">
      {/* Section 1 - Ads with buttons */}

      <section
        id="block1"
        className="w-full flex flex-wrap sm:flex-nowrap gap-4 sm:gap-8 justify-center items-center"
      >
        <div className="relative flex flex-col items-center">
          <Image
            src={"/Ads 1.png"}
            alt="Ad 1"
            width={600}
            height={360}
            className="max-w-full"
          />
          <button className="absolute bottom-20 left-1 m-3 bg-blue-600 hover:bg-blue-500 text-white font-normal py-4 px-6 rounded hidden lg:block">
            Rental Car
          </button>
        </div>

        <div className="relative flex flex-col items-center">
          <Image
            src={"/Ads 2.png"}
            alt="Ad 2"
            width={600}
            height={360}
            className="max-w-full"
          />
          <button className="absolute bottom-20 left-1 m-3 bg-blue-400 hover:bg-blue-600 text-white font-normal py-4 px-6 rounded hidden lg:block">
            Rental Car
          </button>
        </div>
      </section>

      <section
        id="block2"
        className="w-full flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-between gap-4 sm:gap-8"
      >
        <Image
          src={"/Pick - Up.png"}
          alt=""
          width={500}
          height={132}
          className="max-w-full"
        />

        {/* switch */}
        <div className="w-[60px] h-[60px] bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center justify-center">
          <Image src="/Swap.png" alt="Switch" width={24} height={24} className="w-[24px] h-[24px]" />
        </div>

        <Image
          src={"/Drop - Off.png"}
          alt=""
          width={500}
          height={132}
          className="max-w-full"
        />
      </section>

      {/* Popular car  */}
      <section id="block3" className="popular w-full flex flex-col gap-4">
        <div className="first w-full flex items-center justify-between">
          <h1 className="text-gray-500 text-lg sm:text-xl">Popular Car</h1>
          <Link href={"/categoryPage"}>
            <h1 className="text-[#3563e9] font-bold hover:underline decoration-[#3563e9]">
              View All
            </h1>
          </Link>
        </div>
        <div className="sec grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {carData.map((car) => (
                        <div key={car._id}>
                             <CardTitle className="w-full flex items-center justify-between">{car.name}
                             </CardTitle>

                             <Link href= {`/carprodt/${car.slug.current}`}>
                             
                         
                             <CardDescription>{car.type}</CardDescription>
                             {car.image &&(
                            <Image
                            src={urlFor(car.image).url()}
                            alt="carimage"
                            width={240} 
                            height={24}
                            />
                          )}

                         <div className="flex flex-row gap-9 justify-start items-start"><p className="text-gray-500"> {car.fuelCapacity} </p>
                         <p>{car.transmission}</p> 
                          <p>{car.seatingCapacity}</p>
                          
                          </div>
                          <p className=" pt-3 text-2xl font-bold leading-none tracking-tight">{car.pricePerDay}</p>  
                          
                          <p className=" flex items-center justify-center pt-2 text-black font-samibold">{car.tags}</p>
                          
                          <br/>
                          
                <button className="flex justify-center items-center  bg-[#3563e9] p-2 text-white rounded-md" onClick={(e) => handleAddtoCart(e, car)}>
                  Rent Now
                </button>
              
              </Link>

                        </div>
              )
                
              )}
          
        </div>
        
      </section>

      Recommendation car 
      <section id="block4" className="popular w-full flex flex-col gap-4">
        <h1 className="text-gray-500 text-lg sm:text-xl">Recommendation Car</h1>
        <div className="sec grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="w-full max-w-[304px] mx-auto h-auto flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="w-full flex items-center justify-between">
                All New Rush{" "}
                <Image src={"/heart.png"} alt="" width={20} height={20} />
              </CardTitle>
              <CardDescription>SUV</CardDescription>
            </CardHeader>
            <CardContent className="w-full flex flex-col items-center justify-center gap-4">
              <Image src={"/car5.png"} alt="" width={220} height={68} />
              <Image src={"/spec5.png"} alt="" width={256} height={24} />
            </CardContent>
            <CardFooter className="w-full flex items-center justify-between">
              <p className="text-2xl font-semibold leading-none tracking-tight">
                $72.00/
                <span className="text-sm font-medium text-gray-500">day</span>
                <br />
                <span className="text-sm font-medium text-gray-500 line-through">
                  $80.00
                </span>
              </p>
              <Link href={"/detailPage"}>
                <button className="bg-[#3563e9] p-2 text-white rounded-md">
                  Rent Now
                </button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="w-full max-w-[304px] mx-auto h-auto flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="w-full flex items-center justify-between">
                CR - V{" "}
                <Image src={"/heart 2.png"} alt="" width={20} height={20} />
              </CardTitle>
              <CardDescription>SUV</CardDescription>
            </CardHeader>
            <CardContent className="w-full flex flex-col items-center justify-center gap-4">
              <Image src={"/car6.png"} alt="" width={220} height={68} />
              <Image src={"/spec6.png"} alt="" width={256} height={24} />
            </CardContent>
            <CardFooter className="w-full flex items-center justify-between">
              <p className="text-2xl font-semibold leading-none tracking-tight">
                $80.00/
                <span className="text-sm font-medium text-gray-500">day</span>
              </p>
              <Link href={"/detailPage"}>
                <button className="bg-[#3563e9] p-2 text-white rounded-md">
                  Rent Now
                </button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="w-full max-w-[304px] mx-auto h-auto flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="w-full flex items-center justify-between">
                All New Terios{" "}
                <Image src={"/heart.png"} alt="" width={20} height={20} />
              </CardTitle>
              <CardDescription>SUV</CardDescription>
            </CardHeader>
            <CardContent className="w-full flex flex-col items-center justify-center gap-4">
              <Image src={"/car7.png"} alt="" width={220} height={68} />
              <Image src={"/spec7.png"} alt="" width={256} height={24} />
            </CardContent>
            <CardFooter className="w-full flex items-center justify-between">
              <p className="text-2xl font-semibold leading-none tracking-tight">
                $74.00/
                <span className="text-sm font-medium text-gray-500">day</span>
              </p>
              <Link href={"/detailPage"}>
                <button className="bg-[#3563e9] p-2 text-white rounded-md">
                  Rent Now
                </button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="w-full max-w-[304px] mx-auto h-auto flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="w-full flex items-center justify-between">
                CR - V{" "}
                <Image src={"/heart 2.png"} alt="" width={20} height={20} />
              </CardTitle>
              <CardDescription>SUV</CardDescription>
            </CardHeader>
            <CardContent className="w-full flex flex-col items-center justify-center gap-4">
              <Image src={"/car8.png"} alt="" width={220} height={68} />
              <Image src={"/spec8.png"} alt="" width={256} height={24} />
            </CardContent>
            <CardFooter className="w-full flex items-center justify-between">
              <p className="text-2xl font-semibold leading-none tracking-tight">
                $80.00/
                <span className="text-sm font-medium text-gray-500">day</span>
              </p>
              <Link href={"/detailPage"}>
                <button className="bg-[#3563e9] p-2 text-white rounded-md">
                  Rent Now
                </button>
              </Link>
            </CardFooter>
          </Card>
        </div>
        <div className="sec grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="w-full max-w-[304px] mx-auto h-auto flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="w-full flex items-center justify-between">
                MG ZX Exclusive{" "}
                <Image src={"/heart.png"} alt="" width={20} height={20} />
              </CardTitle>
              <CardDescription>Hatchback</CardDescription>
            </CardHeader>
            <CardContent className="w-full flex flex-col items-center justify-center gap-4">
              <Image src={"/car9.png"} alt="" width={220} height={68} />
              <Image src={"/spec9.png"} alt="" width={256} height={24} />
            </CardContent>
            <CardFooter className="w-full flex items-center justify-between">
              <p className="text-2xl font-semibold leading-none tracking-tight">
                $76.00/
                <span className="text-sm font-medium text-gray-500">day</span>
                <br />
                <span className="text-sm font-medium text-gray-500 line-through">
                  $80.00
                </span>
              </p>
              <Link href={"/detailPage"}>
                <button className="bg-[#3563e9] p-2 text-white rounded-md">
                  Rent Now
                </button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="w-full max-w-[304px] mx-auto h-auto flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="w-full flex items-center justify-between">
                NEW MG ZS{" "}
                <Image src={"/heart 2.png"} alt="" width={20} height={20} />
              </CardTitle>
              <CardDescription>SUV</CardDescription>
            </CardHeader>
            <CardContent className="w-full flex flex-col items-center justify-center gap-4">
              <Image src={"/car10.png"} alt="" width={220} height={68} />
              <Image src={"/spec10.png"} alt="" width={256} height={24} />
            </CardContent>
            <CardFooter className="w-full flex items-center justify-between">
              <p className="text-2xl font-semibold leading-none tracking-tight">
                $80.00/
                <span className="text-sm font-medium text-gray-500">day</span>
              </p>
              <Link href={"/detailPage"}>
                <button className="bg-[#3563e9] p-2 text-white rounded-md">
                  Rent Now
                </button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="w-full max-w-[304px] mx-auto h-auto flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="w-full flex items-center justify-between">
                MG ZX Excite{" "}
                <Image src={"/heart.png"} alt="" width={20} height={20} />
              </CardTitle>
              <CardDescription>Hatchback</CardDescription>
            </CardHeader>
            <CardContent className="w-full flex flex-col items-center justify-center gap-4">
              <Image src={"/car11.png"} alt="" width={220} height={68} />
              <Image src={"/spec11.png"} alt="" width={256} height={24} />
            </CardContent>
            <CardFooter className="w-full flex items-center justify-between">
              <p className="text-2xl font-semibold leading-none tracking-tight">
                $74.00/
                <span className="text-sm font-medium text-gray-500">day</span>
              </p>
              <Link href={"/detailPage"}>
                <button className="bg-[#3563e9] p-2 text-white rounded-md">
                  Rent Now
                </button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="w-full max-w-[304px] mx-auto h-auto flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="w-full flex items-center justify-between">
                New MG ZS
                <Image src={"/heart 2.png"} alt="" width={20} height={20} />
              </CardTitle>
              <CardDescription>SUV</CardDescription>
            </CardHeader>
            <CardContent className="w-full flex flex-col items-center justify-center gap-4">
              <Image src={"/car12.png"} alt="" width={220} height={68} />
              <Image src={"/spec12.png"} alt="" width={256} height={24} />
            </CardContent>
            <CardFooter className="w-full flex items-center justify-between">
              <p className="text-2xl font-semibold leading-none tracking-tight">
                $80.00/
                <span className="text-sm font-medium text-gray-500">day</span>
              </p>
              <Link href={"/detailPage"}>
                <button className="bg-[#3563e9] p-2 text-white rounded-md">
                  Rent Now
                </button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section id="block5" className="button w-full text-center">
        <Link href={"/categoryPage"}>
          <button className="bg-[#3563e9] px-4 py-2 text-white rounded-md mt-5">
            Show More Cars
          </button>
        </Link>
      </section>
    </div>
  );
}
