
/*

import { DropboxAuth } from "dropbox";

const config = {
  id: "lr4hkuk5ra3cfso",
  secret: "3mvmqdcil94yw2n",
};

export const auth = async () => {
  //const code = process.env.DPX_CODE!;

  const code = "Cdz5m3EGc1AAAAAAAAAAZtT2MvsZ6THWeMnrF6W5eiI";
  const d = new DropboxAuth({
    clientId: config.id,
    clientSecret: config.secret,
  });
  const res = await d.getAccessTokenFromCode("http://localhost", code);
  const data = res.result as any;
  d.setAccessToken(data.access_token);
  d.refreshAccessToken();
  const refresh_token = d.getRefreshToken();

  console.log("refresh_token : ", refresh_token);

  console.log("res => ");
  if (res.status === 200) {
    console.log("res => ", res.result);
  } else {
    console.log("Something went wrong / responded with : ", res.status);
  }
};

*/
