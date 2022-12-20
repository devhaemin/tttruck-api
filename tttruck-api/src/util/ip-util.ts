import e from "express";

function ip2num(ip: string) {
  const d = ip.split(".");

  let num = 0;
  num += Number(d[0]) * Math.pow(256, 3);
  num += Number(d[1]) * Math.pow(256, 2);
  num += Number(d[2]) * Math.pow(256, 1);
  num += Number(d[3]);

  return num;
}

export function num2ip(num: number) {
  let ip = (num % 256).toString();

  for (let i = 3; i > 0; i--) {
    num = Math.floor(num / 256);
    ip = (num % 256).toString() + "." + ip;
  }

  return ip;
}

export function getClientIP(req: e.Request): number {
  let ipString = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  ipString =
    ipString ? (Array.isArray(ipString) ? ipString[0] : ipString) : "0.0.0.0";
  return ip2num(ipString);
}