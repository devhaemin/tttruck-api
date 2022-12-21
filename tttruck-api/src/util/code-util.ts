function randomDigits(digit:number):string{
  return String(Math.floor(Math.random()*Math.pow(10,digit))).padStart(6, "0");
}

export default {
  randomDigits,
}as const;