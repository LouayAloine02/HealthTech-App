/* eslint-disable prettier/prettier */
import React from 'react';
import { Dimensions } from 'react-native';
import { Image, View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import {
    Container,
    Card,
    UserInfo,
    UserImgWrapper,
    UserImg,
    UserInfoText,
    UserName,
    PostTime,
    MessageText,
    TextSection,
} from '../styles/MessageStyles';

const Messages = [
    {
        id: '1',
        userName: 'Jenny Doe',
        userImg: require('../images/profile.png'),
        messageTime: '4 mins ago',
        messageText:
            'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
        id: '2',
        userName: 'John Doe',
        userImg: require('../images/profile.png'),
        messageTime: '2 hours ago',
        messageText:
            'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
        id: '3',
        userName: 'Ken William',
        userImg: require('../images/profile.png'),
        messageTime: '1 hours ago',
        messageText:
            'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
        id: '4',
        userName: 'Selina Paul',
        userImg: require('../images/profile.png'),
        messageTime: '1 day ago',
        messageText:
            'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
        id: '5',
        userName: 'Christy Alex',
        userImg: require('../images/profile.png'),
        messageTime: '2 days ago',
        messageText:
            'Hey there, this is my test for a post of my social app in React Native.',
    },
];
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
const MessagesScreen = ({ navigation }) => {
    return (
        <View style={[styles.containe, {
            // Try setting flexDirection to "row".
            flexDirection: "column"
        }]}>



            <View style={{ flex: 0.8, backgroundColor: "#5B779F", flexDirection: "row" }} >
                <TouchableOpacity onPress={() => navigation.navigate('Admin')}>
                    <Image style={{ marginTop: height * 0.04, marginLeft: width * 0.02 }}
                        source={require('../images/symb.png')} />
                </TouchableOpacity>

            </View>
            <View style={[{ flex: 7, backgroundColor: "#FAE7E6", marginLeft: 20, marginRight: 20,marginTop:15, borderRadius: 20, borderColor: '#FAE7E6' }, { flexDirection: "column" }]}>

            <Container >
                <FlatList
                    data={Messages}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        
                       <TouchableOpacity>
                         <Card onPress={() => navigation.navigate('Chat', { userName: item.userName })}>
                            <UserInfo>
                                <UserImgWrapper>
                                    <UserImg source={item.userImg} />
                                </UserImgWrapper>
                                <TextSection>
                                    <UserInfoText>
                                        <UserName>{item.userName}</UserName>
                                        <PostTime>{item.messageTime}</PostTime>
                                    </UserInfoText>
                                    <MessageText>{item.messageText}</MessageText>
                                </TextSection>
                            </UserInfo>
                        </Card>
                       </TouchableOpacity>
                    )}
                />
            </Container>
            </View>
        </View>
    );
};

export default MessagesScreen;

const styles = StyleSheet.create({
    containe: {
        flex: 1

    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});