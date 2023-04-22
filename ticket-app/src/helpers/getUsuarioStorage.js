export const getUsuarioStorage = () => {
    return {
        attended: localStorage.getItem('attended'),
        desktop: localStorage.getItem('desktop'),
    }
}