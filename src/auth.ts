import fs from "fs";
import { google } from "googleapis";
import path from "path";
import readline from "readline";

const TOKEN_PATH = "token.json";
const SCOPES = ["https://www.googleapis.com/auth/drive"];

export const auth = async (): Promise<any> => {
  // read credientials
  try {
    const buff = fs.readFileSync(path.join(__dirname, "../credentials.json"));
    const credientials = JSON.parse(buff.toString());
    const AuthClient = await authorization(credientials);
    return AuthClient;
  } catch (e) {
    // file not found !!
    console.log("credentials.json : not found !", e);
  }
};

const authorization = async (credientials: any): Promise<any> => {
  const { client_secret, client_id, redirect_uris } = credientials.installed;
  console.log("id :", redirect_uris);
  const AuthClient = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  // read token !
  try {
    const buff = fs.readFileSync(TOKEN_PATH);
    const token = JSON.parse(buff.toString());
    AuthClient.setCredentials(token);
    console.log("DONE !");
    return AuthClient;
  } catch (e) {
    // token file not found !
    const authutl = AuthClient.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });
    console.log("Authorize this app by visiting this url : ", authutl);
    const code = await getCode();
    const res = await AuthClient.getToken(code);
    if (res.res?.status !== 200) {
      console.log("Something went wrong retreiving token !");
    }
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(res.tokens));
    return AuthClient;
  }
};

const getCode = async (): Promise<string> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let code = "";
  rl.setPrompt("Enter the code from that page here : ");
  rl.prompt();
  return new Promise((resolve, _) => {
    rl.on("line", (c: string) => {
      code = c;
      rl.close();
    });
    rl.on("close", () => {
      resolve(code);
    });
  });
};
