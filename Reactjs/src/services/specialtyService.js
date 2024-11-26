import axios from "../axios";

// READ operations
const getDetailSpecialtyById = (data) => {
    return axios.get(
      `/api/get-detail-specialty-by-id?id=${data.id}&location=ALL`
    );
};

const filterSpecialties = (data) => {
    return axios.post("/api/filter-specialties", data);
};

// WRITE operations
const udateSpecialtyData = (data) => {
    return axios.post("/api/edit-specialty", data);
};

const deleteSpecialty = (data) => {
    return axios.get(
      `/api/delete-specialty?id=${data.id}`
    );
};

export {
    // READ operations
    getDetailSpecialtyById,
    filterSpecialties,
    // WRITE operations
    udateSpecialtyData,
    deleteSpecialty
};