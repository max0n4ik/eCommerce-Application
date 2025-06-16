import type { JSX } from 'react';
import { Link } from 'react-router-dom';

// import Bonsai from '@/assets/images/bonsai.png';
// import Cactus from '@/assets/images/cactus.png';
import ExcellentServices from '@/assets/images/excellent-services.png';
import FastDelivery from '@/assets/images/fast-delivery.png';
import Grid1 from '@/assets/images/grid1.png';
import Grid2 from '@/assets/images/grid2.png';
import Grid3 from '@/assets/images/grid3.png';
import Grid4 from '@/assets/images/grid4.png';
import Grid5 from '@/assets/images/grid5.png';
import Grid6 from '@/assets/images/grid6.png';
import Grid7 from '@/assets/images/grid7.png';
import Grid8 from '@/assets/images/grid8.png';
import HighQuality from '@/assets/images/high-quality.png';
// import IndoorPlants from '@/assets/images/indoor-plants.png';
import MainPlantImage from '@/assets/images/main-banner-image.png';
// import Succulent from '@/assets/images/succulent.png';
import WidePlant from '@/assets/images/wide-plant.png';
import { ROUTES } from '@/utils/constantes';

export default function Home(): JSX.Element {
  return (
    <>
      <section className="bc-section-background " id="home">
        <div className="flex flex-col lg:flex-row lg:justify-between items-center px-5 py-10">
          <div className="flex flex-col gap-4">
            <div>
              <div>
                <h1 className="max-w-[745px] text-[30px] sm:text-[36px] md:text-[42px] lg:text-[48.6px] text-[#011C14] font-medium font-serif leading-snug">
                  Everything is better with plants
                </h1>
              </div>
            </div>
            <div>
              <div className="max-w-[530px] text-[14px] sm:text-[14.5px] md:text-[15px] lg:text-[16px] text-[#676867] font-sans">
                <p>
                  A houseplant shop for those who want more green and calm in
                  everyday life. We offer plants that grow with you — simple,
                  beautiful, and full of care.
                </p>
              </div>
            </div>
            <div>
              <Link to={ROUTES.CATALOG}>
                <button
                  className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] 
             text-white bg-primary 
             py-[10px] sm:py-[12px] md:py-[15px] lg:py-[17px] 
             px-[16px] sm:px-[20px] md:px-[24px] lg:px-[27px] 
             hover:bg-[#3d504b] transition-colors duration-200"
                >
                  GO SHOPPING
                </button>
              </Link>
            </div>
          </div>
          <div>
            <Link to={ROUTES.CATALOG}>
              <img
                src={MainPlantImage}
                alt="MainPlantImage"
                className="size-[200px] sm:size-[325px]  md:size-[325px] lg:size-[525px] mb-5"
              />
            </Link>
          </div>
        </div>
      </section>
      <section className="py-10 px-5 bg-white shadow-[0_4px_12px_-3px_rgba(0,0,0,0.07),_0_-6px_20px_-6px_rgba(0,0,0,0.25)]">
        <div className="flex flex-wrap gap-y-6 gap-x-4 justify-center sm:justify-between">
          <div className="flex items-center gap-4 w-[100%] xs:w-[48%] sm:w-[48%] lg:w-[23%] max-w-[320px]">
            <img
              src={HighQuality}
              alt="HighQuality"
              className="w-[52px] h-[52px]"
            ></img>
            <div>
              <h4 className="text-lg lg:text-[19.8px] font-bold font-serif text-[#2A2A2A]">
                High Quality Plants
              </h4>
              <p className="text-sm lg:text-[15.6px] font-regular font-inter text-[#5A5A5A]">
                A line about the service you&apos;e mentioned above.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 w-[100%] xs:w-[48%] sm:w-[48%] lg:w-[23%] max-w-[320px]">
            <img
              src={WidePlant}
              alt="WidePLant"
              className="w-[52px] h-[52px]"
            ></img>
            <div>
              <h4 className="text-lg lg:text-[19.8px] font-bold font-serif text-[#2A2A2A]">
                Wide Plant Range
              </h4>
              <p className="text-sm lg:text-[15.6px] font-regular font-inter text-[#5A5A5A]">
                A line about the service you&apos;e mentioned above.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 w-[100%] xs:w-[48%] sm:w-[48%] lg:w-[23%] max-w-[320px]">
            <img
              src={ExcellentServices}
              alt="ExcellentServices"
              className="w-[52px] h-[52px]"
            ></img>
            <div>
              <h4 className="text-lg lg:text-[19.8px] font-bold font-serif text-[#2A2A2A]">
                Excellent Services
              </h4>
              <p className="text-sm lg:text-[15.6px] font-regular font-inter text-[#5A5A5A]">
                A line about the service you&apos;e mentioned above.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 w-[100%] xs:w-[48%] sm:w-[48%] lg:w-[23%] max-w-[320px]">
            <img
              src={FastDelivery}
              alt="FastDelivery"
              className="w-[52px] h-[52px]"
            ></img>
            <div>
              <h4 className="text-lg lg:text-[19.8px] font-bold font-serif text-[#2A2A2A]">
                Fast Delivery
              </h4>
              <p className="text-sm lg:text-[15.6px] font-regular font-inter text-[#5A5A5A]">
                A line about the service you&apos;e mentioned above.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="pt-[40px] bg-white pb-[100px] flex flex-col md:flex-row md:justify-between text-[23px] font-medium font-sans text-[#2A2A2A] items-center shadow-[inset_0_6px_30px_-6px_rgba(0,0,0,0.25)]">
        <div className="text-center w-fit">
          <img
            src={Cactus}
            alt="Cactus"
            className="size-[200px] lg:size-[300px] mb-5"
          />
          <p>Cactus →</p>
        </div>
        <div className="text-center w-fit">
          <img
            src={Succulent}
            alt="Succulent"
            className="size-[200px] lg:size-[300px] mb-5"
          />
          <p>Succulent →</p>
        </div>
        <div className="text-center w-fit">
          <img
            src={IndoorPlants}
            alt="Indoor Plants"
            className="size-[200px] lg:size-[300px] mb-5"
          />
          <p>Indoor Plants →</p>
        </div>
        <div className="text-center w-fit">
          <img
            src={Bonsai}
            alt="Bonsai"
            className="size-[200px] lg:size-[300px] mb-5"
          />
          <p>Pots →</p>
        </div>
      </section> */}
      <section className="font-sans pb-[100px] pt-[21px] px-[20px] lg:px-[50px] bc-section-background">
        <h2 className="text-[30px] lg:text-[43px] font-bold font-serif mb-5 text-[#2A2A2A]">
          Promotional codes for today
        </h2>
        <div className="flex lg:flex-row flex-col gap-5 lg:justify-between">
          <p className="max-w-[700px] text-[15.6px] text-[#5A5A5A] font-sans">
            Use these promo codes to buy wanted products on the topic in the
            headline. Make sure you keep it short and attractive.
          </p>
          <Link to={ROUTES.CATALOG}>
            <button
              className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] 
             text-white bg-primary 
             py-[10px] sm:py-[12px] md:py-[15px] lg:py-[17px] 
             px-[16px] sm:px-[20px] md:px-[24px] lg:px-[27px] 
             hover:bg-[#3d504b] transition-colors duration-200"
            >
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
          <button
            className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] 
             text-white bg-primary 
             py-[10px] sm:py-[12px] md:py-[15px] lg:py-[17px] 
             px-[16px] sm:px-[20px] md:px-[24px] lg:px-[27px] 
             hover:bg-[#3d504b] transition-colors duration-200"
          >
            Read More
          </button>
        </Link>
        <p className="font-serif text-[20px] font-semibold text-primary">
          Share your setup with
        </p>
        <p className="text-[30px] lg:text-[40px] text-primary font-bold font-serif">
          #Petal&Pot
        </p>
      </section>
      <section className="grid-banner-section">
        <div className="grid-banner-container">
          <img className="grid-banner-img area-b" src={Grid7} alt="Grid7"></img>
          <img className="grid-banner-img area-c" src={Grid8} alt="Grid8"></img>
          <img className="grid-banner-img area-d" src={Grid4} alt="Grid4"></img>

          <img className="grid-banner-img area-e" src={Grid2} alt="Grid2"></img>
          <img className="grid-banner-img area-g" src={Grid6} alt="Grid6"></img>

          <img className="grid-banner-img area-h" src={Grid5} alt="Grid5"></img>

          <img className="grid-banner-img area-k" src={Grid3} alt="Grid3"></img>

          <img
            className="grid-banner-img  area-l"
            src={Grid1}
            alt="Grid1"
          ></img>
        </div>
      </section>
    </>
  );
}
