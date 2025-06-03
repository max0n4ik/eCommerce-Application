import AboutUs from '@/assets/images/about-us.png';
import Collaboration from '@/assets/images/collaboration.jpg';
import Elizaveta from '@/assets/images/elizaveta.png';
import Margarita from '@/assets/images/margarita.jpeg';
import Maxim from '@/assets/images/maxim.jpeg';
import Olga from '@/assets/images/olga.jpeg';
import RSSchoolLogo from '@/assets/images/rss-logo.svg';
import GitHubLogo from '@/assets/images/st-github.png';

export default function About(): JSX.Element {
  return (
    <>
      <section className="bc-section-background pt-8 pb-14">
        <div className="flex flex-col lg:flex-row items-center lg:justify-evenly px-5 lg:px-20 py-10 gap-10">
          <div className="flex flex-col gap-6 text-center lg:text-right items-center lg:items-end max-w-full lg:max-w-[50%]">
            <h1 className="text-[20px] sm:text-[36px] md:text-[42px] lg:text-[40px] text-primary font-bold font-serif leading-snug">
              Petal & Pot — Cultivating Botanical Aesthetics
            </h1>
            <div className="text-[#676867] font-sans text-[12px] sm:text-[14.5px] md:text-[15px] lg:text-[16px] max-w-[530px]">
              <p className="py-2">
                Petal & Pot is a New York&ndash;based retail and wholesale plant
                nursery that redefines the relationship between nature and
                design. Born out of a desire to bring curated greenery into
                modern spaces, our nursery offers a meticulously selected range
                of plants for designers, homeowners, landscapers, and
                green-conscious brands.
              </p>
              <p className="py-2">
                We don&apos;t just sell plants — we grow them with intent. Every
                item in our collection is cultivated under expert care, ensuring
                that each leaf, stem, and bloom meets the highest standards of
                quality, aesthetics, and vitality.
              </p>
              <p className="py-2">
                Whether you&apos;re planning a lush backyard escape or a clean
                biophilic office design, Petal & Pot helps gardens thrive — from
                concept to cultivation.
              </p>
            </div>
          </div>
          <div className="w-full max-w-[350px] max-h-[450px] lg:max-h-none">
            <img src={AboutUs} alt="About Us" className="w-full h-auto " />
          </div>
        </div>
      </section>
      <section className="py-6">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h1 className="text-[26px] sm:text-[32px] lg:text-[36px] text-primary font-serif font-medium leading-tight mb-4">
            Meet the Development Team
          </h1>
          <div className="text-[#676867] font-sans text-[14px] sm:text-[14.5px] md:text-[18px] lg:text-[20px]">
            <p className="mt-4 leading-relaxed">
              This website is the result of collaboration between talented
              alumni of{' '}
              <a
                href="https://rs.school/"
                className="font-semibold text-[hsl(50,100%,56%)]  hover:scale-105 inline-block transition-transform duration-300 ease-out"
              >
                RS School
              </a>
              , who combined design, technology, and love for nature to bring
              Petal & Pot online.
            </p>
            <p className="mt-4 leading-relaxed">
              Our team worked in a collaborative and agile environment,
              splitting tasks based on strengths and areas of growth. We
              coordinated through GitHub Projects and communication tools to
              ensure smooth version control, continuous progress, and a shared
              design vision. Regular mentorship sessions and peer reviews helped
              us keep the codebase clean, scalable, and production-ready.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-10 p-6 ">
          <div className="bc-section-background p-6 rounded-2xl shadow-[0_4px_14px_-4px_rgba(0,0,0,0.1)] text-[#2A2A2A] relative transition-transform duration-300 ease-in-out cursor-pointer hover:scale-[1.03] hover:-translate-y-1">
            <div className="flex items-center justify-end gap-4 mb-4">
              <div>
                <h4 className="text-lg font-bold text-primary font-serif">
                  Margarita Bondarenko
                </h4>
                <p className="text-sm">Team Member</p>
              </div>
              <img
                src={Margarita}
                alt="Margarita"
                className="w-[80px] h-[80px] rounded-full object-cover shadow-md"
              />
            </div>
            <p className="text-[15px] leading-relaxed mb-2">
              Margarita is passionate about responsive UI, semantic HTML, and
              performance optimization. She focuses on creating clean,
              maintainable code and improving accessibility across platforms.
            </p>

            <div className="mt-4">
              <h5 className="font-semibold mb-2 text-[15px] text-primary">
                Contributions
              </h5>
              <ul className="list-disc list-inside text-[15px] text-[#444] space-y-1 marker:text-primary">
                <li>Developed responsive routing and navigation systems</li>
                <li>
                  Built key components for the Home and User Profile pages
                </li>
                <li>Ensured accessibility standards</li>
              </ul>
            </div>
            <a
              href="https://github.com/m-bond91"
              className="absolute bottom-4 right-4 transition-transform duration-300 ease-in-out hover:scale-110"
            >
              <div className="w-[40px] h-[40px] rounded-full bg-primary flex items-center justify-center">
                <img
                  src={GitHubLogo}
                  alt="githublogo"
                  className="w-[35px] h-[35px]"
                />
              </div>
            </a>
          </div>
          <div className="bc-section-background p-6 rounded-2xl shadow-[0_4px_14px_-4px_rgba(0,0,0,0.1)] text-[#2A2A2A] relative transition-transform duration-300 ease-in-out cursor-pointer hover:scale-[1.03] hover:-translate-y-1">
            <div className="flex items-center justify-end gap-4 mb-4">
              <div>
                <h4 className="text-lg font-bold text-primary font-serif">
                  Maksim Gorohov
                </h4>
                <p className="text-sm">Team Lead & Team Member</p>
              </div>
              <img
                src={Maxim}
                alt="Maxim"
                className="w-[80px] h-[80px] rounded-full object-cover shadow-md"
              ></img>
            </div>
            <p className="text-[15px] leading-relaxed mb-2">
              Maksim specializes in interactive UI and component architecture
              with React. He brings a keen eye for animation, user experience,
              and frontend optimization.
            </p>

            <div className="mt-4">
              <h5 className="font-semibold mb-2 text-[15px] text-primary">
                Contributions
              </h5>
              <ul className="list-disc list-inside text-[15px] text-[#444] space-y-1 marker:text-primary">
                <li> Developed product listing, search, and filtering logic</li>
                <li>
                  Implemented interactive elements like modals, dropdowns, and
                  hover effects
                </li>
                <li>
                  Built reusable components for the Home and Product pages
                </li>
              </ul>
            </div>

            <a
              href="https://github.com/max0n4ik"
              className="absolute bottom-4 right-4 transition-transform duration-300 ease-in-out hover:scale-110"
            >
              <div className="w-[40px] h-[40px] rounded-full bg-primary flex items-center justify-center">
                <img
                  src={GitHubLogo}
                  alt="githublogo"
                  className="w-[35px] h-[35px]"
                />
              </div>
            </a>
          </div>

          <div className="bc-section-background p-6 rounded-2xl shadow-[0_4px_14px_-4px_rgba(0,0,0,0.1)] text-[#2A2A2A] relative transition-transform duration-300 ease-in-out cursor-pointer hover:scale-[1.03] hover:-translate-y-1">
            <div className="flex items-center justify-end gap-4 mb-4">
              <div>
                <h4 className="text-lg font-bold text-primary font-serif">
                  Elizaveta Medvedeva
                </h4>
                <p className="text-sm">Team Member</p>
              </div>
              <img
                src={Elizaveta}
                alt="Elizaveta"
                className="w-[80px] h-[80px] rounded-full object-cover shadow-md"
              ></img>
            </div>
            <p className="text-[15px] leading-relaxed mb-2">
              Elizaveta brings thoughtful UX solutions and pixel-perfect
              layouting to the project. With a detail-oriented mindset, she
              ensures interfaces remain intuitive and visually consistent.
            </p>

            <div className="mt-4">
              <h5 className="font-semibold mb-2 text-[15px] text-primary">
                Contributions
              </h5>
              <ul className="list-disc list-inside text-[15px] text-[#444] space-y-1 marker:text-primary">
                <li>Managed component reuse and project file structure</li>
                <li>Built layouts and UI for Home and Product Detail pages</li>
                <li>
                  Helped integrate and refine filtering and product display
                  logic
                </li>
              </ul>
            </div>

            <a
              href="https://github.com/elizabethmedvedeva"
              className="absolute bottom-4 right-4 transition-transform duration-300 ease-in-out hover:scale-110"
            >
              <div className="w-[40px] h-[40px] rounded-full bg-primary flex items-center justify-center">
                <img
                  src={GitHubLogo}
                  alt="githublogo"
                  className="w-[35px] h-[35px]"
                />
              </div>
            </a>
          </div>

          <div className="bc-section-background p-6 rounded-2xl shadow-[0_4px_14px_-4px_rgba(0,0,0,0.1)] text-[#2A2A2A] relative transition-transform duration-300 ease-in-out cursor-pointer hover:scale-[1.03] hover:-translate-y-1">
            <div className="flex items-center justify-end gap-4 mb-4">
              <div>
                <h4 className="text-lg font-bold text-primary font-serif">
                  Olga Zhyzhka
                </h4>
                <p className="text-sm">Mentor</p>
              </div>
              <img
                src={Olga}
                alt="Olga"
                className="w-[80px] h-[80px] rounded-full object-cover shadow-md"
              ></img>
            </div>
            <p className="text-[15px] leading-relaxed mb-2">
              Olga is an experienced developer and mentor with RS School. She
              provided architectural guidance, reviewed pull requests, and
              supported the team in applying best practices.
            </p>

            <div className="mt-4">
              <h5 className="font-semibold mb-2 text-[15px] text-primary">
                Contributions
              </h5>
              <ul className="list-disc list-inside text-[15px] text-[#444] space-y-1 marker:text-primary">
                <li>Guided team through project planning and delivery</li>
                <li>Conducted code reviews and architecture feedback</li>
                <li>
                  Helped resolve technical blockers and workflow challenges
                </li>
              </ul>
            </div>
            <a
              href="https://github.com/helgazhizhka"
              className="absolute bottom-4 right-4 transition-transform duration-300 ease-in-out hover:scale-110"
            >
              <div className="w-[40px] h-[40px] rounded-full bg-primary flex items-center justify-center">
                <img
                  src={GitHubLogo}
                  alt="githublogo"
                  className="w-[35px] h-[35px]"
                />
              </div>
            </a>
          </div>
        </div>
      </section>
      <section className="bg-white py-10 px-5 lg:px-[200px] flex justify-center">
        <div className="max-w-screen-xl w-full flex flex-col-reverse lg:flex-row items-center gap-10">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-[26px] sm:text-[32px] lg:text-[36px] text-primary font-serif font-medium leading-tight mb-4">
              Collaboration
            </h2>
            <div className="text-[#676867] font-sans text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed space-y-4">
              <p>
                Our team used Scrum methodologies and daily stand-ups to ensure
                progress, cohesion, and transparency throughout the development
                cycle. Tools like Figma and GitHub Projects kept us aligned
                across design, development, and deployment stages. Each member
                contributed not only code, but vision — ensuring a product
                that&apos;s both functional and elegant.
              </p>
              <p>
                The result: a fast, responsive, and refined website that
                reflects Petal & Pot&apos;s philosophy and serves both retail
                and wholesale customers seamlessly.
              </p>
            </div>
          </div>
          <div className="flex-1 max-w-[400px] w-full">
            <img
              src={Collaboration}
              alt="About Us"
              className="w-full h-auto shadow-md"
            />
          </div>
        </div>
      </section>
      <section className="bc-section-background py-6 px-5 lg:px-[120px]">
        <div className="max-w-screen-md mx-auto w-full flex flex-col items-center justify-center text-center gap-6">
          <h2 className="text-[28px] sm:text-[34px] lg:text-[40px] text-primary font-serif font-semibold leading-snug">
            RS School
          </h2>

          <div className="flex items-center gap-6 justify-center flex-wrap">
            <a
              href="https://rs.school/courses/javascript-ru"
              className="shrink-0 transition-transform duration-300 ease-out hover:scale-105"
            >
              <img
                src={RSSchoolLogo}
                alt="RS School Logo"
                className="w-[80px] h-[80px]"
              />
            </a>
            <div className="max-w-md text-[#676867] text-[15px] sm:text-[16px] leading-relaxed font-sans text-left">
              <p>
                Proudly built by graduates of{' '}
                <a
                  href="https://rs.school/"
                  className="font-semibold text-[hsl(50,100%,56%)] hover:scale-105 inline-block transition-transform duration-300 ease-out"
                >
                  RS School
                </a>
                . Click the logo to learn more about the educational program
                that helped make this project possible.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
