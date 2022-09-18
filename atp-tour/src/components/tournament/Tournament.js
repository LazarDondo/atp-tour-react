import { TOURNAMENT_TYPE_GRAND_SLAM, TOURNAMENT_TYPE_MASTERS_1000 } from '../../constants';
import AllTournaments from './all/AllTournaments';
import SaveTournament from './save/SaveTournament';

const Tournament = () => {
    const tournamentTypes = [
        { label: 'Grand Slam', value: TOURNAMENT_TYPE_GRAND_SLAM },
        { label: 'Masters 1000', value: TOURNAMENT_TYPE_MASTERS_1000 }
    ];

    return (
        <div className='row' style={{ width: '1200px' }}>
            <div className='col-md-10'>
                <AllTournaments tournamentTypes={tournamentTypes}/>
            </div>
            < div className='col-md-2' >
                <SaveTournament tournamentTypes={tournamentTypes}/>
            </div >
        </div >
    );
}

export default Tournament;