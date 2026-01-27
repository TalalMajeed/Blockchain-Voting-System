"use client";

import { Layout, Button } from "antd";
import Image from "next/image";
import Link from "next/link";

const { Content, Footer } = Layout;

export default function Home() {
  return (
    <Layout className="min-h-[100%] font-sans bg-gradient-to-b from-emerald-50 via-white to-white">
      <Content className="w-full">
        <section className="max-w-6xl mx-auto px-6 pt-14 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="text-sm font-medium text-emerald-700 bg-emerald-100/60 border border-emerald-200 rounded-full px-3 py-1">
                  Secure • Transparent • Verifiable
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
                Decentralized voting,
                <span className="text-emerald-700"> made simple</span>.
              </h1>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Register with OTP, connect your wallet, and cast a vote that’s
                recorded on-chain. Admins manage candidates with a verified
                MetaMask wallet.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/login" passHref>
                  <Button
                    type="primary"
                    size="large"
                    className="h-[46px] w-full sm:w-auto px-8"
                  >
                    Voter Login
                  </Button>
                </Link>
                <Link href="/admin" passHref>
                  <Button
                    size="large"
                    className="h-[46px] w-full sm:w-auto px-8"
                  >
                    Admin Portal
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <Stat
                  title="OTP Verification"
                  desc="Register voters by email/WhatsApp OTP."
                />
                <Stat
                  title="Wallet-Based Voting"
                  desc="Vote securely using MetaMask."
                />
                <Stat
                  title="Auditable Results"
                  desc="Fetch candidates and results from the contract."
                />
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-2 rounded-3xl bg-emerald-200/40 blur-2xl" />
              <div className="relative rounded-3xl border border-emerald-100 bg-white shadow-sm overflow-hidden">
                <div className="p-6 md:p-8">
                  <div className="text-sm font-medium text-gray-900">
                    How it works
                  </div>
                  <div className="mt-6 grid gap-4">
                    <Step
                      n="1"
                      title="Request OTP"
                      desc="Enter email & phone to receive a 7‑character code."
                    />
                    <Step
                      n="2"
                      title="Verify & Connect"
                      desc="Verify OTP, then connect MetaMask to proceed."
                    />
                    <Step
                      n="3"
                      title="Cast Vote"
                      desc="Select a candidate and confirm the transaction."
                    />
                  </div>

                  <div className="mt-8 rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-600">
                    <div className="font-medium text-gray-900">Setup</div>
                    <div className="mt-1">
                      Runs with Sepolia Testnet. Ensure MetaMask is on the
                      correct network.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Feature
              title="Admin controls"
              desc="Add/remove candidates from the admin dashboard with an owner wallet."
            />
            <Feature
              title="Clean UX"
              desc="Separate flows for voters and admins, with clear routing and redirects."
            />
            <Feature
              title="Reliable contract access"
              desc="Contract address is resolved per network to avoid ABI mismatch errors."
            />
          </div>
        </section>
      </Content>

      <Footer className="text-center text-base font-light text-gray-600 bg-transparent">
        Voting System ©2026 | All Rights Reserved
      </Footer>
    </Layout>
  );
}

function Stat({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="text-sm font-semibold text-gray-900">{title}</div>
      <div className="text-sm text-gray-600 mt-1">{desc}</div>
    </div>
  );
}

function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="flex gap-3">
      <div className="h-9 w-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-sm font-semibold">
        {n}
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold text-gray-900">{title}</div>
        <div className="text-sm text-gray-600">{desc}</div>
      </div>
    </div>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="text-lg font-semibold text-gray-900">{title}</div>
      <div className="mt-2 text-sm text-gray-600 leading-relaxed">{desc}</div>
    </div>
  );
}
