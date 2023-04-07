export const convertToBase64 = (file) => {
    return new Promise((res, rej) => {
        const fr = new FileReader();
        fr.onload = () => res(fr.result);
        fr.onerror = (err) => rej(err);
        fr.readAsDataURL(file);
    });
};