import React from 'react';
import './Filter.css';

const Filter = ({filterFormRef, nameRef, minAgeRef, maxAgeRef, genderRef, onChangeFormHandler, onClickReset}) => {
    return <div className="">
        <form ref={filterFormRef}>
            <div className="field">
                <label htmlFor="name">Name: </label>
                <input type="text" placeholder="Enter Name" ref={nameRef} onKeyUp={onChangeFormHandler}/>
            </div>
            <div className="field">
                <label htmlFor="">Min age: </label>
                <input type="number" placeholder="Enter min age" ref={minAgeRef} onKeyUp={onChangeFormHandler} />
            </div>
            <div className="field">
                <label htmlFor="max-age">Max-age: </label>
                <input type="number" placeholder="Enter max age" ref={maxAgeRef} onKeyUp={onChangeFormHandler}/>
            </div>
            <select name="gender" ref={genderRef} onChange={onChangeFormHandler}>
                <option value="" defaultValue="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="both">Both</option>
            </select>
            <button onClick={onClickReset} >Reset</button>
        </form>
    </div>
};
export default Filter;