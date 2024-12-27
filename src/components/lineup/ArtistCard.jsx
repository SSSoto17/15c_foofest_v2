import Image from "next/image";
import picture from "../../assets/tester/terminalist.jpg";
import Link from "next/link";

const ArtistCard = ({ name, slug, img }) => {
  // console.log("slug:", slug);

  return (
    <li>
      <Link
        href={`/lineup/artists/single/${slug}`}
        className="grid aspect-square"
      >
        <Image
          src={img}
          width="400"
          height="400"
          alt={`Image of ${name}`}
          className="grayscale row-start-1 col-start-1"
        ></Image>
        <h3 className="z-1 heading-4 px-6 py-2 row-start-1 col-start-1 self-end bg-gradient-to-t from-black">
          {name}
        </h3>
      </Link>
    </li>
  );
};

export default ArtistCard;
