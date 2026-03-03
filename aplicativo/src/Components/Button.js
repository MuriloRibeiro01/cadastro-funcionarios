export function Button({ onClick, texto, className }) {
    return (
        <button className={className} onClick={onClick}>{texto}</button>
    );
}