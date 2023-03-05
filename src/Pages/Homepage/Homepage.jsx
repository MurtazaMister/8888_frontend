import './Homepage.css'
import Button from '../../Components/Button/Button'

function Homepage(){
    return(
        <div id="homepage">
            <div className="clock-holder">
                <div className="clock">
                    <div className="straight vertical"></div>
                    <div className="straight horizontal"></div>
                    <div className="angled one-seven"></div>
                    <div className="angled two-eight"></div>
                    <div className="angled four-ten"></div>
                    <div className="angled five-eleven"></div>
                </div>
            </div>
            <div className="buttons">
                <Button type="tag" />
                <Button type="play" />
            </div>
        </div>
    )
}

export default Homepage