"use client";
import { Button, Layout } from "antd";
const { Content, Footer } = Layout;

export default function Admin() {
  return (
    <Layout className="min-h-screen flex flex-col font-sans bg-gray-100 p-10">
      <h1 className="text-center text-3xl font-bold text-gray-800 mt-5 mb-3">Admin Dashboard</h1>
      <p className="text-center text-gray-500 text-sm">You are authorised to make the following changes to te voting system.</p>
      <Content className="flex-grow flex flex-col items-center justify-center gap-10 md:flex-row">
        <section className="bg-white p-6 rounded-2xl shadow-lg w-80 text-center">
          <h1 className="text-xl font-semibold mb-4">Add Candidate</h1>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Candidate Name"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button type="primary" shape="round" size="large">
              Add
            </Button>
          </div>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-lg w-80 text-center">
          <h1 className="text-xl font-semibold mb-4">Remove Candidate</h1>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Candidate ID"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <Button type="primary" shape="round" size="large" danger>
              Remove
            </Button>
          </div>
        </section>
      </Content>

      <Footer className="text-center text-base font-light text-gray-600 mt-10 hidden md:block">
        Voting System ©2025 | All Rights Reserved
      </Footer>
    </Layout>
  );
}
