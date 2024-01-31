import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProviders';

const Checkout = () => {
    const service = useLoaderData();
    const { title, service_id, _id, price, img } = service;
    const { user } = useContext(AuthContext);

    const handleCheckout = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = user?.email;
        const booking = {
            customerName: name,
            date,
            email,
            img,
            service: title,
            service_id: _id,
            price: price
        }
        console.log(booking);

        fetch('https://car-doctor-server-one-liard.vercel.app/checkouts', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId) {
                    alert('Checkout SuccessFull')
                }
            })

    }

    return (
        <div>

            <form onSubmit={handleCheckout} className="card-body">
                <h2 className='text-3xl text-center font-bold'>Checkout</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="name"
                            name='name'
                            defaultValue={user?.displayName}
                            className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <input type="date" className="input input-bordered"
                            name='date'
                            required />

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email"
                            name='email'
                            defaultValue={user?.email}
                            className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Due</span>
                        </label>
                        <input type="text"
                            defaultValue={'$' + price}
                            name='price'
                            className="input input-bordered" required />

                    </div>
                </div>
                <div className="form-control mt-6">

                    <input className="btn btn-primary btn-block" type="submit" value="Order Confirm" />
                </div>
            </form>



        </div>
    );
};

export default Checkout;