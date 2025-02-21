import Image from 'next/image';

export const AppLogo = () => {
  return (
    <div className="mx-auto grid w-fit place-items-center p-10">
      <h1 className="sr-only">Pokemon Splendor</h1>
      <Image
        className="drop-shadow-xl"
        src="logo-pokemon.png"
        alt="Pokemon"
        width={300}
        height={300}
      />
      <Image
        className="-mt-2 drop-shadow-xl"
        src="logo-splendor.png"
        alt="Splendor logo"
        width={280}
        height={300}
      />
    </div>
  );
};
