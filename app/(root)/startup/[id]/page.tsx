import { client } from '@/sanity/lib/client';
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import { formatDate } from '@/lib/utils';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import markdownit from 'markdown-it';
import View from '@/components/View';
import Skeleton from '@/components/Skeleton';
import StartupCard, { StartupTypeCard } from '@/components/StartupCard';

const md = markdownit();

export const experimental_ppr = true;

const DetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const [post , {select:editorPosts} ] =await Promise.all([client.fetch(STARTUP_BY_ID_QUERY, { id }), client.fetch(PLAYLIST_BY_SLUG_QUERY , {slug:'editor-picks'})])

 

  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || '');

  return (
    <>
      <section className="pink_container !min-h-[230px] px-4 md:px-8 py-6">
        <p className="tag text-gray-500">{formatDate(post?._createdAt)}</p>
        <h1 className="heading text-4xl md:text-5xl font-bold mt-2">{post.title}</h1>
        <p className="sub-heading mt-4 text-lg text-gray-700 !max-w-5xl">{post.description}</p>
      </section>

      <section className="section_container px-4 md:px-8 py-6">
  {/* Image Section */}
  <img
    src={post?.image}
    alt="thumbnail"
    className="w-full max-w-[600px] h-auto object-cover rounded-xl shadow-lg border border-gray-200"
  />

  <div className="space-y-5 mt-10 max-w-4xl mx-auto">
    {/* Author Info */}
    <div className="flex justify-between items-center mb-4">
      <Link
        href={`/user/${post.author?._id}`}
        className="flex gap-2 items-center"
        aria-label={`View profile of ${post.author?.name}`}
      >
        <Image
          src={post.author.image || '/placeholder-user.png'} // Fallback image
          alt={`Avatar of ${post.author.name}`}
          width={64}
          height={64}
          className="rounded-full border border-gray-300 drop-shadow-lg"
        />
        <div>
          <p className="text-2xl font-medium text-gray-800">{post.author.name}</p>
          <p className="text-lg font-medium text-gray-500">@{post.author.username}</p>
        </div>
      </Link>

      <p className="category-tag bg-gray-100 text-gray-800 px-2 py-1 rounded-lg">
        {post.category}
      </p>
    </div>

    {/* Pitch Details */}
    <h3 className="text-3xl font-bold mb-4">Pitch Details</h3>
    {parsedContent ? (
      <article
        className="prose prose-sm md:prose-base max-w-full break-words"
        dangerouslySetInnerHTML={{ __html: parsedContent }}
      />
    ) : (
      <p className="text-gray-500">No details provided</p>
    )}
  </div>

  {/* Divider */}
  <hr className="divider my-8 border-gray-200" />

  {editorPosts?.length > 0 && (
  <div className="max-w-4xl mx-auto mt-12 px-4 md:px-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Editor&apos;s Picks</h2>
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {editorPosts.map((post: StartupTypeCard, i: number) => (
        <li key={i} className="transition-transform transform hover:scale-105">
          <StartupCard post={post} />
        </li>
      ))}
    </ul>
  </div>
)}

  {/* View Component */}
  <Suspense fallback={<Skeleton />}>
    <View id={id} />
  </Suspense>
</section>
    </>
  );
};

export default DetailsPage;
