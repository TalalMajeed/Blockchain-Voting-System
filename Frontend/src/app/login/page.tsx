"use client";

import { Layout } from "antd";
import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent,
} from "react";
import { Button, Form, Input, Space } from "antd";
const { Content, Footer } = Layout;
import Web3 from "web3";
import { useWeb3 } from "../../context/Web3Context";
import { useUser } from "../../context/UserContext";
import { useRouter } from "next/navigation";
import PhoneInput from "antd-phone-input";
import type { InputRef } from "antd";

export default function Login() {
  const [page, setPage] = useState(1);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [mode, setMode] = useState<string | null>("email");

  return (
    <Layout className="min-h-[100%] font-sans bg-[url('/background.jpg')] bg-cover bg-center">
      <Content className="flex flex-col items-center justify-center">
        {page == 1 && (
          <Base
            setEmailg={setEmail}
            setPhoneg={setPhone}
            setPage={setPage}
            setMode={setMode}
          />
        )}
        {page == 2 && (
          <OTPVerification
            email={email}
            phone={phone}
            mode={mode}
            setPage={setPage}
          />
        )}
        {page == 3 && <Account />}
      </Content>
      <Footer className="text-center text-base bg-transparent font-light text-gray-600">
        Voting System ©2025 | All Rights Reserved
      </Footer>
    </Layout>
  );
}

interface BaseProps {
  setEmailg: (email: string) => void;
  setPhoneg: (phone: string) => void;
  setPage: (page: number) => void;
  setMode: (mode: string) => void;
}

