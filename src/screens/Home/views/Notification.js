import {View, Text, Image} from 'react-native';
import React from 'react';
import ThemeHeaderWrapper from '../../../components/ThemeHeaderWrapper';
import {Divider, FlatList, Flex} from 'native-base';
import {notifications} from '../../../constants/Constants';
import {gs} from '../../../../GlobalStyles';
import {ScaledSheet} from 'react-native-size-matters';
import {ts} from '../../../../ThemeStyles';

export default function Notification({navigation}) {
  const renderNotifications = ({item, index}) => {
    return (
      <View style={[gs.mv10]}>
        <Flex
          direction="row"
          style={[{backgroundColor: (index == 0 || index == 1) && '#eee'},gs.p5]}>
          <View>
            <Image source={item.img} style={styles.img} />
          </View>
          <View style={{width: '85%', marginLeft: 15}}>
            <Flex direction="row" justify="space-between">
              <Text style={[styles.name, gs.fs15]}>{item.name}</Text>
              <Text style={[styles.date, gs.fs11]}>{item.date}</Text>
            </Flex>
            <Text style={[{...styles.date, color: ts.secondary}, gs.fs11]}>
              {item.username}
            </Text>
            <Text style={[{...styles.date, lineHeight: 15}, gs.fs11]}>
              {item.detail}
            </Text>
          </View>
        </Flex>
        <Divider style={[gs.mt15]} />
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ThemeHeaderWrapper
        lefttxt="Notification"
        righttxt="Mark all as read"
        goBack={() => navigation.goBack()}
      />
      <FlatList
        data={notifications}
        renderItem={renderNotifications}
        keyExtractor={(item, index) => String(index)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[gs.ph15, gs.mv15]}
      />
    </View>
  );
}
const styles = ScaledSheet.create({
  img: {
    height: '35@ms',
    width: '35@ms',
    resizeMode: 'cover',
    borderRadius: '50@ms',
  },
  name: {
    fontFamily: ts.secondaryregular,
    lineHeight: '20@ms',
    color: ts.primarytext,
  },
  date: {
    fontFamily: ts.secondaryregular,
    lineHeight: '20@ms',
    color: ts.secondarytext,
  },
});
