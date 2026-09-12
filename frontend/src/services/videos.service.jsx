import { useApi } from "./api.service";
import { useMemo } from "react";

export const useVideosService = () => {
    const { call } = useApi();

    return useMemo(() => ({
        getVideos: () => call("/videos", "GET"),
        getBySection: (sectionId) =>
            call(`/videos/section/${sectionId}`, "GET"),
        createVideo: (video) =>
            call("/videos", "POST", video),
        getById: (id) => 
            call(`/videos/${id}`, "GET"),
        updateVideo: (id, video) =>
            call(`/videos/${id}`, "PATCH", video),
        deleteVideo: (id) =>
            call(`/videos/${id}`, "DELETE")
    }), [call]);
};