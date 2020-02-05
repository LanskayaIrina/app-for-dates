import React from 'react';

import './App.css';
import Users from "./components/users/Users";
import Filter from "./components/filter/Filter";
import Modal from "./components/Modal/ModalMessage";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            modalIsOpen: false,
            modalMessage: '',
            userId: null,
        };
        this.filterFormRef = React.createRef();
        this.nameRef = React.createRef();
        this.minAgeRef = React.createRef();
        this.maxAgeRef = React.createRef();
        this.genderRef = React.createRef();
        this.modalRef = React.createRef();
    }


    componentDidMount() {

        fetch('https://gorest.co.in/public-api/users?_format=json&access-token=9nZmk7tMGpo1lkRuIY3cpFNUudrVVJHPikeF')
            .then(response => response.json())
            .then(data => {
                let alph_sorted = {};
                data.result.forEach(item => {
                    let firstLetter = item.first_name[0].toLocaleLowerCase();

                    if (Array.isArray(alph_sorted[firstLetter])) {
                        alph_sorted[firstLetter].push(item)
                    } else {
                        alph_sorted[firstLetter] = [item]
                    }
                });

                let alph_users = Object.keys(alph_sorted)
                    .sort()
                    .reduce((acc, key) => ({
                        ...acc, [key]: alph_sorted[key]
                    }), {});

                this.setState({data: alph_users})
            })
            .catch(() => alert('Update credentials...'))
    }

    onChangeFormHandler = () => {
        const name = (this.nameRef.current.value) ? this.nameRef.current.value.toUpperCase() : '';
        const minAge = (this.minAgeRef.current.value) ? +this.minAgeRef.current.value : 0;
        const maxAge = (this.maxAgeRef.current.value) ? +this.maxAgeRef.current.value : 100;
        const gender = (this.genderRef.current.value);
        const currentYear = new Date().getFullYear();

        let currentState = this.state.data;
        for (let key in currentState) {
            let sortedName = true;
            let sortedAge = true;
            let sortedGender = true;
            let sortedData = currentState[key].map((user) => {

                    const birthYear = new Date(user.dob).getFullYear();
                    const userAge = currentYear - birthYear;
                    sortedName = (name) ? (user.first_name.startsWith(name) || user.last_name.startsWith(name)) : true;
                    sortedAge = (minAge <= userAge && userAge <= maxAge);
                    sortedGender = (gender === '' || gender === user.gender || gender === 'both');

                    user.hide = (sortedName && sortedAge && sortedGender) ? '' : 'hide';
                    return user;
                }
            );
            this.setState({sortedData});
        }
    };

    onClickReset = (event) => {
        event.preventDefault();
        this.filterFormRef.current.reset();
        const data = this.state.data;
        for (let key in data) {
            let allUsers = data[key].forEach((user) => {
                user.hide = '';
                return user;
            });
            this.setState({allUsers});
        }
    };

    onClickInvite = (event) => {
        event.preventDefault();
        this.setModal(true, event.target.dataset.id);
    };

    setModal = (event, userId) => {
        this.setState({
            modalIsOpen: true,
            modalMessage: `Вы действительно хотите пригласить на свидание пользователя  с id =${userId} ?`,
            userId: userId,
        })
    };

    onModalSubmit = (event) => {
        let sortedData = null;

        for (let key in this.state.data) {
            sortedData = this.state.data[key].map((user) => {
                user.hide = (user.id !== this.state.userId) ? '' : 'hide';
                return user;

            });
            this.setState({sortedData});
        }
        this.setState({
            modalMessage: 'Приглашение отправлено',
        });

        this.modalRef.current.querySelector('.yes-btn').classList.add('hidden');
        this.modalRef.current.querySelector('.no-btn').classList.add('hidden');
        this.modalRef.current.querySelector('.ok-btn').classList.remove('hidden');
    };

    onModalCancel = () => {
        this.setState({
            modalIsOpen: false,
            modalMessage: '',
            userId: null,
        })
    };

    render() {
        if (!this.state) {
            return <p>... is loading</p>
        }

        let data = this.state.data;
        const tableMarkup = [];
        const filter = <Filter filterFormRef={this.filterFormRef}
                               nameRef={this.nameRef}
                               minAgeRef={this.minAgeRef}
                               maxAgeRef={this.maxAgeRef}
                               genderRef={this.genderRef}
                               onChangeFormHandler={this.onChangeFormHandler}
                               onClickReset={this.onClickReset}/>;


        for (let key in data) {
            let users = data[key];
            tableMarkup.push(<div className="Letter" key={key}>{key}</div>); //letter
            users.forEach((user) => {
                tableMarkup.push(<Users data={user} key={user.id}
                                        onClickInvite={this.onClickInvite}/>)
            });
        }

        return (
            (tableMarkup) &&
            <div className="Main">
                <header className="App-header"><h1>Let's go on a date</h1></header>
                <main className="Main">
                    <section className="Filter">
                        {filter}
                    </section>
                    <section className="Users">
                        <div>{tableMarkup}</div>
                    </section>
                </main>
                {
                    (this.state.modalIsOpen) &&
                    <Modal title={this.state.modalMessage} isOpen={this.state.modalIsOpen}
                           onModalCancel={this.onModalCancel}
                           onModalSubmit={this.onModalSubmit}
                           modalRef={this.modalRef}
                    />
                }
            </div>)
    }
}
