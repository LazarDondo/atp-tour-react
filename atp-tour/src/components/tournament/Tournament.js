import AllTournaments from './all/AllTournaments';
import SaveTournament from './save/SaveTournament';

const Tournament = () => {
    return (
        <div className='row' style={{ width: '1200px' }}>
            <div className='col-md-10'>
                <AllTournaments />
            </div>
            < div className='col-md-2' >
                <SaveTournament />
            </div >
        </div >
    );
}

export default Tournament;