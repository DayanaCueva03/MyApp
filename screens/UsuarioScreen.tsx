import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../config/Config'
import { ref, set, onValue } from "firebase/database";


export default function UsuarioScreen() {
    const [cedula, setcedula] = useState("")
    const [nombre, setnombre] = useState("")
    const [correo, setcorreo] = useState("")
    const [comentario, setcomentario] = useState("")


    const [usuario, setusuario] = useState([])

    /// crear guardar informacion 
    
    function guardarUsuario(cedula: string, nombre: string, correo: string, comentario: string) {
        set(ref(db, 'usuarios/' + cedula), {
         name: nombre,
          email: correo,
          coment: comentario,
          
        });
       Alert.alert("Mensaje", "Informacion Guardada")

       setcedula('')
       setnombre('')
       setcorreo('')
       setcomentario('')

      }

      useEffect(()=>{

      const starCountRef = ref(db, 'usuarios/');
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  console.log(data)


  const dataTemp : any = Object.keys(data).map((key)=> ({
    key, ...data[key]
  }) ) 

  //console.log(dataTemp);
  setusuario(dataTemp)
  
});
},[])

type Usuario={
    name: string
}

    
  return (
    <View style={styles.container}>
      <Text>USUARIOS</Text>
      <TextInput placeholder='Ingresar cedula 'style={styles.txt} onChangeText={(texto)=>setcedula(texto)} value={cedula} keyboardType='numeric'/>
      <TextInput placeholder='Ingresar nombre ' style={styles.txt} onChangeText={(texto)=>setnombre(texto)} value={nombre}/>
      <TextInput placeholder='Ingresar correo 'style={styles.txt} onChangeText={(texto)=>setcorreo(texto)} value={correo} keyboardType='email-address'/>
      <TextInput placeholder='Ingresar comentario 'style={styles.txt} onChangeText={(texto)=>setcomentario(texto)} value={comentario} multiline/>
     
      <Button title='guardar' onPress={()=> guardarUsuario(cedula,nombre,correo,comentario)}/>
    
    <FlatList 
    data= {usuario}
    renderItem={({item}:{item: Usuario})=>
        <View>
    <Text> {item.name}</Text>
    </View>
    }
    />


    </View>

  )

}

const styles = StyleSheet.create({container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, txt:{
    backgroundColor:'#b81e1e',
    height:50,
    width:"80%",
    margin:40,

  }

})