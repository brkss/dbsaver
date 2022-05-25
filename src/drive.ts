//

import fs from "fs";
import readline from "readline";
import path from "path";
import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/drive.metadata.readonly"];
const TOKEN_PATH = "token.json";

// runner !
export const run = () => {
  try{
    const credentials = fs.readFileSync(path.join(__dirname, "../credentials.json"));
    authorize(JSON.parse(credentials.toString()), null);
  }catch(e){
    console.log("Something went wrong trying to read credentials.json !");
  }
};

const authorize = async (credentials: any, callback: any) => {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  try {
    const token = fs.readFileSync(TOKEN_PATH);
    oAuth2Client.setCredentials(JSON.parse(token.toString()));
  }catch(e){
    console.log("NO TOKEN !");
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });
    console.log("Authorize this app by visiting this url:", authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question("Enter the code from that page here: ", async (code: any) => {
    rl.close();  
      const res = await oAuth2Client.getToken(code);
      if(res){
        
      }
      //getAccessToken(oAuth2Client);
    });
  }

};

const getAccessToken = (oAuth2Client: any, callback: any) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code: any) => {
    rl.close();
    
    oAuth2Client.getToken(code, (err: any, token: any) => {
      if (err) return console.error("Error retrieving access token", err);
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err: any) => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
};

/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */

const uploadFile = (auth: any, filename: string, content: Buffer) => {
  //const fileMetaData = { name: `backup/${filename}`};
  //const media = {body: content};
  const drive = google.drive({ version: "v3", auth });
  var fileMetadata = {
    name: `backup-vf/${filename}`,
  };
  var media = {
    mimeType: "image/jpeg",
    body: fs.createReadStream("files/photo.jpg"),
  };
  drive.files.create(
    {
      requestBody: fileMetadata,
      media: media,
      fields: "id",
    },
    (err: any, file: any) => {
      if (err) {
        // Handle error
        console.error(err);
      } else {
        console.log("File Id: ", file.id);
      }
    }
  );
};

const listFiles = (auth: any) => {
  const drive = google.drive({ version: "v3", auth });
  drive.files.list(
    {
      pageSize: 10,
      fields: "nextPageToken, files(id, name)",
    },
    (err: any, res: any) => {
      if (err) return console.log("The API returned an error: " + err);
      const files = res.data.files;
      if (files.length) {
        console.log("Files:");
        files.map((file: any) => {
          console.log(`${file.name} (${file.id})`);
        });
      } else {
        console.log("No files found.");
      }
    }
  );
};
