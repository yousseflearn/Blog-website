import Image from 'next/image';
import home_coffee01 from '@/public/img/coffee11.jpg';

export default function Home() {
  return (
    <div className="container flex flex-col md:flex-row gap-2 p-4  h-[calc(100vh -4rem)] mt-14">
      {/* small screens */}
      <div className="basis-full flex flex-col justify-center md:basis-2/3">
        <p className="special-word text-xs">Discover all kind of coffee</p>
        <h1 className="pb-5">
          The whole <span className="special-word">Coffee</span> <br />
          Beans
        </h1>
        <p>
          What coffee bean makes the best coffee? Most coffee lovers prefer
          Arabica <br /> coffee beans over Robusta beans because they offer a
          sweeter, smoother taste. <br /> Ethiopian Harrar, Tanzanian Peaberry,
          Panamanian Geisha, Sumatra Mandheling <br /> and Hawaii Kona are among
          the best-tasting Arabica coffee beans in the world.
        </p>
      </div>
      {/* big screens */}
      <div className="hidden md:block basis-1/3">
        <Image
          src={home_coffee01}
          alt="home_coffee"
          sizes="100vh"
          className="w-full h-auto rounded-2xl"
        />
      </div>
      <div></div>
    </div>
  );
}
