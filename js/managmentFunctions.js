export async function getProductes() {
    const response = await fetch(`./productes.json`);
    const productes =  await response.json();
    return productes.productes;
}