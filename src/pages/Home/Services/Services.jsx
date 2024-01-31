import React, { useEffect, useRef, useState } from 'react';
import Service from './Service';

const Services = () => {
    const [services, setServices] = useState([]);
    const [asc, setAsc] = useState(true);
    const searchRef = useRef(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch(`http://localhost:5000/services?search=${search}&sort=${asc ? 'asc' : 'desc'}`)
            .then(res => res.json())
            .then(data => setServices(data))
    }, [asc, search])

    const handleSearch = () => {
        setSearch(searchRef.current.value)
    }


    return (
        <div className='mt-4'>
            <div className="join">
                <input ref={searchRef} className="input input-bordered join-item" placeholder="search" />
                <button onClick={handleSearch} className="btn join-item rounded-r-full">Search</button>
            </div>
            <div className='text-center'>
                <h3 className='text-2xl font-bold text-orange-500'>Our Services</h3>
                <h2 className='text-5xl font-bold'>Our Service Area</h2>
                <p >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam veniam <br /> recusandae officiis sunt ratione atque numquam sint exercitationem dolores aperiam?</p>
                <button
                    className='btn btn-primary'
                    onClick={() => (setAsc(!asc))}
                >

                    {asc ? 'Price:High to Low' : 'Price:Low to High'}
                </button>

            </div>
            <div
                className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

                {
                    services.map(service => <Service
                        key={service._id}
                        service={service}
                    ></Service>)
                }
            </div>

        </div>
    );
};

export default Services;