//USE ENV VARIABLES PLZ
const test = {
    jwtSecret: "MyS3cr3tK3Y",
    jwtSession: {
        session: false //b/c using jwt
    }
}

module.export = () => { 
    console.log("HERE")
    return test
}