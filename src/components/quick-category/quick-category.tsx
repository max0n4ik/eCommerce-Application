import { Link } from 'react-router-dom';

import Cactus from '@/assets/images/cactus.png';
import IndoorPlants from '@/assets/images/indoors.png';
import Pots from '@/assets/images/pot.png';
import Succulent from '@/assets/images/succulents.png';
export default function QuickCategory(): React.JSX.Element {
  return (
    <>
      <section className="pt-[40px] bg-white pb-[100px] flex flex-col md:flex-row md:justify-evenly text-[23px] font-medium font-sans text-[#2A2A2A] items-center shadow-[inset_0_6px_30px_-6px_rgba(0,0,0,0.25)]">
        <Link
          to={{
            pathname: `catalog`,
            search: '?category=f8d92e57-18d1-4f86-a4a8-99dc73f7e258',
          }}
        >
          <div className="text-center w-fit">
            <img
              src={Cactus}
              alt="Cactus"
              className="w-[200px] h-[200px] lg:w-[200px] lg:h-[300px] mb-5"
            />
            <p className="mt-5">Cactus →</p>
          </div>
        </Link>
        <Link
          to={{
            pathname: `catalog`,
            search: '?category=1f6cb990-0c3a-46a3-8d86-98b5a5fb6adc',
          }}
        >
          <div className="text-center w-fit">
            <img
              src={Succulent}
              alt="Succulent"
              className="w-[200px] h-[200px] lg:w-[200px] lg:h-[300px] mb-5"
            />
            <p className="mt-5">Succulent →</p>
          </div>
        </Link>
        <Link
          to={{
            pathname: `catalog`,
            search: '?category=0b5c05ce-6397-4c2b-9c32-74d2ff6db986',
          }}
        >
          <div className="text-center w-fit">
            <img
              src={IndoorPlants}
              alt="Indoor Plants"
              className="w-[200px] h-[200px] lg:w-[250px] lg:h-[250px] mb-5"
            />
            <p className="mt-[4rem]">Indoor Plants →</p>
          </div>
        </Link>
        <Link
          to={{
            pathname: `catalog`,
            search: '?category=3745e29f-f543-44dd-949e-39b122144bda',
          }}
        >
          {' '}
          <div className="text-center w-fit">
            <img
              src={Pots}
              alt="Pots"
              className="w-[200px] h-[200px] lg:w-[250px] lg:h-[250px] mb-5"
            />
            <p className="mt-[4rem]">Pots →</p>
          </div>
        </Link>
      </section>
    </>
  );
}
