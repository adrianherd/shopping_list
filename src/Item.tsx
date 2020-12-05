type ItemProps = {
    text: string,
    quantity?: number,
    price?: number,
}

export function Item({text, quantity, price} : ItemProps) {
    return (
        <div>
            <p>{text}</p>
            <Quantity q={quantity} />
            <Price p={price} />
        </div>
    )
}

function Quantity(props: {q?: number}) {
    if(props.q){
       return <p>Quantity: {props.q}</p>
    }
    return null;
}

function Price(props: {p?: number}) {
    if(props.p){
        return <p>Price: {props.p}</p>
    }
    return null
}