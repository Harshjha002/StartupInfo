import SearchForm from "@/components/SearchForm";

export default async function Home({searchParams} : {searchParams:Promise<{query?:string}>}) {

  const query = (await searchParams).query

  return (
    <>
      <section className="pink_container flex flex-col items-center text-center space-y-6">
        <h1 className="heading text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
          Pitch Your Startup, <br /> Connect with Entrepreneurs
        </h1>
        <p className="sub-heading max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed">
          Submit groundbreaking ideas, vote on innovative pitches, and rise to prominence in the ultimate virtual startup competition.
        </p>
        <SearchForm query={query}/>
      </section>
    </>
  );
}
