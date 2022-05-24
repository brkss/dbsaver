import fs from "fs";

interface IFileConfig {
  dpxpath: string;
  content: Buffer;
}

const DPX_PATH_SUFFIX = "/backup-vanille-fraise";

export const createFileName = (): string => {
  const suffix = "bkp-vf-";

  return `${suffix}-${new Date().getTime()}`;
};

export const readFile = (p: string): Buffer => {
  const buff = fs.readFileSync(p);
  return buff;
};

export const createFileConfig = (fn: string, content: Buffer) => {
  const config: IFileConfig = {
    content: content,
    dpxpath: `${DPX_PATH_SUFFIX}/${fn}`,
  };

  return config;
};
