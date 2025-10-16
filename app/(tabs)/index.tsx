import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Block, Text, theme } from 'galio-framework';
import React from 'react';
import { Alert, Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('screen');
const cardWidth = (width - theme.SIZES.BASE * 2 - theme.SIZES.BASE) / 2;
const eventImage = require('../../assets/images/events-concept-on-black-background_219043-original.jpg');

const data = [
  {
    title: 'LZ WORLD TOUR',
    subTitle: 'LZ World Tour, the home of the wildest drift events at Castle...',
    image: eventImage,
    horizontal: true
  },
  {
    title: 'HALLOWEEN ACTION DAY',
    subTitle: 'Halloween Action Day is the the spooky show season send-off',
    image: eventImage,
  },
  {
    title: 'CHRISTMAS MARKET',
    subTitle: 'Step into the magic of the season at the Castle Combe Circuit...',
    image: eventImage,
  },
  {
    title: 'HALLOWEEN ACTION DAY',
    subTitle: 'Halloween Action Day is the the spooky show season send-off',
    image: eventImage,
  },
  {
    title: 'CHRISTMAS MARKET',
    subTitle: 'Step into the magic of the season at the Castle Combe Circuit...',
    image: eventImage,
  },

];

const Card = ({ item, horizontal, full, style }) => (
  <Block style={[styles.card, horizontal && styles.horizontalCard, full && styles.fullCard, style]}>
    <Image source={item.image} style={horizontal ? styles.horizontalImage : styles.cardImage} />
    <Block style={styles.cardContent}>
      <Block>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSubTitle}>{item.subTitle}</Text>
      </Block>
      <TouchableOpacity onPress={() => Alert.alert('Coming Soon')}>
        <Text style={styles.cardLink}>View Event</Text>
      </TouchableOpacity>
    </Block>
  </Block>
);

export default function HomeTab() {
  return (
    <Block flex center style={styles.home}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
        <Text h5 style={styles.eventTitle}><FontAwesome name="circle" size={18} color="#0080c9" /> LIVE EVENTS</Text>
        <Block flex>
          <Card item={data[0]} horizontal />
          <Card item={data[0]} horizontal />
          <Text h5 style={styles.eventTitle}><FontAwesome name="calendar" size={18} color="#0080c9" /> NEXT UPCOMMING EVENTS</Text>
          <Block flex row>
            <Card item={data[1]} style={{ marginRight: theme.SIZES.BASE, width: cardWidth }} />
            <Card item={data[2]} style={{ width: cardWidth }} />
          </Block>
          <Text h5 style={styles.eventTitle}><FontAwesome name="list" size={18} color="#0080c9" /> OTHER EVENTS</Text>
          <Card item={data[3]} horizontal />
          <Card item={data[4]} full />
        </Block>
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: theme.SIZES.BASE,
  },
  horizontalCard: {
    flexDirection: 'row',
    height: 120,
  },
  fullCard: {
    width: '100%',
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  horizontalImage: {
    width: 120,
    height: '100%',
  },
  cardContent: {
    flex: 1,
    padding: theme.SIZES.BASE,
    justifyContent: 'space-between'
  },
  cardTitle: {
    fontSize: 12,
    color: '#333',
    fontWeight: 'bold'
  },
  cardSubTitle: {
    fontSize: 11,
    color: '#333',
    marginTop: 2
  },
  cardLink: {
    color: '#0080c9',
    fontSize: 12,
    marginTop: 5,
  },
  eventTitle: {
    paddingTop: 5,
    paddingBottom: 20,
    fontWeight: '600',
    fontSize: 18
  }
});
