import React from "react";
import { connect } from 'react-redux';
import { BasicTable } from "../../table/BasicTable";
import { get_matches, find_match } from "../../../redux/actions";
import SyncSelect from '../../select-fields/SyncSelect';
import './AllMatches.css';


class AllMatches extends React.Component {

    componentDidMount = () => {
        this.props.get_matches();
    }

    changePage = (pagination) => {
        this.props.get_matches(pagination, this.tournament, this.firstPlayer, this.secondPlayer);
    }

    search = () => {
        const { number, size } = this.props.matches;
        const pagingValues = { number, size };
        this.props.get_matches(pagingValues, this.tournament, this.firstPlayer, this.secondPlayer);
    }

    columns = [
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
            width: '10%',
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

    render() {
        return (
            <>
                <h2 className="table-title">Matches</h2>
                <div className="row">
                    <div className="col-md-4">
                        <SyncSelect name='tournament' label='Tournament' changeFieldValue={(value) => this.tournament=value}
                            url='tournament' getLabel={tournament => tournament.name} getValue={tournament => tournament} accessor='content' />
                    </div>
                    <div className="col-md-3">
                        <SyncSelect name='firstPlayer' label='First Player' changeFieldValue={(value) => this.firstPlayer=value}
                            url='player' getLabel={player => player.firstName + ' ' + player.lastName} getValue={player => player} accessor='content' />
                    </div>
                    <div className="col-md-3">
                        <SyncSelect name='secondPlayer' label='Second Player' changeFieldValue={(value) => this.secondPlayer=value}
                            url='player' getLabel={player => player.firstName + ' ' + player.lastName} getValue={player => player} accessor='content' />
                    </div>
                    <div className="col-md-1">
                        <button className="btn btn-primary filter-button" onClick={() => this.search()}>Search</button>
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

export default connect(mapStateToProps, { get_matches, find_match })(AllMatches);