import AllPlayers from './all/AllPlayers';
import SavePlayer from './save/SavePlayer';

const Player = () => {
    return (
        <div className='row' style={{ width: '1200px' }}>
            <div className='col-md-10'>
                <AllPlayers />
            </div>
            < div className='col-md-2' >
                <SavePlayer />
            </div >
        </div >
    );
}

export default Player;