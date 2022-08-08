import React from "react";
import { connect } from 'react-redux';
import { BasicTable } from "../../table/BasicTable";
import { get_players, find_player } from "../../../redux/actions";
import SyncSelect from '../../select-fields/SyncSelect';
import './AllPlayers.css';


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
        this.props.get_players(pagination, this.firstName.current.value, this.lastName.current.value, this.birthCountry);
    }

    search = () => {
        const { number, size } = this.props.players;
        const pagingValues = { number, size };
        this.props.get_players(pagingValues, this.firstName.current.value, this.lastName.current.value, this.birthCountry);
    }

    clear = () => {
        this.firstName.current.value = '';
        this.lastName.current.value = '';
        this.birthCountry={name: 'All'}
        this.search();
    }

    columns = [
        {
            Header: 'Rank',
            width: '2%',
            accessor: 'rank',
            sortValue: 'rank'
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
            sortValue: 'lastName',
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
            width: '8%',
            accessor: 'birthCountry',
            sortValue: 'birthCountry.name',
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
            width: '9%',
            accessor: 'dateOfBirth',
            sortValue: 'dateOfBirth',
        },
        {
            Header: 'Current Points',
            width: '10%',
            accessor: 'currentPoints',
            sortValue: 'currentPoints',
        },
        {
            Header: 'Live Points',
            width: '9%',
            accessor: 'livePoints',
            sortValue: 'livePoints',
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
                <h2 className="table-title">Players</h2>
                <div className="row">
                    <div className="col-md-3">
                        <label htmlFor="firstName">First Name</label>
                        <input id="searchFirstName" className="form-control" type="text" name="firstName" ref={this.firstName} />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="lastName">Last Name</label>
                        <input id="searchLastName" className="form-control" type="text" name="lastName" ref={this.lastName} />
                    </div>
                    <div className="col-md-4">
                        <SyncSelect name='birthCountry' label='Birth Country' changeFieldValue={this.changeCountryValue}
                            url='country' getLabel={country => country.name} getValue={country => country} showAll={true}/>
                    </div>
                    <div className="col-md-1">
                        <button className="btn btn-primary filter-button" onClick={() => this.search()}>Search</button>
                    </div>
                    <div className="col-md-1">
                        <button className="btn btn-secondary filter-button" onClick={() => this.clear()}>Clear</button>
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