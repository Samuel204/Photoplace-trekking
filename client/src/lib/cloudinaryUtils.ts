import { CloudinaryImage } from '@cloudinary/url-gen/assets/CloudinaryImage';
import { quality, format } from '@cloudinary/url-gen/actions/delivery';
import { auto } from '@cloudinary/url-gen/qualifiers/quality';
import { scale } from '@cloudinary/url-gen/actions/resize';

export const getCloudinaryImage = (
    publicId: string,
    options: {
        qualityLevel?: string,
        maxWidth?: number,
        isLazy?: boolean
    } = {}
): CloudinaryImage => {
    const {
        qualityLevel = 'auto',
        maxWidth = 1920,  // Default max width for responsive images
        isLazy = true     // Default to lazy loading
    } = options;

    return new CloudinaryImage(publicId, { cloudName: 'dfurhhwta' })
        .delivery(quality(qualityLevel.replace('q_', '')))  // Optimize quality
        .delivery(format(auto()))  // Automatic best format
        .resize(scale().width(maxWidth))  // Responsive width scaling
        .addTransformation(isLazy ? 'c_scale,f_auto,q_auto:low' : '');  // Additional optimization for lazy loading
}
