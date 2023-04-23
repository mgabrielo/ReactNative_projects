import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import MovieCard from '../components/MovieCard'

const HomeScreen = () => {
    return (
        <SafeAreaView style={{ backgroundColor: '#E2DFD2', flex: 1 }}>
            <MovieCard />
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})