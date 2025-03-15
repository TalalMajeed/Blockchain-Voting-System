const PQueue = require("p-queue").default;

const otpStorage = new Map<string, { data: Object; expiresAt: number }>();
const OTP_EXPIRY_MS = 5 * 60 * 1000;

const otpQueue = new PQueue({ concurrency: 5 });

function generateOTP() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  let otp = "";
  for (let i = 0; i < 2; i++) {
    otp += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  for (let i = 0; i < 5; i++) {
    otp += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  return otp;
}

export async function storeOTP(data: Object): Promise<string | void> {
  const otp = await otpQueue.add(async () => {
    let otp = generateOTP();
    while (otpStorage.has(otp)) {
      otp = generateOTP();
    }
    const expiresAt = Date.now() + OTP_EXPIRY_MS;
    if (otpStorage.has(otp)) {
      throw new Error("OTP already exists");
    }
    otpStorage.set(otp, { data, expiresAt });

    setTimeout(() => {
      otpStorage.delete(otp);
    }, OTP_EXPIRY_MS);

    console.log("New OTP stored for", otp);

    return otp;
  });

  return otp;
}

export async function verifyOTP(otp: string, data: Object): Promise<boolean> {
  return (await otpQueue.add(async () => {
    const stored = otpStorage.get(otp);
    console.log("Verifying OTP for", otp);
    if (!stored) return false;

    console.log(stored.data);
    console.log(data);

    console.log(Date.now() < stored.expiresAt);
    console.log(stored.expiresAt);
    console.log(stored.data == data);

    if (
      JSON.stringify(stored.data) == JSON.stringify(data) &&
      Date.now() < stored.expiresAt
    ) {
      otpStorage.delete(otp);
      console.log("OTP verified for", otp);
      return true;
    }

    console.log("Invalid OTP for", otp);
    return false;
  })) as boolean;
}

function cleanupExpiredOTPs() {
  const now = Date.now();
  for (const [key, { expiresAt }] of otpStorage.entries()) {
    if (now >= expiresAt) {
      otpStorage.delete(key);
      console.log("Expired OTP removed for", key);
    }
  }
}

setInterval(cleanupExpiredOTPs, 60 * 1000 * 15);
