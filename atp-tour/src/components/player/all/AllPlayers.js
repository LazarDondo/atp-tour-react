import React from "react";
import { connect } from 'react-redux';
import { BasicTable } from "../../table/BasicTable";
import { get_players, find_player } from "../../../redux/actions";
import './AllPlayers.css';
import SyncSelect from '../../select-fields/SyncSelect';


class AllPlayers extends React.Component {

    constructor() {
        super();
        this.firstName = React.createRef();
        this.lastName = React.createRef();
    }


    componentDidMount() {
        this.props.get_players();
    }

    changePage = (pagination) => {
        this.props.get_players(pagination, this.firstName.current.value, this.lastName.current.value);
    }

    search = () => {
        const { number, size } = this.props.players;
        const pagingValues = { number, size };
        this.props.get_players(pagingValues, this.firstName.current.value, this.lastName.current.value, this.birthCountry);
    }

    columns = [
        {
            Header: 'Rank',
            accessor: 'rank',
            width: '2%'
        },
        {
            Header: 'Id',
            accessor: 'id'
        },
        {
            Header: 'First Name',
            accessor: 'firstName'
        },
        {
            Header: 'Name',
            width: '15%',
            accessor: 'lastName',
            Cell: ({ row }) => {
                return (
                    <div>
                        <span className="class-for-name">{row.values.firstName} </span>
                        <span className="class-for-description">{row.values.lastName}</span>
                    </div>
                )
            }
        },
        {
            Header: 'Birth Country',
            accessor: 'birthCountry',
            width: '8%',
            Cell: ({ row }) => {
                return (
                    <div>
                        <span className="class-for-name">{row.values.birthCountry.name} </span>
                    </div>
                )
            }
        },
        {
            Header: 'Date of birth',
            accessor: 'dateOfBirth',
            width: '9%'
        },
        {
            Header: 'Current Points',
            accessor: 'currentPoints',
            width: '10%'
        },
        {
            Header: 'Live Points',
            accessor: 'livePoints',
            width: '9%'
        }
    ];

    changeCountryValue = (value) => {
        this.birthCountry = value;
    }

    rowClickAction = (value) => {
        this.props.find_player(value.id);
    }

    render() {
        return (
            <>
                <h2 id="playersTitle">Players</h2>
                <div className="row">
                    <div className="col-md-3">
                        <label htmlFor="firstName">First Name</label>
                        <input id="search" className="form-control" type="text" name="firstName" ref={this.firstName} />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="lastName">Last Name</label>
                        <input id="search" className="form-control" type="text" name="lastName" ref={this.lastName} />
                    </div>
                    <div className="col-md-5">
                        <SyncSelect name='birthCountry' label='Birth Country' changeFieldValue={this.changeCountryValue}
                            url='country' getLabel={country => country.name} getValue={country => country} />
                    </div>
                    <div className="col-md-1">
                        <button id="searchButton" className="btn btn-primary" onClick={() => this.search()}>Search</button>
                    </div>
                </div >
                {this.props.players ? <BasicTable id="players" columns={this.columns} data={this.props.players}
                    hiddenColumns={['id', 'firstName']} action={this.changePage} rowClickAction={this.rowClickAction} /> : ''}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        players: state.player.foundPlayers,
    };
};

export default connect(mapStateToProps, { get_players, find_player })(AllPlayers);