function Base({ setEmailg, setPhoneg, setPage, setMode }: BaseProps) {
  const { setEmail, email, setPhone, phone } = useUser();
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async () => {
    setEmailError(null);
    setPhoneError(null);
    setEmailg(email || "");
    setPhoneg(phone || "");
    setError(null);

    if (!email) {
      setEmailError("Please enter a valid email!");
    }
    if (!phone) {
      setPhoneError("Please enter a valid phone number!");
    }

    if (email && phone) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/verify/otp`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, phone }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("OTP Verification Successful:", data);
          setMode(data.mode);
          setPage(2);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Invalid email or phone number!");
        }
      } catch (error) {
        console.error("OTP Verification Failed:", error);
        setError("Network error! Please try again.");
      }
    }
  };

  return (
    <Form className="flex flex-col items-center justify-start w-[420px] h-[500px] bg-white rounded-[15px] p-[40px]">
      <div className="text-4xl font-semibold text-left w-[100%] pt-[20px]">
        System Login
      </div>
      <div className="text-base font-light text-left w-[100%] pb-[10px] pt-[20px]">
        Please Enter the following details to register for the voting poll!
      </div>

      <Form.Item className="w-[100%] m-[0px] pt-[20px] pb-[10px] h-[70px] font-light">
        <Input
          size="large"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
          className={"w-[100%] rounded-[5px] h-[50px]"}
          placeholder="Enter your Email"
        />
        {emailError && (
          <span className="text-red-500 text-sm">{emailError}</span>
        )}
      </Form.Item>

      <Form.Item className="w-[100%] m-[0px] mt-[5px] mb-[10px] pt-[20px] pb-[20px] h-[80px] font-light">
        <PhoneInput
          country={"pk"}
          value={phone || ""}
          onChange={(value) =>
            setPhone(
              (value.countryCode || "") +
                (value.areaCode || "") +
                (value.phoneNumber || "")
            )
          }
          placeholder="Enter your phone"
        />
        {phoneError && (
          <span className="text-red-500 text-sm">{phoneError}</span>
        )}
      </Form.Item>

      <div className="flex-1"></div>
      <hr className="border-t-[1px] w-[100%]" />
      <div className="flex-1"></div>

      <Form.Item className="w-[100%] m-[0px] pt-[20px] pb-[20px] h-[80px]">
        <Button
          type="primary"
          size="large"
          htmlType="button"
          className="w-[100%] rounded-[5px] h-[50px]"
          onClick={handleSubmit}
        >
          Continue
        </Button>
      </Form.Item>
      {error && (
        <div className="text-red-500 text-sm text-center font-light">
          {error}
        </div>
      )}
    </Form>
  );
}

interface OTPVerificationProps {
  email: string | null;
  phone: string | null;
  setPage: (page: number) => void;
  mode: string | null;
}

function OTPVerification({
  email,
  phone,
  setPage,
  mode,
}: OTPVerificationProps) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!otp || otp.length !== 7) {
      setError("Please enter a valid 7-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/validate/otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            phone,
            code: otp,
          }),
        }
      );

      if (response.ok) {
        setPage(3);
      } else if (response.status >= 300 && response.status < 400) {
        setError("Incorrect OTP");
      } else {
        setError("An Error Occurred");
      }
    } catch (error) {
      console.error("OTP Validation Failed:", error);
      setError("Network error! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getDestination = () => {
    if (mode === "whatsapp") {
      return phone;
    } else if (mode === "email") {
      return email;
    }
    return "";
  };

  return (
    <Form className="flex flex-col items-center justify-start w-[420px] !h-[500px] bg-white rounded-[15px] p-[40px]">
      <div className="text-4xl font-semibold text-left w-[100%] pt-[20px]">
        OTP Verification
      </div>

      <div className="text-base font-light text-left w-[100%] pb-[10px] pt-[20px]">
        {mode === "whatsapp" && (
          <>
            OTP Sent to your WhatsApp:{" "}
            <span className="font-medium">{getDestination()}</span>
          </>
        )}
        {mode === "email" && (
          <>
            OTP Sent to your Email:{" "}
            <span className="font-medium">{getDestination()}</span>
          </>
        )}
      </div>

      <div className="text-base font-light text-left w-[100%] pb-[10px]">
        Please enter the 7-digit code you received
      </div>

      <div className="flex-1 bg-red-400"></div>

      <Form.Item className="w-[100%] mt-[10px] h-[70px] font-light">
        <OTPInput
          onChange={(value) => {
            setOtp(value);
          }}
        />
      </Form.Item>

      <div className="flex-1 bg-red-400"></div>

      <Form.Item className="w-[100%] m-[0px] pt-[20px] pb-[10px] h-[80px]">
        <Button
          type="primary"
          size="large"
          htmlType="button"
          className="w-[100%] rounded-[5px] h-[50px]"
          onClick={handleSubmit}
          loading={loading}
        >
          Verify
        </Button>
      </Form.Item>
      <Button
        className="w-[100%] mt-[10px] text-center h-[50px]"
        onClick={() => setPage(1)}
      >
        Go Back
      </Button>
      {error && (
        <div className="text-red-500 mt-[10px] text-sm text-center font-light">
          {error}
        </div>
      )}
    </Form>
  );
}
function Account() {
  const { account, isConnecting, web3, setAccount, setIsConnecting, setWeb3 } =
    useWeb3();

  const router = useRouter();

  const ownerAddress = process.env.NEXT_PUBLIC_OWNER_ADDRESS;

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      const web3Instance = new Web3((window as any).ethereum);
      setWeb3(web3Instance);
    }
  }, []);

  const connectWallet = async () => {
    if (typeof window === "undefined" || !(window as any).ethereum) {
      alert("MetaMask is not installed!");
      return;
    }

    setIsConnecting(true);

    try {
      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(accounts[0]);
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      setIsConnecting(false);
      return;
    }

    setIsConnecting(false);
  };

  return (
    <Form className="flex flex-col items-center justify-start w-[420px] h-[500px] bg-white rounded-[15px] p-[40px]">
      <div className="text-4xl font-semibold text-left w-[100%] pt-[20px]">
        Wallet Connect
      </div>
      <div className="text-base font-light text-left w-[100%] pb-[10px] pt-[20px]">
        Please Connect your MetaMask Account to Vote for a Candidate!
      </div>
      <div className="flex-1"></div>

      <Button
        size="large"
        htmlType="submit"
        className="w-[100%] rounded-[5px] h-[50px]"
        href="https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
        target="_blank"
      >
        Install MetaMask
      </Button>

      <Button
        size="large"
        className="w-[100%] rounded-[5px] h-[50px] mt-[20px]"
        onClick={connectWallet}
        loading={isConnecting}
        disabled={isConnecting || !!account}
      >
        {isConnecting
          ? "Connecting..."
          : account
          ? "Connected Wallet!"
          : "Connect MetaMask"}
      </Button>

      <div className="flex-1"></div>
      <hr className="border-t-[1px] w-[100%]" />

      <Form.Item
        name="submit"
        className="w-[100%] m-[0px] pt-[20px] pb-[20px] h-[80px]"
      >
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          className="w-[100%] rounded-[5px] h-[50px]"
          disabled={!account}
          onClick={() => {
            if (account) {
              if (
                account &&
                ownerAddress &&
                account.toLowerCase() === ownerAddress.toLowerCase()
              ) {
                console.log("Owner Address from login: ", ownerAddress);
                console.log("Requesting Address from login: ", account);
                router.push("/panel/admin");
              } else {
                router.push("/panel/vote");
              }
            }
          }}
        >
          Continue
        </Button>
      </Form.Item>
    </Form>
  );
}

interface OtpInputProps {
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const OTPInput: React.FC<OtpInputProps> = ({ onChange, disabled = false }) => {
  const [otpValues, setOtpValues] = useState<string[]>(Array(7).fill(""));
  const inputRefs = useRef<(InputRef | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0] && !disabled) {
      inputRefs.current[0].focus();
    }
  }, [disabled]);

  useEffect(() => {
    const otp = otpValues.join("");
    if (onChange) {
      onChange(otp);
    }
  }, [otpValues, onChange]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    let { value } = e.target;

    //Capitalize the input
    value = value.toUpperCase();

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value.charAt(0);
    setOtpValues(newOtpValues);

    if (value && index < 6 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number
  ): void => {
    if (e.key === "Backspace") {
      if (!otpValues[index] && index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");

    if (/^\d+$/.test(pastedData)) {
      const digits = pastedData.slice(0, 7).split("");

      const newOtpValues = [...otpValues];
      digits.forEach((digit, idx) => {
        if (idx < 7) {
          newOtpValues[idx] = digit;
        }
      });

      setOtpValues(newOtpValues);

      if (digits.length < 7 && inputRefs.current[digits.length]) {
        inputRefs.current[digits.length]?.focus();
      } else if (inputRefs.current[6]) {
        inputRefs.current[6]?.focus();
      }
    }
  };

  return (
    <Form.Item className="w-full m-0 pt-5 pb-3 h-20 font-light">
      <Space size="small" className="flex justify-center">
        {otpValues.map((value, index) => (
          <Input
            key={index}
            ref={(el) => (inputRefs.current[index] = el) as any}
            value={value}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={index === 0 ? handlePaste : undefined}
            className="w-[42px] h-12 text-center text-lg rounded"
            maxLength={1}
            autoComplete="off"
            disabled={disabled}
          />
        ))}
      </Space>
    </Form.Item>
  );
};
