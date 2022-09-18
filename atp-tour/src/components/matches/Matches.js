import AllMatches from './all/AllMatches';
import SaveMatch from './save/SaveMatch';


const Match = () => {
    return (
        <div className='row' style={{ width: '1200px' }}>
            <div className='col-md-10'>
                <AllMatches />
            </div>
            < div className='col-md-2' >
                <SaveMatch/>
            </div >
        </div >
    );
}

export default Match;