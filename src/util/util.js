const getAccessString = () => {
    return "Bearer " + sessionStorage.getItem("token")
}

const baseUrl = "http://ec2-3-16-167-88.us-east-2.compute.amazonaws.com:3000"

export {
    getAccessString,
    baseUrl
}

