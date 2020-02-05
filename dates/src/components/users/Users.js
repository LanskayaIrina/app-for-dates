import React from 'react';
import style from './Users.module.css';

const Users = ({data, onClickInvite}) => {

    const currentYear = new Date().getFullYear();
    const birthYear = new Date(data.dob).getFullYear();
    const age = currentYear - birthYear;

    return (
        <div className={`user ${data.hide}`}>
            <figure className={style.avatar}><img src={data.avatar} alt="avatar"/></figure>
            <section className={style.about}>
                <div className={style.userName}>
                    <span className={style.first_name}>{data.first_name}</span>
                    <span className={style.last_name}>{data.last_name}</span>
                </div>
                <div className={style.info}>
                    <span className={`age`}>Age: {age} years.</span>
                    <span className={`gender`}>Gender: {data.gender}</span>
                    <span className={`status ${data.status}`}>Status: <span className={data.status}>{data.status}</span></span>
                </div>
            </section>
            <button className={style.btnInvite} onClick={onClickInvite}  data-id={data.id} >Invite</button>
        </div>
    )
};
export default Users;