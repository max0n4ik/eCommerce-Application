import type { JSX } from 'react';
import { Link } from 'react-router-dom';

import Bonsai from '@/assets/images/bonsai.png';
import Cactus from '@/assets/images/cactus.png';
import IndoorPlants from '@/assets/images/indoor-plants.png';
import Succulent from '@/assets/images/succulent.png';
import { ROUTES } from '@/utils/constantes';

export default function Home(): JSX.Element {
  return (
    <>
      <div>Home page</div>
      <section className="pt-[40px] bg-white pb-[100px] flex flex-col md:flex-row md:justify-between text-[23px] font-medium font-sans text-[#2A2A2A] items-center">
        <div className="text-center w-fit">
          <img
            src={Cactus}
            alt="Cactus"
            className="size-[200px] lg:size-[300px] mb-5"
          />
          <Link to={ROUTES.PRODUCT}>Cactus →</Link>
        </div>
        <div className="text-center w-fit">
          <img
            src={Bonsai}
            alt="Bonsai"
            className="size-[200px] lg:size-[300px] mb-5"
          />
          <Link to={ROUTES.PRODUCT}>Bonsai →</Link>
        </div>
        <div className="text-center w-fit">
          <img
            src={Succulent}
            alt="Succulent"
            className="size-[200px] lg:size-[300px] mb-5"
          />
          <Link to={ROUTES.PRODUCT}>Succulent →</Link>
        </div>
        <div className="text-center w-fit">
          <img
            src={IndoorPlants}
            alt="Indoor Plants"
            className="size-[200px] lg:size-[300px] mb-5"
          />
          <Link to={ROUTES.PRODUCT}>Indoor Plants →</Link>
        </div>
      </section>
      <section className="font-sans pb-[100px] pt-[21px] px-[20px] lg:px-[50px]">
        <h2 className="text-[30px] lg:text-[43px] font-bold font-serif mb-5 text-[#2A2A2A]">
          Promotional codes for today
        </h2>
        <div className="flex lg:flex-row flex-col gap-5 lg:justify-between">
          <p className="max-w-[700px] text-[15.6px] text-[#5A5A5A] font-sans">
            Use these promo codes to buy wanted products on the topic in the
            headline. Make sure you keep it short and attractive.
          </p>
          <Link to={ROUTES.CATALOG}>
            <button className="text-[13.2px] text-[#FFFFFF] bg-[#586F69] py-[17px] px-[27px]">
              VIEW ALL PLANTS
            </button>
          </Link>
        </div>
      </section>
      <section className="bg-white pb-[36px] gap-5 pt-[83px] px-[20px] lg:px-[200px] flex flex-col items-center">
        <p className="text-[13.7px] text-[#676867] font-serif font-medium">
          Our story
        </p>
        <p className="text-center font-serif text-[30px] lg:text-[40px] text-[#011C14] font-medium leading-relaxed">
          We are a family owned, retail and wholesale plant nursery, located in
          New York.
        </p>
        <p className="text-[14.5px] font-medium text-[#676867] text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
          suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
          lacus vel facilisis.
        </p>
        <Link to={ROUTES.ABOUT}>
          <button className="bg-[#586F69] mb-[26px] px-[25px] py-[15px] text-[13.2px] uppercase text-white">
            Read More
          </button>
        </Link>
        <p className="font-serif text-[20px] font-semibold text-[#586F69]">
          Share your setup with
        </p>
        <p className="text-[30px] lg:text-[40px] text-[#586F69] font-bold font-serif">
          #Petal&Pot
        </p>
      </section>
    </>
  );
}
