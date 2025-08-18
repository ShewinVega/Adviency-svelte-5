const api = {
    gifts: {
        getAll: async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            return JSON.parse(window.localStorage.getItem('gifts') || '[]');
        }
    }
}

export default api;
