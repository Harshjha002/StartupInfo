"use client"
import Link from 'next/link';
import React from 'react'
import { ImCross } from "react-icons/im";

const SearchFormReset = () => {

  const reset = () => {
    const form = document.querySelector('.search-form') as HTMLFormElement;

    if (form) form.reset();
  }

  return (
    <button type="reset" onClick={reset}>
      <Link href={'/'} className="search-btn text-white">
      <ImCross className='size-5'/>
      </Link>
    </button>
  )
}

export default SearchFormReset;
