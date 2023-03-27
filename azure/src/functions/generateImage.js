const {app} = require('@azure/functions');
const axios = require('axios');
const { BlobServiceClient } = require('@azure/storage-blob');

const openai = require('../../lib/openai');
const generateSASToken = require('../../lib/generateSASToken');

const accountName = process.env.ACCOUNT_NAME;
const containerName = "images";

app.http('generateImage', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const {prompt} = await request.json();

        console.log("Prompt: ", prompt);

        const response = await openai.createImage({
            prompt: prompt,
            n:1,
            size:"1024x1024"
        });

        imgUrl = response.data.data[0].url;

        const res = await axios.get(imgUrl, {responseType: 'arraybuffer'});

        const arrayBuffer = res.data;

        sasToken = await generateSASToken();
        const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net?${sasToken}`);

        const containerClient = blobServiceClient.getContainerClient(containerName);

        const timestamp = new Date().getTime();
        const fileName = `${prompt}_${timestamp}.png`;

        const blockBlobClient = containerClient.getBlockBlobClient(fileName);

        try{
            await blockBlobClient.uploadData(arrayBuffer);
            console.log("Image uploaded successfully");
        } catch (err) {
            console.log("Error uploading image: ", err);
        }
        return{body: "Image uploaded successfully"}
    },
});