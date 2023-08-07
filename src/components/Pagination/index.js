import React from 'react'

export default function Index({itemPerPage, totalItems, paginate}) {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalItems / itemPerPage); i++){
        pageNumbers.push(i);
    }

  return (
    <nav className='d-flex justify-content-center'>
        <ul className='pagination'>
            {pageNumbers.map((number) => (
                <li key={number} className='page-item'>
                    <a onClick={() => paginate(number)} href='#newapp' className='page-link'>
                        {number}
                    </a>
                </li>
            ))}
        </ul>
    </nav>
  )
}
