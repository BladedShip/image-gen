const {
  BlobServiceClient,
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
  BlobSASPermissions,
} = require("@azure/storage-blob");

const accountName = process.env.ACCOUNT_NAME;
const accountKey = process.env.ACCOUNT_KEY;
const containerName = "images";

const sharedKeyCredential = new StorageSharedKeyCredential(
  accountName,
  accountKey
);

const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    sharedKeyCredential
);

async function generateSASToken() {
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const permissions = new BlobSASPermissions();
    permissions.read = true;
    permissions.write = true;
    permissions.create = true;

    const expiresOn = new Date();
    expiresOn.setMinutes(expiresOn.getMinutes() + 30);

    const sasToken = generateBlobSASQueryParameters(
        {
            containerName:containerClient.containerName,
            permissions:permissions.toString(),
            expiresOn:expiresOn,
        },
        sharedKeyCredential
    ).toString();

    return sasToken;
}

module.exports = generateSASToken;

