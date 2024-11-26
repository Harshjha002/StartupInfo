import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUP_QUERY } from "@/sanity/lib/queries";

export default async function Home({searchParams} : {searchParams:Promise<{query?:string}>}) {

  const query = (await searchParams).query;
  const params = {search:query || null}

  // const post = await client.fetch(STARTUP_QUERY)
  const {data:post} = await sanityFetch({query:STARTUP_QUERY,params})


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
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search result for "${query}"` : 'All startups '}
        </p>

        <ul className="mt-7 card_grid">
          {post?.length > 0 ? ( post.map((post:StartupTypeCard) => (  <StartupCard key={post?._id} post={post}/> ))):(
            <p className="">No Startups found</p>
          )}
        </ul>

      </section>

      <SanityLive/>
    </>
  );
}
