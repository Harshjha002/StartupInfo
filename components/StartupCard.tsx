import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import { FaEye } from 'react-icons/fa';
import Image from 'next/image';
import { Author, Startup } from '@/sanity/types';

export type StartupTypeCard = Omit<Startup, 'author'> & { author?: Author };

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const { _createdAt, views, author, title, category, image, _id, description } = post;

  return (
    <li className="startup-card group rounded-lg shadow-lg bg-white overflow-hidden transition hover:shadow-xl">
      {/* Card Header */}
      <div className="p-4 border-b border-gray-200 flex-between">
        <p className="text-sm text-gray-500">{formatDate(_createdAt)}</p>
        <div className="flex items-center gap-2 text-gray-500">
          <FaEye className="text-primary" />
          <span className="text-sm font-medium">{views}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col gap-4">
        {/* Author Info */}
        <div className="flex items-center gap-3">
          <Link href={`/user/${author?._id}`}>
            <Image
              src={author?.image || '/placeholder-user.png'} // Fallback image
              alt={author?.name || 'Author'}
              width={48}
              height={48}
              className="rounded-full border border-gray-200"
            />
          </Link>
          <div>
            <Link href={`/user/${author?._id}`}>
              <p className="text-sm font-semibold text-gray-700 hover:text-blue-600">
                {author?.name || 'Unknown Author'}
              </p>
            </Link>
          </div>
        </div>

        {/* Title */}
        <Link href={`/startup/${_id}`}>
          <h3 className="text-lg font-bold text-gray-800 hover:text-blue-600 transition line-clamp-1">
            {title}
          </h3>
        </Link>

        {/* Description */}
        <Link href={`/startup/${_id}`}>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        </Link>
      </div>

      {/* Image Section */}
      {image && (
        <Link href={`/startup/${_id}`}>
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover transition-transform group-hover:scale-105"
          />
        </Link>
      )}

      {/* Footer Section */}
      <div className="p-4 border-t border-gray-200 flex-between">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-sm text-gray-700 hover:text-blue-600 transition">
            {category || 'Uncategorized'}
          </p>
        </Link>
        <Link href={`/startup/${_id}`}>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg shadow hover:bg-blue-700 transition">
            Details
          </button>
        </Link>
      </div>
    </li>
  );
};

export default StartupCard;
