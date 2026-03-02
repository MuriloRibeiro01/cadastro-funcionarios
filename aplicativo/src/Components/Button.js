export function Button(props) {
    return (
        <button onClick={props.onClick}>{props.texto}</button>
    );
}