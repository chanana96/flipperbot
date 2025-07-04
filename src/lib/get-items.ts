import { api } from "../config/axios";

export const getItems = async () => {
    try {
        const response = (await api.get("latest")).data;
        return response;
    } catch (e) {
        console.error(e);
        throw e;
    }
};
