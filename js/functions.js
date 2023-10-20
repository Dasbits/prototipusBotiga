import {createApp} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { getProductes } from './managmentFunctions.js';

createApp({
    data() {
        return {
            buttonMostrar: true,
            divActual:'portada',
            productes:[],
            carrito:[]
        }
    },
    methods: {
        cambiarDiv(id){
            this.divActual = id;
        },
        mostrar(id){
            return (this.divActual==id);
        },
        restarProducteT(id){
            if(this.productes[id].cont>0){
                this.productes[id].cont--;
            }
        },
        sumarProducteT(id){
            this.productes[id].cont++;
            
        },
        addCarrito(id){
            let indexEncontrado = 0;
            if(this.productes[id].cont>0){
                let trobat = false;
                if(this.carrito.length > 0){

                    let objBuscat = this.productes[id];

                    //codi per busacar
                    indexEncontrado = this.carrito.findIndex(item => item.nom.toLowerCase().trim() === this.productes[id].nom.toLowerCase().trim());
                    
                    if(indexEncontrado !== -1){
                        trobat = true;
                    }
                } 
            if(trobat){
                this.carrito[indexEncontrado].cont += this.productes[id].cont;
            }
            else{
                const productoCopia = JSON.parse(JSON.stringify(this.productes[id]));
                this.carrito.push(productoCopia);
            }
            }
            this.productes[id].cont=0;
        },
        restarProducteC(id){
            if(this.carrito[id].cont>1){
                this.carrito[id].cont--;
            }
        },
        sumarProducteC(id){
            this.carrito[id].cont++;
        },
        eliminarProducteCarrito(id){
            this.carrito.splice(id, 1);
        },
        contarCheckout(){
            let suma = 0;
            for (let i = 0; i < this.carrito.length; i++) {
            suma += this.carrito[i].precio*this.carrito[i].cont;
            }
            return suma;
        }
    },
    created(){
        getProductes().then(data => {
            this.productes=data
        });
    }
}).mount('#app');