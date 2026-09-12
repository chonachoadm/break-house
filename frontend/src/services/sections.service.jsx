import { useApi } from "./api.service";

export const useSectionsService = () => {
    const { call } = useApi();

    const getSections = () => call("/sections")
    const getById = (id) => call(`/sections/${id}`, "GET")
    const createSection = (section) => call("/sections", "POST", section)
    const updateSection = (id, section) => call(`/sections/${id}`, "PATCH", section)
    const deleteSection = (id) => call(`/sections/${id}`, "DELETE")

    return { getSections, getById, createSection, updateSection, deleteSection }
};