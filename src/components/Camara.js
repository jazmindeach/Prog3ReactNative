import React, {Component} from 'react';
import {Camera } from 'expo-camera';
import {auth, db} from '../firebase/config';
import {storage} from '../firebase/config';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

class Camara extends Component{
    constructor(props){
        super(props);
        this.state = {
            permisos: false,
            mostrarCamera: true,
            urlDos:''
       }

        this.metodosCamara = ""
    }

    componentDidMount(){
      
        Camera.requestCameraPermissionsAsync()
            .then( () =>   { this.setState({
                permisos: true
            })})
        
            .catch( e => console.log(e))
    }

    takePicture(){
     
        this.metodosCamara.takePictureAsync()
            .then( foto => {
                this.setState({
                    urlDos: foto.uri,
                    mostrarCamera: false
                })
            })
            .catch( e => console.log(e))
    }

    
    cancelar(){
        
        this.setState({
            urlDos: '',
            mostrarCamera: true
        })
    }
    
    aceptar(){
        fetch(this.state.urlDos)
    .then(res => res.blob())
            .then( img => { 
           
                const refStorage = storage.ref(`fotos/${Date.now()}.jpg`);
                refStorage.put(img)
                    .then(()=>{
                        refStorage.getDownloadURL() 
                        .then( url => this.props.onImageUpload(url))
                    })
            })
            .catch(e => console.log(e))
    }
    render(){
        return(
            <View>
            {
                this.state.permisos ? 
                this.state.mostrarCamera ?
                    <View style={styles.cuerpoImagen}>
                        <Camera
                            style={styles.cuerpoImagen}
                            type = {Camera.Constants.Type.front}
                            ref={metodosCamara => this.metodosCamara = metodosCamara }
                        />
                        <TouchableOpacity style={styles.boton} onPress={()=>this.takePicture()}>
                            <Text style= {styles.boton}>Sacarte una foto</Text>
                        </TouchableOpacity>
                    </View>
                :
                <View>
                        <TouchableOpacity style={styles.boton} onPress={()=>this.aceptar()}>
                            <Text style= {styles.boton}>Aceptar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.boton} onPress={()=>this.cancelar()}>
                            <Text style= {styles.boton}>Cancelar</Text>
                        </TouchableOpacity>
                        <Image 
                            style={styles.preview}
                            source={{uri: this.state.urlDos}}
                            resizeMode='cover'
                        />
                    </View>
                :
                    <Text>No hay permisos otorgados</Text>
            }
            </View>
        )
    }

}
const styles = StyleSheet.create({
    cuerpoImagen: {
        height: '80vh',
        width: '80vw',
    },
    boton: {
        fontSize: 14,
        margin: 10,
        borderRadius: 10,
        backgroundColor: 'rgb(234,252,255)',
        fontFamily: 'Courier',
        textAlign: 'center',
        padding: 5
    },
    preview:
    {
        height: '80vh',
        width: '80vw',
    },

}) 


export default Camara