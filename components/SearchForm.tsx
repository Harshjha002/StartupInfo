"use client"
import React from 'react'
import SearchFormreset from './SearchFormReset';
import { FaSearch } from "react-icons/fa";
import Form from 'next/form'

export default function SearchForm({ query }: { query?: string }) {

  return (
    <Form action="/" scroll={false} className="search-form">
      <input
        name="query"
        defaultValue={query}
        className="search-input"
        placeholder="Search Startups"
      />
      <div className="flex gap-2">
        {query && <SearchFormreset />}
        <button type="submit" className="search-btn text-white">
          <FaSearch className='size-5'/>
        </button>
      </div>
    </Form>
  );
}
