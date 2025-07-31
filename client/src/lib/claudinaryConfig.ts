import { Cloudinary } from "@cloudinary/url-gen";

const cloudinary = new Cloudinary({
    cloud: {
        cloudName: 'dfurhhwta'
    },
    url: {
        secure: true
    }
});

export default cloudinary;