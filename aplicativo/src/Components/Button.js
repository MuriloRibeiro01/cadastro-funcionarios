export function Button({ onClick, texto }) {
    return (
        <button onClick={onClick}>{texto}</button>
    );
}