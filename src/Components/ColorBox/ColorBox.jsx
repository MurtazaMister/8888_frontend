import './ColorBox.css'

function ColorBox({color}){

    return (
        <div className="colorbox" style={{background:color, borderRadius: '50%'}}>

        </div>
    );
}

export default ColorBox;