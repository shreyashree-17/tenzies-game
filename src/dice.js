export default function Dice(props) {
    return (
    <div 
        className={props.isHeld?"held dice":"dice"} 
        onClick={props.handleClick}>
        <h2>{props.value}</h2>
    </div>
    );
 }

