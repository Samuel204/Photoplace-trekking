import { Cloudinary } from "@cloudinary/url-gen";

const cloudinary = new Cloudinary({
    cloud: {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dfurhhwta'
    },
    url: {
        secure: true
    }
});

export default cloudinary;