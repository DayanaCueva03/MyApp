import { Alert, Button, FlatList, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
//-- FIREBASE
import { ref, set, onValue, remove, update } from "firebase/database";
import { db } from '../config/Config'
import Tarjeta from '../components/Tarjeta';

export default function UsuarioScreen() {
    const [cedula, setcedula] = useState("")
    const [nombre, setnombre] = useState("")
    const [correo, setcorreo] = useState("")
    const [comentario, setcomentario] = useState("")
    const [editando, seteditando] = useState(false)

    const [usuarios, setusuarios] = useState([])

    //-------- GUARDAR ----------//
    function guardarUsuario() {
        if (editando) {
            editar(cedula);
        } else {
            set(ref(db, 'usuarios/' + cedula), {
                name: nombre,
                email: correo,
                coment: comentario
            });
            Alert.alert("Mensaje", "Información guardada")
        }

        limpiarCampos();
    }

    // ---- LEER --------------------//
    useEffect(() => {
        const starCountRef = ref(db, 'usuarios/');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            //console.log(data);

            const dataTemp: any = Object.keys(data).map((key) => ({
                key, ...data[key]
            }));

            console.log(dataTemp);
            setusuarios(dataTemp)
        });

    }, [])

    // Editar
    function editar(id: string) {
        update(ref(db, 'usuarios/' + id), {
            name: nombre,
            email: correo,
            coment: comentario
        });
        Alert.alert("Mensaje", "Información actualizada")
        seteditando(false);
    }

    function editar2(item: any) {
        setcedula(item.key)
        setnombre(item.name)
        setcorreo(item.email)
        setcomentario(item.coment)
        seteditando(true);
    }

    // Cancelar 
    function cancelarEdicion() {
        limpiarCampos();
        seteditando(false);
    }

    // Eliminar
    function eliminar(id: string) {
        remove(ref(db, 'usuarios/' + id))
    }

    function limpiarCampos() {
        setcedula('')
        setnombre('')
        setcorreo('')
        setcomentario('')
    }

    type Usuario = {
        name: string
        key: string
    }

    return (
        <View style={styles.container}>
            <Text>USUARIOS</Text>
            <TextInput
                placeholder='Ingresar cédula'
                style={styles.txt}
                onChangeText={(texto) => setcedula(texto)}
                value={cedula}
                keyboardType='numeric'
                editable={!editando} // No editable durante la edición
            />

            <TextInput
                placeholder='Ingresar nombre'
                style={styles.txt}
                onChangeText={(texto) => setnombre(texto)}
                value={nombre}
            />
            <TextInput
                placeholder='Ingresar correo'
                style={styles.txt}
                onChangeText={(texto) => setcorreo(texto)}
                keyboardType='email-address'
                value={correo}
            />
            <TextInput
                placeholder='Ingresar comentario'
                style={styles.txt}
                onChangeText={(texto) => setcomentario(texto)}
                value={comentario}
                multiline
            />
            <Button title={editando ? 'Editar' : 'Guardar'} onPress={guardarUsuario} />
            {editando && <Button title='Cancelar' onPress={cancelarEdicion} />}

            <FlatList
                data={usuarios}
                renderItem={({ item }: {item:Usuario}) =>
                    <View>
                        <Tarjeta usuario={item} />

                        <View style={{ flexDirection: 'row' }}>
                            <Button title='Editar' color={'green'} onPress={() => editar2(item)} />
                            <Button title='Eliminar' color={'red'} onPress={() => eliminar(item.key)} />
                        </View>
                    </View>
                }
            />
            <StatusBar />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        backgroundColor: '#b3caa5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txt: {
        backgroundColor: '#a6a6fc',
        height: 50,
        width: "80%",
        margin: 4,
        fontSize: 20
    }
})
