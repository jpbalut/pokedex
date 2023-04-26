import { StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParams } from '../navigator/StackNavigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInImage } from '../components/FadeInImage';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonDetails } from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'>{}

export const PokemonScreen = ({navigation, route}:Props) => {
   const {simplePokemon, color} = route.params
   const {name, id, picture} = simplePokemon
   const {top} = useSafeAreaInsets()
  const {isLoading, pokemon: pokemonFull}=usePokemon(id)
  console.log(pokemonFull)

  return (
    <View style={{flex:1}}>
      {/* HEADER CONTAINER */}
      <View style={{
      ...styles.headerContainer,
      backgroundColor: color,
      }}>
        {/* BackButton */}
        <TouchableOpacity
          onPress={() => navigation.pop()}
          activeOpacity={0.5}
          style = {{...styles.backButton, top: top+5}}
        >
          <Icon name = "arrow-back-outline" color = 'white'  size={35}/>
        </TouchableOpacity>
        {/* Pokemon Name */}
        <Text
          style={{...styles.pokemonName, top: top +40}}
        >{name + '\n'} #{id}</Text>

        {/* Pokebola Blance */}
        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={styles.pokeball}
        />

        <FadeInImage
          uri={picture}
          style={styles.pokemonImage}
        />
        </View>
        {/* Detalles y loadng */}
        { isLoading ? (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator color={color} size={50}/>
          </View> )
          : ( <PokemonDetails pokemon={pokemonFull}/>)}
        
    </View>
    
  )
}

const styles = StyleSheet.create({
    headerContainer: {
      height: 370,
      zIndex: 999,
      alignItems: 'center',
      borderBottomRightRadius: 1000,
      borderBottomLeftRadius: 1000,
    },
    backButton:{
      position: 'absolute',
      left: 20,
    },
    pokemonName: {
      color: 'white',
      fontSize: 40,
      alignSelf: 'flex-start',
      left: 20,
    },
    pokeball: {
      width: 250,
      height: 250,
      bottom: -20,
      opacity: 0.7
    },
    pokemonImage:{
      width: 250,
      height: 250,
      position: 'absolute',
      bottom: -15
    },
    loadingIndicator:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'

    }
});
