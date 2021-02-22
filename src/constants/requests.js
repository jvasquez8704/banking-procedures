export const requests = {
    verifyCustomer:{
        request: {
            header: {
                system: "2283",
                user: "USERAPP",
                channel: "117",
                token: "?",
                date: "20200617",
                time: "13:10:42",
                language: "ES",
                ip: "127.0.0.1",
                transaction:"1001",
                step:"1"
            },
            data: 
            {
                    "id":null,
                    "type":"I",
                    "user":"",
                    "otp":""
            }
        }
    },
    unlockUser:{
        request: {
            header: {
                system: "2283",
                user: "USERAPP",
                channel: "117",
                token: "?",
                date: "20200617",
                time: "13:10:42",
                language: "ES",
                ip: "127.0.0.1",
                transaction:"2001",
                step:"2"
            },
            data: 
            {
                    id:"0801198707418",
                    type:"I",
                    user:"jvasque084",
                    otp:"99999999"
            }
        }
    },
    generic:{
        request: {
            header: {
                system: "2283",
                user: "USERAPP",
                channel: "117",
                token: "?",
                date: "20200617",
                time: "13:10:42",
                language: "ES",
                ip: "127.0.0.1",
                transaction:"2001",
                step:"2"
            },
            data: 
            {
                    id:null,
                    value:null
            }
        }
    }
}