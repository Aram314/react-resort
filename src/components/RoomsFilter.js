import React from 'react'
import {useContext} from 'react'
import {RoomContext} from "../context";
import Title from '../components/Title'

const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))]
};

function RoomsFilter({rooms}) {
    const context = useContext(RoomContext);

    const {handleChange, type, capacity, price, maxPrice, minPrice, minSize, maxSize, pets, breakfast} = context;
    let types = getUnique(rooms, 'type');
    types = ['all', ...types];

    let guests = getUnique(rooms, 'capacity');


    return (
        <section className='filter-container'>
            <Title title='Search rooms'/>
            <form className="filter-form">
                <div className="form-group">
                    <label htmlFor="type">Room type</label>
                    <select name="type" id="type" value={type} className='form-control' onChange={handleChange}>
                        {types.map((item, index) => {
                            return (
                                <option value={item} key={index}>{item}</option>
                            )
                        })}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="capacity">Guests</label>
                    <select name="capacity" id="capacity" value={capacity} className='form-control' onChange={handleChange}>
                        {guests.map((item, index) => {
                            return (
                                <option value={item} key={index}>{item}</option>
                            )
                        })}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="price">Room price ${price}</label>
                    <input type="range" className='form-control' onChange={handleChange} id='price' name='price' value={price} min={minPrice} max={maxPrice}/>
                </div>

                <div className="form-group">
                    <label htmlFor="size">Room Size</label>
                    <div className="size-inputs">
                        <input type="number" onChange={handleChange} name='minSize' id='size' value={minSize} className='size-input'/>
                        <input type="number" onChange={handleChange} name='maxSize' id='size' value={maxSize} className='size-input'/>
                    </div>
                </div>

                <div className="form-group">
                    <div className="single-extra">
                        <input type="checkbox" name="breakfast" id="breakfast" onChange={handleChange} checked={breakfast}/>
                        <label htmlFor="breakfast">breakfast</label>
                    </div>
                    <div className="single-extra">
                        <input type="checkbox" name="pets" id="pets" onChange={handleChange} checked={pets}/>
                        <label htmlFor="pets">pets</label>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default RoomsFilter