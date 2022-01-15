var activeUser = localStorage.getItem("tokenLogin")


async function fetchLikedAdds(activeUser) {
    try {
        const response = await fetch("https://localhost:5001/Adds/GetLikedAdds/"+ activeUser,{
            method: 'GET'
        });
        const adds = await response.json();
        return adds;
    } catch (error) {
        console.error(error);
    }
}