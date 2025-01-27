"use client";

import { Layout, Typography } from "antd";
const { Content, Footer } = Layout;

//Import AntDesign components

import { Button, Form, Input, Checkbox } from "antd";

export default function Login() {
    return (
        <Layout className="min-h-[100%] font-sans bg-[#62cc89]">
            <Content className="flex flex-col items-center justify-center">
                <Form className="flex flex-col items-center justify-start w-[420px] h-[500px] bg-white rounded-[5px] p-[40px]">
                    <div className="text-3xl font-semibold text-left w-[100%] pt-[20px]">
                        System Login
                    </div>
                    <div className="text-base text-left w-[100%] pb-[20px] pt-[20px]">
                        Please Enter the following details to register for the
                        voting poll!
                    </div>
                    <Form.Item
                        name="username"
                        className="w-[100%] m-[0px] pt-[20px] pb-[20px] h-[70px]"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your name!",
                            },
                        ]}
                    >
                        <Input
                            size="large"
                            className="w-[100%] rounded-[5px]"
                            placeholder="Enter your Name"
                        />
                    </Form.Item>
                    <Form.Item
                        name="contact"
                        className="w-[100%] m-[0px] pt-[20px] pb-[20px] h-[80px]"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your email or phone!",
                            },
                        ]}
                    >
                        <Input
                            size="large"
                            className="w-[100%] rounded-[5px]"
                            placeholder="Enter Email or Phone"
                        />
                    </Form.Item>
                    <div className="flex-1"></div>
                    <hr className="border-t-[1px] w-[100%]" />
                    <div className="flex-1"></div>
                    <Form.Item
                        name="submit"
                        className="w-[100%] m-[0px] pt-[20px] pb-[20px] h-[80px]"
                    >
                        <Button
                            type="primary"
                            size="large"
                            htmlType="submit"
                            className="w-[100%] rounded-[5px]"
                        >
                            Continue
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
            <Footer className="text-center text-base bg-transparent text-white">
                Voting System ©2025 | All Rights Reserved
            </Footer>
        </Layout>
    );
}
