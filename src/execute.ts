import { execSync } from "child_process";

export const saveDockerSqlFile = (fn: string): Buffer => {
  const cmd = `docker exec  ${process.env.CONTAINER_NAME} /usr/bin/mysqldump -u ${process.env.DB_USER} --password=${process.env.ROOT_PASS} ${process.env.DB_NAME} > backup/${fn}`;

  const buff = execSync(cmd);
  return buff;
};
