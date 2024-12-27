"use client";
import ArtistCard from "@/components/lineup/ArtistCard";
import ScrollToButton from "./ScrollToButton";

const ByArtist = ({ artists }) => {
  const endpoint = process.env.FOO_FEST_API_URL;
  console.log("ARTIST:", artists);

  return (
    <section>
      <ul className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-4">
        {artists.map((artist, i) => (
          // console.log("ARTIST:", artist.slug)
          <ArtistCard key={i} name={artist.name} slug={artist.slug} img={artist.logo.startsWith("https://") ? artist.logo : `${endpoint}/logos/${artist.logo}`}></ArtistCard>
        ))}
      </ul>
      <ScrollToButton scrollFromTop="0" simple={false}>
        Back to top
      </ScrollToButton>
    </section>
  );
};

export default ByArtist;
