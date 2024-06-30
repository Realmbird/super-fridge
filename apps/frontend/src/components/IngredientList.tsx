
    export const Ingredients = ({list} : {list: string[]}) => {
    return (
        <>
            <h3>Ingredients</h3>
            {list.map((name) =>  <li>{name}</li>)}
        </>
    );
}