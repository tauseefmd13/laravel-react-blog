import axios from "axios";

const Category = {
    getAll: () => {
        return axios.get('/categories?all=1');
    },
    getById: (id) => {
        return axios.get('/categories/' + id);
    }
};

export default Category;