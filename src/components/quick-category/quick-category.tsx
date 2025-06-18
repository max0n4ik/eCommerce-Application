import { Link } from 'react-router-dom';

import Cactus from '@/assets/images/cactus.png';
import IndoorPlants from '@/assets/images/indoors.png';
import Pots from '@/assets/images/pot.png';
import Succulent from '@/assets/images/succulents.png';
import { CATEGORY_IDS, ROUTES } from '@/utils/constantes';

const categories = [
  { id: CATEGORY_IDS.CACTUS, img: Cactus, alt: 'Cactus', label: 'Cactus' },
  {
    id: CATEGORY_IDS.SUCCULENT,
    img: Succulent,
    alt: 'Succulent',
    label: 'Succulent',
  },
  {
    id: CATEGORY_IDS.INDOOR_PLANTS,
    img: IndoorPlants,
    alt: 'Indoor Plants',
    label: 'Indoor Plants',
  },
  { id: CATEGORY_IDS.POTS, img: Pots, alt: 'Pots', label: 'Pots' },
];

export default function QuickCategory(): React.JSX.Element {
  return (
    <section
      className="pt-10 bg-white pb-24 flex flex-col md:flex-row md:justify-evenly text-[23px] font-medium font-sans text-[#2A2A2A] items-center
                        shadow-[inset_0_6px_30px_-6px_rgba(0,0,0,0.25)] gap-10 md:gap-0"
    >
      {categories.map(({ id, img, alt, label }) => (
        <Link
          key={id}
          to={ROUTES.catalogWithCategory(id)}
          className="group block w-fit text-center cursor-pointer transition-transform duration-300
                     hover:scale-105 hover:-translate-y-1"
          aria-label={`Go to category ${label}`}
        >
          <img
            src={img}
            alt={alt}
            className="w-[200px] h-[200px] lg:w-[200px] lg:h-[300px] mb-5 object-contain
                       group-hover:drop-shadow-lg transition-shadow duration-300"
          />
          <p className="mt-5 font-semibold text-[#1f1f1f] group-hover:text-primary transition-colors duration-300">
            {label} →
          </p>
        </Link>
      ))}
    </section>
  );
}
