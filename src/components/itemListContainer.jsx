import React, { useEffect, useState } from "react"
import itemsData from "../data/data";
import ItemList from "./ItemList";
import firestoreDB from "../services/firebase"
import { getDocs, collection, snapshotEqual, query, where } from "firebase/firestore";
import Item from "./Item";
import { useParams } from "react-router-dom"


export default function ItemListContainer(props) {

    
    const idCatURL = useParams().idcat;


    function getProductos() {
        return new Promise( (resolve) => {
            const ProductsCollection = collection(firestoreDB, "products");

            getDocs(ProductsCollection).then( snapshot => {
                const docsData = snapshot.docs.map( doc =>{ 
                    return{ ...doc.data(), id: doc.id}
                });
                resolve(docsData)
            })

        });
    };

    const getProductosByCategory = (idCatURL) => {
        return new Promise( (resolve) => {
            const ProductsCollection = collection(firestoreDB, "products");
    
            const q = query(ProductsCollection, where("category", "==", idCatURL))

            getDocs(q).then( snapshot => {
                const docsData = snapshot.docs.map( doc =>{ 
                    return{ ...doc.data(), id: doc.id}
                });
                resolve(docsData)
            })

        });
    }
    
    const [datos, setDatos] = useState([])


        useEffect(() => {
            getProductos().then((respuesta) => {
                console.log(respuesta)
                if (idCatURL === undefined) {
                    setDatos(respuesta)
                }
                else {
                    getProductosByCategory(idCatURL).then((respuesta) => {
                        setDatos(respuesta)
                    })
                }
            });
        }, []);
      return (
            <div>
                {
                    datos.map( (product) => {
                        return (
                            <Item key={product.id} 
                            id={product.id} 
                            name={product.name} 
                            price={product.price} 
                            data={product.data}
                            stock={product.stock}
                            ></Item>
                        )
                    }
                )}
            </div>
    
        )
    }
    
