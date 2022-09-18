import React from "react";
import { connect } from 'react-redux';
import { BasicTable } from "../../table/BasicTable";
import { get_matches, find_match, update_matches } from "../../../redux/actions";
import SyncSelect from '../../select-fields/SyncSelect';
import Dropdown from 'react-dropdown';
import './AllMatches.css';
import { TOURNAMENT_TYPE_GRAND_SLAM } from "../../../constants";

class AllMatches extends React.Component {

    constructor() {
        super();
        this.grandSlamResults = [{ value: 'Select' }, { value: '3:0' }, { value: '3:1' }, { value: '3:2' }, { value: '0:3' }, { value: '1:3' }, { value: '2:3' }, { value: '1-retired' }, { value: '2-retired' }];
        this.mastersResults = [{ value: 'Select' }, { value: '2:0' }, { value: '2:1' }, { value: '0:2' }, { value: '1:2' }, { value: '1-retired' }, { value: '2-retired' }];
        this.results = [];
    }

    componentDidMount = () => {
        this.props.get_matches();
    }

    changePage = (pagination) => {
        this.props.get_matches(pagination, this.tournament, this.firstPlayer, this.secondPlayer);
    }

    search = () => {
        this.results=[];
        const { number, size } = this.props.matches;
        const pagingValues = { number, size };
        this.props.get_matches(pagingValues, this.tournament, this.firstPlayer, this.secondPlayer);
    }

    columns = [
        {
            Header: 'Id',
            accessor: 'id'
        },
        {
            Header: 'Version',
            accessor: 'version'
        },
        {
            Header: 'Tournament',
            width: '14%',
            accessor: 'tournament',
            sortValue: 'tournament.name',
            Cell: ({ row }) => {
                return (
                    <div>
                        <span className="class-for-name">{row.values.tournament ? row.values.tournament.name : ''} </span>
                    </div>
                )
            }
        },
        {
            Header: 'First Player',
            width: '15%',
            accessor: 'firstPlayer',
            sortValue: 'firstPlayer.lastName',
            Cell: ({ row }) => {
                return (
                    <div>
                        <span className="class-for-name">{row.values.firstPlayer ? row.values.firstPlayer.firstName : ''} </span>
                        <span className="class-for-description">{row.values.firstPlayer ? row.values.firstPlayer.lastName : ''}</span>
                    </div>
                )
            }
        },
        {
            Header: 'Second Player',
            width: '15%',
            accessor: 'secondPlayer',
            sortValue: 'secondPlayer.lastName',
            Cell: ({ row }) => {
                return (
                    <div>
                        <span className="class-for-name">{row.values.secondPlayer ? row.values.secondPlayer.firstName : ''} </span>
                        <span className="class-for-description">{row.values.secondPlayer ? row.values.secondPlayer.lastName : ''}</span>
                    </div>
                )
            }
        },
        {
            Header: 'Match Date',
            width: '12%',
            accessor: 'matchDate',
            sortValue: 'matchDate',
            Cell: ({ row }) => {
                return (
                    <div>
                        <span className="class-for-name">{row.values.matchDate} </span>
                    </div>
                )
            }
        },
        {
            Header: 'Round',
            width: '11%',
            accessor: 'round',
            sortValue: 'round',
        },
        {
            Header: 'Result',
            width: '3%',
            accessor: 'result',
            sortValue: 'result',
            Cell: ({ row }) => {
                const possibleResults = row.values.tournament && row.values.tournament.tournamentType === TOURNAMENT_TYPE_GRAND_SLAM ?
                    this.grandSlamResults : this.mastersResults;

                return (
                    <>
                        {row.values.result ?
                            row.values.result :
                            <Dropdown options={possibleResults} onChange={(e) => this.changeResult(row.values, e.value)}/>
                        }
                    </>
                )
            }
        },
        {
            Header: 'Winner',
            width: '15%',
            accessor: 'winner',
            sortValue: 'winner.lastName',
            Cell: ({ row }) => {
                return (
                    <div>
                        <span className="class-for-name">{row.values.winner ? row.values.winner.firstName : ''} </span>
                        <span className="class-for-description">{row.values.winner ? row.values.winner.lastName : ''}</span>
                    </div>
                )
            }
        }
    ];


    rowClickAction = (value) => {
        this.props.find_match(value);
    }

    changeResult = (row, value, e) => {
        if (value === 'Select') {
            const index = this.results.indexOf(row);
            if (index !== -1)
                this.results.splice(index, 1);
        }
        else {
            row.result = value;
            this.results.push(row);
        }
    }

    saveMatches = () => {
        const { number, size } = this.props.matches;
        const pagingValues = { number, size };
        this.props.update_matches(pagingValues, this.tournament, this.firstPlayer, this.secondPlayer, this.results);
        this.results=[];
    }

    render() {
        return (
            <>
                <h2 className="table-title">Matches</h2>
                <div className="row">
                    <div className="col-md-3">
                        <SyncSelect name='tournament' label='Tournament' changeFieldValue={(value) => this.tournament = value} showAll={true}
                            url='tournament' getLabel={tournament => tournament.name} getValue={tournament => tournament} accessor='content' />
                    </div>
                    <div className="col-md-3">
                        <SyncSelect name='firstPlayer' label='First Player' changeFieldValue={(value) => this.firstPlayer = value} showAll={true}
                            url='player' getLabel={player => player.firstName + ' ' + player.lastName} getValue={player => player} accessor='content' />
                    </div>
                    <div className="col-md-3">
                        <SyncSelect name='secondPlayer' label='Second Player' changeFieldValue={(value) => this.secondPlayer = value} showAll={true}
                            url='player' getLabel={player => player.firstName + ' ' + player.lastName} getValue={player => player} accessor='content' />
                    </div>
                    <div className="col-md-1">
                        <button className="btn btn-primary filter-button" onClick={() => this.search()}>Search</button>
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-secondary filter-button" onClick={() => this.saveMatches()}>Save Matches</button>
                    </div>
                </div >
                {this.props.matches ? <BasicTable id="matches" columns={this.columns} data={this.props.matches}
                    hiddenColumns={['id']} action={this.changePage} rowClickAction={this.rowClickAction} /> : ''}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        matches: state.matches.foundMatches,
    };
};

export default connect(mapStateToProps, { get_matches, find_match, update_matches })(AllMatches);