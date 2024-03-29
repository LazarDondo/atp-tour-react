import React from "react";
import { connect } from 'react-redux';
import { BasicTable } from "../../table/BasicTable";
import { get_tournaments, find_tournament } from "../../../redux/actions";
import SyncSelect from "../../select-fields/SyncSelect";
import './AllTournaments.css';

class AllTournaments extends React.Component {

    constructor() {
        super();
        this.name = React.createRef();
        this.tournamentType = React.createRef();
        this.hostCountry={name: 'All'}
    }

    componentDidMount() {
        this.props.get_tournaments();
    }

    changePage = (pagination) => {
        this.props.get_tournaments(pagination, this.name.current.value, this.tournamentType.value);
    }

    search = () => {
        const { number, size } = this.props.tournaments;
        const pagingValues = { number, size };
        this.props.get_tournaments(pagingValues, this.name.current.value, this.tournamentType.value, this.hostCountry);
    }

    clear = () => {
        this.name.current.value = '';
        this.tournamentType.value = 'All';
        this.hostCountry = { name: 'All' };
        this.search();
    }

    columns = [
        {
            Header: 'Id',
            accessor: 'id'
        },
        {
            Header: 'Name',
            width: '10%',
            accessor: 'name',
            sortValue: 'name',
        },
        {
            Header: 'Start Date',
            width: '5%',
            accessor: 'startDate',
            sortValue: 'startDate',
        },
        {
            Header: 'Completion Date',
            width: '5%',
            accessor: 'completionDate',
            sortValue: 'completionDate',
        },
        {
            Header: 'Host Country',
            width: '8%',
            accessor: 'hostCountry',
            sortValue: 'hostCountry.name',
            Cell: ({ row }) => {
                return (
                    <div>
                        <span className="class-for-name">{row.values.hostCountry.name} </span>
                    </div>
                )
            }
        },
        {
            Header: 'Type',
            width: '7%',
            accessor: 'tournamentType',
            sortValue: 'tournamentType',
        }
    ];

    changeCountryValue = (value) => {
        this.hostCountry = value;
        this.search();
    }

    rowClickAction = (value) => {
        this.props.find_tournament(value.id);
    }


    render() {

        return (
            <>
                <h2 id="table-title">Tournaments</h2>
                <div className="row">
                    <div className="col-md-4">
                        <label htmlFor="name">Name</label>
                        <input id="searchByName" className="form-control" type="text" name="name" ref={this.name} onChange={() => this.search()} />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="tournamentType">Type</label>
                        <select id="searchByType" className="form-control" type="text" name="tournamentType" onChange={() => this.search()} ref={input => this.tournamentType = input}>
                            <option key='All'>All</option>
                            {
                                this.props.tournamentTypes.map((tournamentType) =>
                                    <option key={tournamentType.value}>{tournamentType.label}</option>)
                            }
                        </select>
                    </div>
                    <div className="col-md-4">
                        <SyncSelect id="hostCountry" name='hostCountry' label='Host Country' changeFieldValue={this.changeCountryValue} value={this.hostCountry}
                            url='country' getLabel={country => country.name} getValue={country => country} showAll={true} />
                    </div>
                    <div className="col-md-1">
                        <button className="btn btn-secondary filter-button" onClick={() => this.clear()}>Clear</button>
                    </div>
                </div >
                {this.props.tournaments ? <BasicTable id="tournaments" columns={this.columns} data={this.props.tournaments}
                    hiddenColumns={['id']} action={this.changePage} rowClickAction={this.rowClickAction} /> : ''}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tournaments: state.tournament.foundTournaments,
    };
};

export default connect(mapStateToProps, { get_tournaments, find_tournament })(AllTournaments);