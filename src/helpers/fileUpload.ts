import { ICloudResponse } from "../interfaces";

export const fileUpload = async( file: Blob ) => {
    if( !file ) throw new Error('No hay ningun archivo a subir');
    
    const cloudURL = 'https://api.cloudinary.com/v1_1/udemy-cursos-marlon/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {
        const resp = await fetch(cloudURL, {
            method: 'POST',
            body: formData
        });

        if (!resp.ok) {
            throw new Error('No se pudo subir ninguna imagen');
        }

        const cloudResp = await resp.json() as ICloudResponse;
        return cloudResp.secure_url;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}