import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import UserCard from '../../components/UserPage/UserCard/UserCard'
import Logo from '../../assets/torontoblizzard.png'

const test = {
    "loyalty": "123456",
    "yob": 1997,
    "u": 18,
    "name": "I am name",
    "email": "test@test.com",
    "password": "1234",
    "address": "123 test drive",
    "city": "Hamilton",
    "zip": "1ae5j7",
    "province": "On",
    "county": "Canada",
    "phone": 1234567890,
    "gender": "M"
}
class UserProfile extends Component {

    list_items = object => {
        var items = []
        for (const key in object) {
            items.push(
                <li key={key} style={{display:"flex", flexDirection:"row"}}>
                <Typography variant="subtitle1" style={{ fontWeight: "bold", width: "150px" }}>{key}:</Typography>
                <Typography variant="subtitle1">{object[key]}</Typography>

                </li>
            ) 
        }
        return items
    }


    render() {
        return (
            <UserCard width="45%" height="500px">
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    width: "100%",
                    justifyContent: "flex-start"
                }}>
                    <img src={Logo} style={{ marginLeft: "30px", marginTop: "30px",height:"150px" }} />
                    <div style={{ marginLeft: "100px", flexGrow: 1 }}>
                        <Typography align="left"
                            gutterBottom
                            variant="h3"
                            style={{ fontWeight: 500 }}>
                            Name
                        </Typography>

                        <hr
                            style={{
                                color: "#D3D3D3",
                                backgroundColor: "#D3D3D3",
                                height: 0.1
                            }}
                        />
                        <ul style={{ listStyle: "none", paddingLeft: 0,  height: 320 }}>
                            {this.list_items(test).map((item, i)=> item)}
                        </ul>
                    </div>
                </div>


            </UserCard>
        );
    }
}

export default UserProfile;