interface Product{
    id: string,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    quantity: number,
    active: boolean,
    createdAt?: Date
}

interface Cart{
    id: string,
    products: Product[],
    createdAt?: Date
    userId: string,

}

interface Bill{
    id: string,
    products: Product[],
    createdAt?: Date
    userId: string,
    amount: number,
    address: string,
    status: string,
    paymentId: string
    paymentData: JSON,
    paymentMethod: string,
    confirmed: boolean
}

interface Profile{
    userName:string,
    address:string,
    lat:number,
    long:number,
    phone:string,
    name:string,
    lastName:string
    dateOfBirth:Date,
    idNumber:number
}