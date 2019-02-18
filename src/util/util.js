export const getAccessString = () => {
    return "Bearer " + sessionStorage.getItem("token")
}