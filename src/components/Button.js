import '../App.css';

function Button({ setSavedAmount, transfer }) {
    return (
        <button type="button" onClick={() => transfer()}>Transfer</button>
    )
}

export default Button;