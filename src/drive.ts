//

import fs from "fs";
import { google } from "googleapis";

export const uploadFile = (auth: any, filename: string, path: string) => {
  const drive = google.drive({ version: "v3", auth });
  var fileMetadata = {
    name: `${filename}`,
  };
  var media = {
    body: fs.createReadStream(path),
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
