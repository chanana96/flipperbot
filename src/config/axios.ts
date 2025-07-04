import axios from "axios";

const baseURL = "https://prices.runescape.wiki/api/v1/osrs";

export const api = axios.create({
    baseURL,
});
